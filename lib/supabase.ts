import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Fallbacks evitan "supabaseUrl is required" durante el build (p. ej. CI sin .env).
// En runtime las variables reales se inyectan desde .env.local o el deploy.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  "placeholder-key";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
