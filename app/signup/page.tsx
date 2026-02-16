"use client";

import Link from "next/link";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { EmailLoginForm } from "@/components/auth/email-login-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Crear cuenta</h1>
          <p className="text-muted-foreground text-sm">
            Regístrate para empezar a transformar tus ideas en productos digitales
          </p>
        </div>
        <div className="space-y-4">
          <SocialLoginButtons
            googleLabel="Crear cuenta con Google"
            discordLabel="Crear cuenta con Discord"
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">o</span>
            </div>
          </div>
          <EmailLoginForm mode="signup" />
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
