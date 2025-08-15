"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BRAND_INITIAL, BRAND_NAME, APP_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import {
  Bell,
  BarChart2,
  Briefcase,
  Calendar,
  CheckCircle,
  DollarSign,
  FileText,
  HelpCircle,
  Menu,
  Settings,
  TrendingUp,
  Users,
  User,
  Mail,
} from "lucide-react";
import { Sidebar } from "./ui/sidebar";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";

const menuItems = [
  { name: "Dashboard", icon: BarChart2, href: APP_ROUTES.dashboard },
  { name: "Projects", icon: Briefcase, href: APP_ROUTES.projects },
  { name: "Calendar", icon: Calendar, href: APP_ROUTES.calendar },
  { name: "Leave Management", icon: CheckCircle, href: APP_ROUTES.leave },
  { name: "Settings", icon: Settings, href: APP_ROUTES.settings },
  { name: "Notifications", icon: Bell, href: APP_ROUTES.notifications },
  { name: "Help Center", icon: HelpCircle, href: APP_ROUTES.help },
  { name: "Performance", icon: TrendingUp, href: APP_ROUTES.performance },
  { name: "Payrolls", icon: DollarSign, href: APP_ROUTES.payrolls },
  { name: "Invoices", icon: FileText, href: APP_ROUTES.invoices },
  { name: "Employees", icon: Users, href: APP_ROUTES.employees },
  { name: "Recruitment", icon: User, href: APP_ROUTES.recruitment },
];

const topbarSegmented = [
  { label: "Overview", value: "overview" },
  { label: "Order", value: "order" },
  { label: "Sales", value: "sales" },
];

export function CRMLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [segment, setSegment] = useState("overview");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const currentPage = menuItems.find((m) => m.href === pathname)?.name ?? "Dashboard";
  const hasNotifications = true;

  const Brand = (
    <div className="flex items-center space-x-2 px-4 py-6">
      <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
        <AvatarFallback>{BRAND_INITIAL}</AvatarFallback>
      </Avatar>
      <span className="font-bold text-lg tracking-tight">{BRAND_NAME}</span>
    </div>
  );

  const Nav = (
    <nav className="flex flex-col gap-1 px-2 pb-4">
      {menuItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Button
            key={item.href}
            variant={active ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-2 rounded-md px-3 py-2 text-sm",
              !active && "text-muted-foreground hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              if (pathname !== item.href) router.push(item.href);
              setSidebarOpen(false);
            }}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            {item.name}
          </Button>
        );
      })}
    </nav>
  );

  const SidebarInner = (
    <Sidebar>
      {Brand}
      <div className="px-4 pb-4">
        <Input placeholder="Search…" aria-label="Search navigation" />
      </div>
      <div className="flex-1 overflow-auto scroll-thin">{Nav}</div>
      <div className="p-4 text-xs text-muted-foreground">
        Press ⌘/Ctrl+B to toggle sidebar
      </div>
    </Sidebar>
  );

  return (
    <div className="flex h-screen w-full bg-background">
      {isMobile ? (
        sidebarOpen && (
          <Sheet open={sidebarOpen}>
            <SheetContent side="left">{SidebarInner}</SheetContent>
          </Sheet>
        )
      ) : (
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 border-r border-border bg-card z-40">
          {SidebarInner}
        </aside>
      )}
      <div className={cn("flex flex-col flex-1 min-h-0", !isMobile && "lg:ml-64")}>
        <header className="sticky top-0 z-30 bg-background/70 backdrop-blur border-b border-border flex items-center px-4 py-2 gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <span className="font-semibold text-lg">{currentPage}</span>
          <div className="flex gap-1 ml-2">
            {topbarSegmented.map((s) => (
              <Button
                key={s.value}
                variant={segment === s.value ? "secondary" : "ghost"}
                className={cn(
                  "h-8 px-3 text-xs font-medium",
                  segment !== s.value && "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={segment === s.value}
                onClick={() => setSegment(s.value)}
              >
                {s.label}
              </Button>
            ))}
          </div>
          <div className="flex-1" />
            <Input
              placeholder="Search…"
              className="hidden md:block w-52"
              aria-label="Global search"
            />
            <Button variant="ghost" size="icon" aria-label="Open mail">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Open notifications" className="relative">
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
              )}
            </Button>
            <Avatar className="h-8 w-8 bg-muted">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="primary" className="ml-2">
              Invite
            </Button>
        </header>
        <main className="flex-1 min-h-0 overflow-auto p-4 scroll-thin">
          {children}
        </main>
      </div>
    </div>
  );
}