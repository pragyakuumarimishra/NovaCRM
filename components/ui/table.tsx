import { cn } from "@/lib/utils";

export function Table(props: React.HTMLAttributes<HTMLTableElement>) {
  return <table {...props} className={cn("w-full text-sm", props.className)} />;
}
export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} className={cn("", props.className)} />;
}
export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={cn("", props.className)} />;
}
export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} className={cn("border-b border-border hover:bg-muted/60", props.className)} />;
}
export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} className={cn("py-2 px-4 text-left text-xs font-semibold text-muted-foreground", props.className)} />;
}
export function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cn("py-2 px-4 align-middle", props.className)} />;
}