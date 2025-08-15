import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("relative h-2 w-full rounded-full bg-muted overflow-hidden", className)}>
      <div
        className="absolute inset-y-0 left-0 bg-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}