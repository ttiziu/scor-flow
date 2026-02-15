import { supabase } from "@/lib/supabase";

export type AuthProvider = "google" | "github" | "discord";

export async function signInWithOAuth(provider: AuthProvider) {
  const options: {
    redirectTo?: string;
    scopes?: string;
  } = {
    redirectTo:
      typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
  };
  if (provider === "google") {
    options.scopes = "email profile openid";
  }
  if (provider === "discord") {
    options.scopes = "identify email";
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/** Envía código OTP al email. Crea cuenta si no existe. */
export async function signInWithEmailOtp(email: string) {
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });
  if (error) throw error;
  return data;
}

/** Verifica el código OTP ingresado por el usuario */
export async function verifyEmailOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: "email",
  });
  if (error) throw error;
  return data;
}

