"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Switch({
  checked,
  defaultChecked,
  onChange,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isChecked = checked !== undefined ? checked : internal;

  function toggle(e: React.ChangeEvent<HTMLInputElement>) {
    if (checked === undefined) setInternal(e.target.checked);
    onChange?.(e);
  }

  return (
    <label className={cn("inline-flex items-center cursor-pointer select-none", className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={toggle}
        {...props}
      />
      <span className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary transition-colors relative flex items-center">
        <span className="h-4 w-4 rounded-full bg-card translate-x-0 peer-checked:translate-x-4 shadow border border-border transition-transform ml-0.5" />
      </span>
    </label>
  );
}