"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Sparkles,
  Home,
  FileCode,
  Layout,
  Layers,
  BookOpen,
  HelpCircle,
  Building2,
  CreditCard,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubStars } from "@/components/github-stars";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const templateLinks = [
  { href: "/templates?cat=apps", label: "Apps y juegos", icon: FileCode },
  { href: "/templates?cat=landing", label: "Landing pages", icon: Layout },
  { href: "/templates?cat=components", label: "Componentes", icon: Layers },
  { href: "/templates?cat=dashboards", label: "Dashboards", icon: Layout },
];

const resourceLinks = [
  { href: "/docs", label: "Documentación", icon: BookOpen },
  { href: "/faq", label: "Preguntas frecuentes", icon: HelpCircle },
];

/* Template items: small icon left, text right (v0 style) */
function NavListTemplateItem({
  href,
  title,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="font-medium text-foreground">{title}</span>
          </Link>
        }
      />
    </li>
  )
}

/* Resource items: small icon left, text right (v0 style) */
function NavListResourceItem({
  href,
  title,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="font-medium text-foreground">{title}</span>
          </Link>
        }
      />
    </li>
  )
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-80"
          aria-label="Scor - Inicio"
        >
          <span className="font-serif text-2xl font-semibold italic tracking-tight">
            Scor
          </span>
        </Link>

        {/* Desktop: Center nav - NavigationMenu */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu viewport={false} className="max-w-none">
            <NavigationMenuList className="gap-1">
              {/* Templates */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent font-normal focus-visible:ring-0 focus-visible:outline-none">
                  Templates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-0.5 p-2">
                    {templateLinks.map((link) => (
                      <NavListTemplateItem
                        key={link.label}
                        href={link.href}
                        title={link.label}
                        icon={link.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Recursos */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent font-normal focus-visible:ring-0 focus-visible:outline-none">
                  Recursos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-0.5 p-2">
                    {resourceLinks.map((link) => (
                      <NavListResourceItem
                        key={link.label}
                        href={link.href}
                        title={link.label}
                        icon={link.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct links - sin fondo/sombra en hover */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent font-normal hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none",
                    pathname === "/enterprise"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  render={<Link href="/enterprise">Enterprise</Link>}
                />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent font-normal hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none",
                    pathname === "/pricing"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  render={<Link href="/pricing">Pricing</Link>}
                />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent font-normal hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none",
                    pathname === "/faq"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  render={<Link href="/faq">FAQ</Link>}
                />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop: Right actions - theme, GitHub, auth */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <ThemeToggle />
          <GitHubStars />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile: Menu button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon-sm" aria-label="Abrir menú">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[300px] flex-col p-0 sm:w-[320px]">
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <div className="flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="border-b px-5 py-4 pr-12">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-serif text-lg italic"
                  onClick={() => setMobileOpen(false)}
                >
                  <Sparkles className="size-5" />
                  Scor
                </Link>
              </div>

              {/* Nav */}
              <nav className="flex flex-1 flex-col py-4">
                {/* Inicio */}
                <Link
                  href="/"
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
                  onClick={() => setMobileOpen(false)}
                >
                  <Home className="size-4 text-muted-foreground" />
                  Inicio
                </Link>

                {/* Templates */}
                <div className="mt-2 px-5">
                  <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Templates
                  </p>
                  <ul className="space-y-0.5">
                    {templateLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          <link.icon className="size-4 shrink-0 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recursos */}
                <div className="mt-4 px-5">
                  <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Recursos
                  </p>
                  <ul className="space-y-0.5">
                    {resourceLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          <link.icon className="size-4 shrink-0 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Producto */}
                <div className="mt-4 px-5">
                  <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Producto
                  </p>
                  <ul className="space-y-0.5">
                    {[
                      { href: "/enterprise", label: "Enterprise", icon: Building2 },
                      { href: "/pricing", label: "Pricing", icon: CreditCard },
                      { href: "/faq", label: "FAQ", icon: HelpCircle },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          <link.icon className="size-4 shrink-0 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Footer: utils + auth */}
              <div className="mt-auto border-t px-5 py-4">
                <div className="mb-4 flex items-center gap-1">
                  <ThemeToggle />
                  <GitHubStars />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
