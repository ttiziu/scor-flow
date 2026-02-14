import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué es SCOR AI?",
    a: "SCOR AI es una plataforma que transforma tus ideas en productos digitales estructurados. Describe tu idea y genera especificaciones técnicas, arquitectura y código base automáticamente.",
  },
  {
    q: "¿Necesito una cuenta para usarlo?",
    a: "Puedes probar la generación básica sin cuenta. Para guardar proyectos, descargar código y acceder a más funciones, necesitas registrarte.",
  },
  {
    q: "¿Qué tecnologías genera?",
    a: "Por defecto genera proyectos con Next.js, TypeScript y Tailwind. La stack puede adaptarse según tu idea.",
  },
  {
    q: "¿Es gratis?",
    a: "Hay un plan gratuito para explorar. Los planes Pro y Enterprise ofrecen más generaciones y funciones avanzadas.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Preguntas frecuentes</h1>
        <p className="mt-2 text-muted-foreground">
          Respuestas a las dudas más comunes
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
