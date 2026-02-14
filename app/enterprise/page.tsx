import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnterprisePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Enterprise</h1>
        <p className="mt-2 text-muted-foreground">
          Soluciones para equipos y organizaciones
        </p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>¿Necesitas un plan empresarial?</CardTitle>
          <CardDescription>
            Contáctanos para discutir volumen, integraciones personalizadas y SLA dedicados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/signup">Solicitar contacto</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
