import type { User } from "@supabase/supabase-js";

/** Obtiene el nombre para mostrar (full_name, name o prefijo del email) */
export function getDisplayName(user: User): string {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (meta?.full_name && typeof meta.full_name === "string") return meta.full_name;
  if (meta?.name && typeof meta.name === "string") return meta.name;

  const identity = user.identities?.[0];
  const identityData = identity?.identity_data as Record<string, unknown> | undefined;
  if (identityData?.full_name && typeof identityData.full_name === "string")
    return identityData.full_name;
  if (identityData?.name && typeof identityData.name === "string")
    return identityData.name;

  const email = user.email;
  if (email) return email.split("@")[0];
  return "Usuario";
}

/** Obtiene la URL del avatar del usuario desde user_metadata o identities */
export function getAvatarUrl(user: User): string | undefined {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (meta?.avatar_url && typeof meta.avatar_url === "string") return meta.avatar_url;
  if (meta?.picture && typeof meta.picture === "string") return meta.picture;
  if (meta?.avatar && typeof meta.avatar === "string") return meta.avatar;

  // identity_data tiene los datos crudos del provider (Google, GitHub, etc.)
  const identity = user.identities?.[0];
  const identityData = identity?.identity_data as Record<string, unknown> | undefined;
  if (identityData?.avatar_url && typeof identityData.avatar_url === "string")
    return identityData.avatar_url;
  if (identityData?.picture && typeof identityData.picture === "string")
    return identityData.picture;
  if (identityData?.avatar && typeof identityData.avatar === "string")
    return identityData.avatar;

  return undefined;
}

/** Para depuración: imprime la estructura del user en consola */
export function debugUserMetadata(user: User): void {
  if (process.env.NODE_ENV !== "development") return;
  // eslint-disable-next-line no-console
  console.debug("[Auth] user_metadata:", user.user_metadata);
  // eslint-disable-next-line no-console
  console.debug("[Auth] identities:", user.identities);
  // eslint-disable-next-line no-console
  console.debug("[Auth] avatar URL:", getAvatarUrl(user));
}
