import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Sheet({ open, children }: { open: boolean; children: ReactNode; onOpenChange?: (o: boolean) => void }) {
  if (!open) return null;
  return <>{children}</>;
}

export function SheetContent({
  side = "left",
  className,
  children,
}: {
  side?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative h-full w-64 bg-card border-r border-border shadow-lg animate-in slide-in-from-left",
          side === "right" && "ml-auto border-l border-r-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}