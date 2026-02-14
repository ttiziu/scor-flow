import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Planes para cada etapa de tu proyecto
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Para explorar y probar</CardDescription>
            <p className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Empezar</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Para proyectos personales</CardDescription>
            <p className="text-3xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/signup">Empezar</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Para equipos y empresas</CardDescription>
            <p className="text-3xl font-bold">Custom</p>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/enterprise">Contactar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
