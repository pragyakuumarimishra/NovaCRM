import { cn } from "@/lib/utils";

export function Avatar({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-bold select-none",
        className
      )}
      role="img"
    >
      {children}
    </span>
  );
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}