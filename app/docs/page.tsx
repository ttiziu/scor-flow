import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Documentación</h1>
        <p className="mt-2 text-muted-foreground">
          Guías y referencia para usar SCOR AI
        </p>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Introducción</CardTitle>
            <CardDescription>
              Aprende a transformar ideas en proyectos estructurados en pocos pasos.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>
              Documentación de la API para integraciones y automatización.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
