"use client";

import Link from "next/link";
import Image from "next/image";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { EmailLoginForm } from "@/components/auth/email-login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-8">
        {/* Logo circular */}
        <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border">
          <Image
            src="/images/scorai-circle.png"
            alt="Scor"
            width={64}
            height={64}
            className="size-full object-contain dark:invert"
          />
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión en Scor</h1>
            <p className="text-sm text-muted-foreground">
              Inicia sesión con tu cuenta para usar Scor
            </p>
          </div>

          {/* Email primero (estilo v0) */}
          <EmailLoginForm mode="login" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">o continúa con</span>
            </div>
          </div>

          <SocialLoginButtons />

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
