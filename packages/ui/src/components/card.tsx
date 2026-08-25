"use client";

import * as React from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * StatCard — a 1:1 match with the Figma “Card / Stat” component.
 *
 * title/value are per-instance content (like a TEXT property in Figma): each card has its own text.
 * Colors come ONLY from semantic tokens: bg-card, border-border, text-muted-foreground,
 * text-foreground. The top-right action is an accessible button (aria-label); the icon is decorative.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

export function StatCard({ title, value, className, ...props }: StatCardProps): React.ReactElement {
  return (
    <div
      className={cn("relative rounded-lg border border-border bg-card p-5", className)}
      {...props}
    >
      <button
        type="button"
        aria-label="More options"
        className="absolute top-4 right-4 cursor-pointer border-0 bg-transparent p-0 leading-none text-muted-foreground hover:text-foreground"
      >
        <DotsThreeVertical size={20} aria-hidden />
      </button>
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
