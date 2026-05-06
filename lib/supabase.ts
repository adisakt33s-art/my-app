import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;

export type UserScores = {
  user_id: string;
  grammar: number;
  vocabulary: number;
  listening: number;
  speaking: number;
  updated_at?: string;
};

export type UserProfile = {
  user_id: string;
  name?: string;
  phone?: string;
  address?: string;
  xp: number;
  level: number;
  streak: number;
  lessons_completed: number;
  updated_at?: string;
};

export async function getScores(userId: string): Promise<UserScores> {
  const empty: UserScores = { user_id: userId, grammar: 0, vocabulary: 0, listening: 0, speaking: 0 };
  if (!supabase) return empty;
  const { data } = await supabase.from("user_scores").select("*").eq("user_id", userId).single();
  return data ?? empty;
}

export async function getProfile(userId: string): Promise<UserProfile> {
  const empty: UserProfile = { user_id: userId, xp: 0, level: 1, streak: 0, lessons_completed: 0 };
  if (!supabase) return empty;
  const { data } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single();
  return data ?? empty;
}

export async function saveProfile(profile: UserProfile): Promise<{ error?: string }> {
  if (!supabase) return {};
  const { error } = await supabase.from("user_profiles").upsert({ ...profile, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  return { error: error?.message };
}

export async function saveSession(opts: {
  userId: string;
  skill: "grammar" | "vocabulary" | "listening" | "speaking";
  type: string;
  sessionScore: number;
  xpEarned: number;
  current: UserScores;
}): Promise<{ newSkillScore: number; error?: string }> {
  const { userId, skill, type, sessionScore, xpEarned, current } = opts;
  const newSkillScore = Math.round(current[skill] * 0.7 + sessionScore * 0.3);
  if (!supabase) return { newSkillScore };
  const updatedScores: Record<string, unknown> = {
    user_id: userId, grammar: current.grammar, vocabulary: current.vocabulary,
    listening: current.listening, speaking: current.speaking,
    updated_at: new Date().toISOString(),
  };
  updatedScores[skill] = newSkillScore;
  const { error } = await supabase.from("user_scores").upsert(updatedScores, { onConflict: "user_id" });
  await supabase.from("sessions").insert({ user_id: userId, skill, type, score: sessionScore, xp_earned: xpEarned, completed_at: new Date().toISOString() });
  return { newSkillScore, error: error?.message };
}