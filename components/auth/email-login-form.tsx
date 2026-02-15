"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signInWithEmailOtp, verifyEmailOtp } from "@/lib/auth";

interface EmailLoginFormProps {
  /** Modo: "login" o "signup" para textos */
  mode?: "login" | "signup";
  /** Callback al verificar correctamente (ej. redirect) */
  onSuccess?: () => void;
  className?: string;
}

export function EmailLoginForm({
  mode = "login",
  onSuccess,
  className = "",
}: EmailLoginFormProps) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Ingresa tu email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Email inválido");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailOtp(trimmed);
      setStep("code");
      toast.success("Código enviado", {
        description: "Revisa tu correo e ingresa el código",
      });
    } catch (e) {
      toast.error("Error al enviar", {
        description: e instanceof Error ? e.message : "Intenta de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Ingresa el código");
      return;
    }
    setLoading(true);
    try {
      await verifyEmailOtp(email, code);
      toast.success(mode === "signup" ? "Cuenta creada" : "Sesión iniciada");
      onSuccess?.();
      if (typeof window !== "undefined") window.location.href = "/";
    } catch (e) {
      toast.error("Código inválido o expirado", {
        description: e instanceof Error ? e.message : "Solicita uno nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("email");
    setCode("");
  };

  if (step === "code") {
    return (
      <form onSubmit={handleVerifyCode} className={`space-y-4 ${className}`}>
        <p className="text-sm text-muted-foreground">
          Enviamos un código a <strong>{email}</strong>
        </p>
        <div className="space-y-2">
          <Label htmlFor="otp">Código de verificación</Label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Ej: 12345678"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
            maxLength={8}
            className="font-mono text-center text-lg tracking-widest"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={loading}
          >
            Atrás
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" />
                Verificando…
              </>
            ) : (
              "Verificar"
            )}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendCode} className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Spinner className="size-4" />
            Enviando código…
          </>
        ) : (
          mode === "signup"
            ? "Enviar código de verificación"
            : "Continuar con email"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Te enviaremos un código de 8 dígitos. También puedes usar el enlace del correo.
      </p>
    </form>
  );
}
