import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
        outline:
          "border border-input bg-background text-foreground hover:bg-muted active:bg-secondary",
        ghost: "bg-transparent text-foreground hover:bg-muted active:bg-secondary",
      },
      size: {
        sm: "h-[var(--size-control-sm)] px-3",
        md: "h-[var(--size-control-md)] px-4",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  /** Visible button label. Icon-only actions belong in an IconButton. */
  children: React.ReactNode;
  /** Decorative icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Decorative icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Disables activation and shows progress while retaining the accessible name. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    "aria-busy": ariaBusy,
    children,
    className,
    disabled,
    leadingIcon,
    loading = false,
    size,
    trailingIcon,
    type = "button",
    variant,
    ...props
  },
  ref,
): React.ReactElement {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      aria-busy={loading ? true : ariaBusy}
      data-loading={loading ? "true" : undefined}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span
        data-slot="button-content"
        className={cn("inline-flex items-center justify-center gap-2", loading && "opacity-0")}
      >
        {leadingIcon ? (
          <span data-slot="button-leading-icon" className="flex shrink-0" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span data-slot="button-label">{children}</span>
        {trailingIcon ? (
          <span data-slot="button-trailing-icon" className="flex shrink-0" aria-hidden="true">
            {trailingIcon}
          </span>
        ) : null}
      </span>
      {loading ? (
        <span
          data-slot="button-spinner"
          className="absolute size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
});
