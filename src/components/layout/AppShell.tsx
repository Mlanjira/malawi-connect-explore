import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Building2, BookOpenText, GraduationCap, Megaphone, Radio, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const navItems = [
  { to: "/app/hotels", label: "Hotels", Icon: Building2 },
  { to: "/app/articles", label: "Articles", Icon: BookOpenText },
  { to: "/app/training", label: "Training", Icon: GraduationCap },
  { to: "/app/marketing", label: "Marketing", Icon: Megaphone },
  { to: "/app/updates", label: "Updates", Icon: Radio },
  { to: "/app/settings", label: "Settings", Icon: Settings },
  { to: "/app/chatbot", label: "Chatbot", Icon: Bot },
  
];

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect /app to first tab
    if (location.pathname === "/app") navigate("/app/hotels", { replace: true });
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="p-4 border-b">
          <NavLink to="/app/hotels" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg" style={{ background: "var(--gradient-primary)" }} />
            <div>
              <p className="font-semibold">Malawi Tourism</p>
              <span className="text-sm text-muted-foreground">Discover • Train • Connect</span>
            </div>
          </NavLink>
        </div>
        <nav className="p-2 space-y-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                isActive ? "bg-secondary text-primary font-medium" : "hover:bg-muted/60"
              )
            }>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Button className="w-full" variant="default">Post Update</Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4">
          <div className="flex items-center gap-2 md:hidden">
            <div className="h-7 w-7 rounded-md" style={{ background: "var(--gradient-primary)" }} />
            <span className="font-semibold">Malawi Tourism</span>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <ul className="grid grid-cols-6">
          {navItems.map(({ to, label, Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <NavLink to={to} className="flex flex-col items-center justify-center py-2 text-xs">
                  <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn(active ? "text-primary" : "text-muted-foreground")}>{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
