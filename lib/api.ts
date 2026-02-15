import { supabase } from "@/lib/supabase";

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/** Coincide con el usuario que devuelve el backend (GET /auth/me). */
export interface AuthUser {
  id: string;
  email?: string | null;
}

/** Verifica la sesión en el backend (GET /auth/me) */
export async function getAuthUser(): Promise<AuthUser | null> {
  const res = await fetch(`${getApiUrl()}/auth/me`, {
    headers: await getAuthHeaders(),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { user?: AuthUser };
  return data.user ?? null;
}

/** Headers con Authorization Bearer si hay sesión de Supabase */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }
  return headers;
}

export interface GenerateSpecResponse {
  projectName: string;
  description: string;
  stack: string;
  architecture: string[];
  folderStructure: string[];
  roadmap: string[];
  userActions: string[];
  clarificationRequested?: boolean;
  clarificationMessage?: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateCodeResponse {
  files: GeneratedFile[];
}

export async function generateSpec(idea: string): Promise<GenerateSpecResponse> {
  const res = await fetch(`${getApiUrl()}/ai/generate`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return res.json();
}

export async function generateCode(
  idea: string,
  spec?: GenerateSpecResponse | null
): Promise<GenerateCodeResponse> {
  const res = await fetch(`${getApiUrl()}/ai/generate-code`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ idea, spec: spec ?? undefined }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return res.json();
}
