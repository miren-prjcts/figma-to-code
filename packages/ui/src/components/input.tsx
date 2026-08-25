"use client";

import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * Input (search) — a 1:1 match with the Figma “Input” component.
 *
 * The wrapper provides the border/focus ring (focus-within); <input> is transparent.
 * Colors come ONLY from semantic tokens: border-input, bg-background, ring-ring,
 * text-foreground, placeholder:text-muted-foreground. No hex values.
 *
 * The icon is Phosphor MagnifyingGlass (the same official library used in Figma),
 * decorative (aria-hidden); the <input> itself carries the accessible name through aria-label.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Override class for the wrapper (for example, width: "w-[280px]"). */
  containerClassName?: string;
}

export function Input({
  className,
  containerClassName,
  type = "text",
  "aria-label": ariaLabel = "Search",
  disabled,
  ...props
}: InputProps): React.ReactElement {
  return (
    <div
      className={cn(
        "inline-flex h-[var(--size-control-md)] items-center gap-2 rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        disabled && "cursor-not-allowed opacity-50",
        containerClassName,
      )}
    >
      <MagnifyingGlass size={16} className="shrink-0 text-muted-foreground" aria-hidden />
      <input
        type={type}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(
          "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
