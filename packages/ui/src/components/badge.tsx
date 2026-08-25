import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Status badge — soft style: tinted background (bg-*-surface) + saturated text (text-*-foreground).
 * Colors come ONLY from semantic tokens, with no hex values. Change a token in @repo/tokens → every badge updates.
 *
 * Stock status maps as follows: In stock → success · Low → warning · Out → destructive.
 */
const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", {
  variants: {
    tone: {
      info: "bg-info-surface text-info-foreground",
      success: "bg-success-surface text-success-foreground",
      warning: "bg-warning-surface text-warning-foreground",
      destructive: "bg-destructive-surface text-destructive-foreground",
    },
  },
  defaultVariants: { tone: "info" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps): React.ReactElement {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
