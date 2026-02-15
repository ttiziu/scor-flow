"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const hashParams = typeof window !== "undefined" ? window.location.hash : "";
      const searchParams = typeof window !== "undefined" ? window.location.search : "";

      if (hashParams || searchParams.includes("token_hash") || searchParams.includes("access_token")) {
        setTimeout(() => {
          router.replace("/");
          router.refresh();
        }, 500);
        return;
      }

      setError("No se recibió la confirmación. Intenta de nuevo.");
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
        <p className="text-destructive">{error}</p>
        <a href="/login" className="text-primary hover:underline">
          Volver a iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
      <Spinner className="size-8" />
      <p className="text-muted-foreground">Verificando sesión…</p>
    </div>
  );
}
