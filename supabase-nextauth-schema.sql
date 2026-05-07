create extension if not exists "uuid-ossp";

create schema if not exists next_auth;

grant usage on schema next_auth to service_role;
grant all on schema next_auth to postgres;

create or replace function next_auth.uid() returns uuid
  language sql stable
  as $$
    select coalesce(
      nullif(current_setting('request.jwt.claim.sub', true), ''),
      (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
  $$;

create table if not exists next_auth.users (
  id uuid not null default uuid_generate_v4(),
  name text,
  email text,
  "emailVerified" timestamptz,
  image text,
  constraint users_pkey primary key (id),
  constraint email_unique unique (email)
);

create table if not exists next_auth.accounts (
  id uuid not null default uuid_generate_v4(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  "userId" uuid,
  constraint accounts_pkey primary key (id),
  constraint provider_unique unique (provider, "providerAccountId"),
  constraint accounts_userId_fkey foreign key ("userId")
    references next_auth.users (id) on delete cascade
);

create table if not exists next_auth.sessions (
  id uuid not null default uuid_generate_v4(),
  expires timestamptz not null,
  "sessionToken" text not null,
  "userId" uuid,
  constraint sessions_pkey primary key (id),
  constraint sessionToken_unique unique ("sessionToken"),
  constraint sessions_userId_fkey foreign key ("userId")
    references next_auth.users (id) on delete cascade
);

create table if not exists next_auth.verification_tokens (
  identifier text,
  token text,
  expires timestamptz not null,
  constraint verification_tokens_pkey primary key (token),
  constraint token_unique unique (token),
  constraint token_identifier_unique unique (token, identifier)
);

grant all on all tables in schema next_auth to service_role;
grant all on all sequences in schema next_auth to service_role;

create table if not exists public.users (
  id uuid not null primary key,
  name text,
  email text,
  image text,
  constraint users_id_fkey foreign key (id)
    references next_auth.users (id) on delete cascade
);

alter table public.users enable row level security;

drop policy if exists "Can view own user data." on public.users;
create policy "Can view own user data." on public.users
  for select using (next_auth.uid() = id);

drop policy if exists "Can update own user data." on public.users;
create policy "Can update own user data." on public.users
  for update using (next_auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, image)
  values (new.id, new.name, new.email, new.image)
  on conflict (id) do update set
    name = excluded.name,
    email = excluded.email,
    image = excluded.image;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on next_auth.users;
create trigger on_auth_user_created
  after insert on next_auth.users
  for each row execute procedure public.handle_new_user();
