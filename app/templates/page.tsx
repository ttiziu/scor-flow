import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, Layout, Layers } from "lucide-react";

const categories = [
  { href: "/", label: "Apps y juegos", desc: "Aplicaciones interactivas y mini juegos", icon: FileCode },
  { href: "/", label: "Landing pages", desc: "Páginas de aterrizaje modernas", icon: Layout },
  { href: "/", label: "Componentes", desc: "Componentes UI reutilizables", icon: Layers },
  { href: "/", label: "Dashboards", desc: "Paneles de control y métricas", icon: Layout },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-2 text-muted-foreground">
          Empieza más rápido con plantillas predefinidas
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <Card key={cat.label} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <cat.icon className="size-5" />
                {cat.label}
              </CardTitle>
              <CardDescription>{cat.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href={cat.href}>Usar plantilla</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
