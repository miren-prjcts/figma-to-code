import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Icon-only sibling of Button, sharing its variant/size/state system (solid/outline/ghost ×
 * sm/md/lg × default/loading/disabled). Deliberately does not offer the `destructive` variant —
 * that is scoped to Button only (DSV2-013).
 *
 * `sm` renders a --size-control-sm (32px) visible box but its actual hit area is expanded to
 * --size-target-min (44px) via an absolutely positioned `::before` that overflows the visible
 * box — the same minimum-pointer-target requirement StatCard's overflow action satisfies
 * (`packages/ui/src/components/card.tsx`), adapted for a standalone (non-`absolute`) control.
 * Because the icon is centered in the visible box by flexbox and the expanded hit area is a
 * separate overlaid pseudo-element, the icon's rendered position and size are unaffected by the
 * larger invisible hit area.
 */
const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        outline:
          "border border-input bg-background text-foreground hover:bg-muted active:bg-secondary",
        ghost: "bg-transparent text-foreground hover:bg-muted active:bg-secondary",
      },
      size: {
        sm: "size-[var(--size-control-sm)] before:absolute before:content-[''] before:inset-[calc((var(--size-control-sm)_-_var(--size-target-min))/2)]",
        md: "size-[var(--size-control-md)]",
        lg: "size-[var(--size-control-lg)]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

const iconSizeClass: Record<
  NonNullable<VariantProps<typeof iconButtonVariants>["size"]>,
  string
> = {
  sm: "size-[var(--size-icon-sm)]",
  md: "size-[var(--size-icon-md)]",
  lg: "size-[var(--size-icon-md)]", // no dedicated --size-icon-lg token; glyph is capped at md
};

export interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label">,
    VariantProps<typeof iconButtonVariants> {
  /** Icon glyph to render. Decorative — the accessible name comes from `aria-label`. */
  icon: React.ReactNode;
  /**
   * Required accessible name. IconButton has no visible label to derive one from, so this is
   * enforced at the type level: omitting it is a TypeScript error, not just an a11y lint warning.
   */
  "aria-label": string;
  /** Disables activation and shows progress while retaining the accessible name. */
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    "aria-busy": ariaBusy,
    "aria-label": ariaLabel,
    className,
    disabled,
    icon,
    loading = false,
    size = "md",
    type = "button",
    variant,
    ...props
  },
  ref,
): React.ReactElement {
  const isDisabled = disabled || loading;
  const resolvedSize = size ?? "md";

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      aria-busy={loading ? true : ariaBusy}
      data-loading={loading ? "true" : undefined}
      disabled={isDisabled}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      <span
        data-slot="icon-button-icon"
        className={cn("flex shrink-0", iconSizeClass[resolvedSize], loading && "invisible")}
        aria-hidden="true"
      >
        {icon}
      </span>
      {loading ? (
        <span
          data-slot="icon-button-spinner"
          className="absolute top-1/2 left-1/2 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
});
