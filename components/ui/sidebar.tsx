import { cn } from "@/lib/utils";

export function Sidebar({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <aside className={cn("flex flex-col h-full w-full bg-card text-card-foreground", className)}>
      {children}
    </aside>
  );
}