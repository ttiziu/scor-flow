"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";

export default function PerfilPage() {
  const router = useRouter();
  const { session, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !session?.user) {
      router.replace("/login");
    }
  }, [authLoading, session?.user, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-4 py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mi perfil</h1>
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>

        <p className="text-center">
          <Link href="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
