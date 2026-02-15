"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import StackBlitzSDK from "@stackblitz/sdk";
import { Sparkles, ExternalLink, FileCode, ChevronDown, ArrowUp, Play } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  generateSpec,
  generateCode,
  type GenerateSpecResponse,
  type GeneratedFile,
} from "@/lib/api";

export default function HomePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [idea, setIdea] = useState("");
  const [spec, setSpec] = useState<GenerateSpecResponse | null>(null);
  const [files, setFiles] = useState<GeneratedFile[] | null>(null);
  const [loadingSpec, setLoadingSpec] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const requireAuth = useCallback(() => {
    if (authLoading) return true; // Bloquear mientras carga
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return true;
    }
    return false;
  }, [isAuthenticated, authLoading]);

  const handleGenerateSpec = async () => {
    if (requireAuth()) return;
    const trimmed = idea.trim();
    if (!trimmed) {
      toast.error("Completa el campo", { description: "Escribe una idea para generar el proyecto" });
      return;
    }
    setSpec(null);
    setFiles(null);
    setLoadingSpec(true);
    try {
      const data = await generateSpec(trimmed);
      setSpec(data);
      toast.success("Especificación generada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al generar especificación");
    } finally {
      setLoadingSpec(false);
    }
  };

  const handleGenerateCode = async () => {
    if (requireAuth()) return;
    const trimmed = idea.trim();
    if (!trimmed) {
      toast.error("Completa el campo", { description: "Escribe una idea primero" });
      return;
    }
    setLoadingCode(true);
    try {
      const data = await generateCode(trimmed, spec ?? undefined);
      setPreviewReady(false);
      setFiles(data.files);
      toast.success("Código generado");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al generar código");
    } finally {
      setLoadingCode(false);
    }
  };

  const getProjectPayload = useCallback(() => {
    if (!files?.length) return null;
    const projectFiles = files.reduce(
      (acc, { path, content }) => {
        acc[path] = content;
        return acc;
      },
      {} as Record<string, string>
    );
    return {
      files: projectFiles,
      template: "node" as const,
      title: spec?.projectName || "scor-ai-project",
      description: spec?.description || "",
    };
  }, [files, spec?.projectName, spec?.description]);

  const handleVerEnVivo = async () => {
    const project = getProjectPayload();
    if (!project || !previewRef.current) return;
    previewRef.current.innerHTML = "";
    setPreviewReady(true);
    try {
      await StackBlitzSDK.embedProject(
        previewRef.current,
        project,
        { view: "preview", height: 420, hideExplorer: true }
      );
      toast.success("Vista previa lista");
    } catch {
      toast.error("No se pudo cargar la vista previa. Abre en StackBlitz.");
    }
  };

  const handleOpenStackBlitz = () => {
    const project = getProjectPayload();
    if (!project) return;
    StackBlitzSDK.openProject(project, { newWindow: true });
    toast.success("Abriendo en StackBlitz");
  };

  const quickIdeas = [
    "Formulario de contacto",
    "Editor de imágenes",
    "Mini juego",
    "Calculadora financiera",
    "Dashboard",
    "Landing page",
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero - v0 style */}
        <section className="mb-12 text-center">
          <h1 className="font-serif text-3xl font-semibold italic tracking-tight sm:text-4xl lg:text-5xl">
            ¿Qué quieres crear?
          </h1>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Transforma tu idea en un producto digital estructurado. Genera especificación y código en minutos.
          </p>
        </section>

        {/* Main input area - v0 chat style */}
        <div className="mb-8 rounded-xl border border-border bg-muted/30 shadow-sm transition-shadow focus-within:border-primary/30 focus-within:shadow-md">
          <div className="flex flex-col">
            <Textarea
              id="idea"
              placeholder="Pide a scor que construya... Ej: Una app de tareas con lista, botón añadir y marcar completadas"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onFocus={() => {
                if (!authLoading && !isAuthenticated) setAuthModalOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerateSpec();
                }
              }}
              rows={5}
              className="min-h-[140px] resize-none rounded-t-xl rounded-b-none border-0 bg-transparent px-4 pt-4 pb-2 text-base shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Sparkles className="size-3.5" />
                    <span className="text-sm font-medium">scor</span>
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem
                    onClick={handleGenerateSpec}
                    disabled={loadingSpec || !idea.trim()}
                  >
                    {loadingSpec ? (
                      <Spinner className="size-4" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    Generar proyecto
                  </DropdownMenuItem>
                  {spec && !spec.clarificationRequested && (
                    <DropdownMenuItem
                      onClick={handleGenerateCode}
                      disabled={loadingCode || !idea.trim()}
                    >
                      {loadingCode ? (
                        <Spinner className="size-4" />
                      ) : (
                        <FileCode className="size-4" />
                      )}
                      Generar código
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="icon-sm"
                variant="secondary"
                className="size-8 rounded-lg bg-muted hover:bg-muted/80"
                onClick={handleGenerateSpec}
                disabled={loadingSpec}
                aria-label="Generar proyecto"
              >
                {loadingSpec ? (
                  <Spinner className="size-4" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick ideas - v0 style chips */}
        <section className="mb-16">
          <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
            Empezar con una plantilla
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickIdeas.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setIdea(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </section>

        {loadingSpec && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Spinner className="size-5" />
                <Skeleton className="h-6 w-48" />
              </div>
              <Skeleton className="mt-2 h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        )}

        {spec && spec.clarificationRequested && !loadingSpec && (
          <Alert className="mb-6 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-500/30">
            <AlertTitle>Aclaración necesaria</AlertTitle>
            <AlertDescription>
              {spec.clarificationMessage || spec.description}
            </AlertDescription>
            <p className="mt-2 text-sm text-muted-foreground">
              Escribe una idea más concreta (qué producto o app quieres) y vuelve a pulsar &quot;Generar especificación&quot;.
            </p>
          </Alert>
        )}

        {spec && !spec.clarificationRequested && !loadingSpec && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{spec.projectName}</CardTitle>
              <CardDescription>{spec.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <Badge variant="secondary">{spec.stack}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="architecture">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="architecture">Arquitectura</TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  <TabsTrigger value="actions">Qué debes hacer</TabsTrigger>
                </TabsList>
                <TabsContent value="architecture" className="mt-4">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {spec.architecture.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="roadmap" className="mt-4">
                  <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {spec.roadmap.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ol>
                </TabsContent>
                <TabsContent value="actions" className="mt-4">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {spec.userActions.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {files && files.length > 0 && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Proyecto generado</CardTitle>
                <CardDescription>
                  {files.length} archivos. Ver en vivo aquí (como en v0) o abrirlo en StackBlitz para editar.
                </CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button onClick={handleVerEnVivo} size="sm" disabled={previewReady}>
                    <Play className="size-4" />
                    Ver en vivo
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleOpenStackBlitz}>
                    <ExternalLink className="size-4" />
                    Abrir en StackBlitz
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div
                  ref={previewRef}
                  className="min-h-[420px] w-full overflow-hidden rounded-lg border bg-muted/30"
                />
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-base">Archivos generados</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {files.map((file, i) => (
                    <AccordionItem key={i} value={`file-${i}`}>
                      <AccordionTrigger className="font-mono text-sm">
                        {file.path}
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">
                          <code>{file.content}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </>
        )}

        {/* Modal de autenticación requerida (estilo v0) */}
        <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
          <DialogContent showCloseButton={false} className="sm:max-w-md">
            <DialogHeader className="text-center sm:text-center">
              <div className="mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/scorai.svg"
                  alt="Scor"
                  width={64}
                  height={64}
                  className="size-16"
                />
              </div>
              <DialogTitle className="text-center font-serif text-3xl font-extrabold italic tracking-tight">
                Continuar con Scor
              </DialogTitle>
              <DialogDescription className="text-center">
                Para usar Scor, inicia sesión en tu cuenta o crea una nueva.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup" onClick={() => setAuthModalOpen(false)}>
                  Registrarse
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/login" onClick={() => setAuthModalOpen(false)}>
                  Iniciar sesión
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
