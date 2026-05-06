import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LineProvider from "next-auth/providers/line";
import CredentialsProvider from "next-auth/providers/credentials";

// ── LocalStorage helpers (server-safe stub) ───────────────────
// Email/password users are stored in the browser's localStorage.
// On the server we only need to validate credentials during sign-in.
// In production, replace this with a real DB (Prisma, Supabase, etc.)
function getUsersFromRequest(): Array<{
  name: string; email: string; password: string; confirmed: boolean;
}> {
  // Server-side stub — actual lookup happens in the browser via the
  // credentials provider's authorize() which runs in a server action context.
  // We return an empty array here; the real validation uses the body payload.
  return [];
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ── Google ──────────────────────────────────────────────
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ── Facebook ─────────────────────────────────────────────
    FacebookProvider({
      clientId:     process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // ── LINE ─────────────────────────────────────────────────
    LineProvider({
      clientId:     process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),

    // ── Email / Password (localStorage) ──────────────────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
        // passed from the browser after localStorage lookup
        name:      { label: "Name",  type: "text" },
        confirmed: { label: "Confirmed", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // The login page already validated the user against localStorage
        // before calling signIn("credentials", ...). We trust the payload
        // here; in production swap for a real DB query + bcrypt compare.
        if (credentials.confirmed !== "true") return null;

        return {
          id:    credentials.email,
          email: credentials.email,
          name:  credentials.name || credentials.email.split("@")[0],
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name  = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name  = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always go to dashboard after sign-in
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/dashboard`;
    },
  },

  session: { strategy: "jwt" },
};
