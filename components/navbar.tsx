"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth";
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
  User,
  Settings,
  DollarSign,
  Users,
  Eye,
  Monitor,
  Sun,
  Moon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getAvatarUrl, getDisplayName, debugUserMetadata } from "@/lib/auth-utils";

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
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, session } = useAuth();

  useEffect(() => {
    if (session?.user) debugUserMetadata(session.user);
  }, [session?.user?.id]);

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

        {/* Desktop: Right actions - theme (solo si no logueado), GitHub, auth */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {!isAuthenticated && <ThemeToggle />}
          <GitHubStars />
          {isAuthenticated && session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Menú de cuenta"
                >
                  <Avatar size="sm" className="size-8">
                    <AvatarImage
                      src={getAvatarUrl(session.user)}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback className="text-xs">
                      {session.user.email?.[0]?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {/* Usuario */}
                <div className="px-3 py-2.5">
                  <p className="font-semibold text-sm">{getDisplayName(session.user)}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />

                {/* Navegación */}
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center gap-2">
                    <User className="size-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center gap-2">
                    <Settings className="size-4" />
                    Configuración
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Precios
                    <ExternalLink className="size-3.5 ml-auto opacity-60" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs" className="flex items-center gap-2">
                    <BookOpen className="size-4" />
                    Documentación
                    <ExternalLink className="size-3.5 ml-auto opacity-60" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://github.com/ttiziu/scor-flow/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Users className="size-4" />
                    Foro de la comunidad
                    <ExternalLink className="size-3.5 ml-auto opacity-60" />
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="flex items-center gap-2 opacity-100">
                  <Eye className="size-4" />
                  Credits
                  <span className="ml-auto text-muted-foreground font-medium">—</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                  Preferencias
                </DropdownMenuLabel>

                {/* Tema */}
                <div className="px-2 py-1.5 flex items-center gap-1">
                  <span className="text-sm text-muted-foreground w-16 shrink-0">Tema</span>
                  <div className="flex rounded-md border border-border bg-muted/30 p-0.5">
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={cn(
                        "rounded p-1.5 transition-colors",
                        (theme ?? "system") === "system"
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="Sistema"
                    >
                      <Monitor className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={cn(
                        "rounded p-1.5 transition-colors",
                        (theme ?? "system") === "light"
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="Claro"
                    >
                      <Sun className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "rounded p-1.5 transition-colors",
                        (theme ?? "system") === "dark"
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label="Oscuro"
                    >
                      <Moon className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Idioma */}
                <div className="px-2 py-1.5 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-16 shrink-0">Idioma</span>
                  <span className="text-sm">Español (Beta)</span>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => signOut().then(() => window.location.reload())}
                  className="cursor-pointer gap-2"
                >
                  <LogOut className="size-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
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
                  {!isAuthenticated && <ThemeToggle />}
                  <GitHubStars />
                </div>
                {isAuthenticated && session?.user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-1">
                      <Avatar size="sm" className="size-9">
                        <AvatarImage
                          src={getAvatarUrl(session.user)}
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback className="text-sm">
                          {session.user.email?.[0]?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">{getDisplayName(session.user)}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/perfil"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                      >
                        <User className="size-4 shrink-0 text-muted-foreground" />
                        Perfil
                      </Link>
                      <Link
                        href="/perfil"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                      >
                        <Settings className="size-4 shrink-0 text-muted-foreground" />
                        Configuración
                      </Link>
                      <Link
                        href="/pricing"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                      >
                        <DollarSign className="size-4 shrink-0 text-muted-foreground" />
                        Precios
                      </Link>
                      <Link
                        href="/docs"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                      >
                        <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                        Documentación
                      </Link>
                      <a
                        href="https://github.com/ttiziu/scor-flow/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                      >
                        <Users className="size-4 shrink-0 text-muted-foreground" />
                        Foro de la comunidad
                        <ExternalLink className="size-3.5 ml-auto opacity-60" />
                      </a>
                      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground">
                        <Eye className="size-4 shrink-0" />
                        Credits
                        <span className="ml-auto font-medium">—</span>
                      </div>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        Preferencias
                      </p>
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm text-muted-foreground">Tema</span>
                        <div className="flex rounded-md border border-border bg-muted/30 p-0.5">
                          <button
                            type="button"
                            onClick={() => setTheme("system")}
                            className={cn(
                              "rounded p-1.5 transition-colors",
                              (theme ?? "system") === "system"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-label="Sistema"
                          >
                            <Monitor className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setTheme("light")}
                            className={cn(
                              "rounded p-1.5 transition-colors",
                              (theme ?? "system") === "light"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-label="Claro"
                          >
                            <Sun className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setTheme("dark")}
                            className={cn(
                              "rounded p-1.5 transition-colors",
                              (theme ?? "system") === "dark"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-label="Oscuro"
                          >
                            <Moon className="size-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm text-muted-foreground">Idioma</span>
                        <span className="text-sm">Español (Beta)</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        signOut().then(() => {
                          setMobileOpen(false);
                          window.location.reload();
                        });
                      }}
                    >
                      <LogOut className="size-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
