import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Class name for the outer layout container. */
  containerClassName?: string;
  /** Decorative content rendered at the start of the input. */
  leadingAdornment?: React.ReactNode;
  /** Decorative content rendered at the end of the input. */
  trailingAdornment?: React.ReactNode;
}

function isAriaInvalid(value: React.AriaAttributes["aria-invalid"]): boolean {
  return value !== undefined && value !== false && value !== "false";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    "aria-invalid": ariaInvalid,
    className,
    containerClassName,
    disabled,
    leadingAdornment,
    readOnly,
    trailingAdornment,
    type = "text",
    ...props
  },
  ref,
): React.ReactElement {
  const invalid = isAriaInvalid(ariaInvalid);

  return (
    <div
      data-slot="input-container"
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      className={cn("relative inline-flex items-center", containerClassName)}
    >
      {leadingAdornment ? (
        <span
          data-slot="input-leading-adornment"
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 z-10 flex shrink-0 -translate-y-1/2 text-muted-foreground",
            disabled && "opacity-[var(--opacity-disabled)]",
          )}
          aria-hidden="true"
        >
          {leadingAdornment}
        </span>
      ) : null}
      <input
        ref={ref}
        type={type}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          "h-[var(--size-control-md)] w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition-[color,background-color,border-color,box-shadow,opacity] placeholder:text-muted-foreground read-only:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-invalid-border aria-invalid:focus-visible:ring-invalid-ring",
          leadingAdornment && "pl-9",
          trailingAdornment && "pr-9",
          className,
        )}
        {...props}
      />
      {trailingAdornment ? (
        <span
          data-slot="input-trailing-adornment"
          className={cn(
            "pointer-events-none absolute top-1/2 right-3 z-10 flex shrink-0 -translate-y-1/2 text-muted-foreground",
            disabled && "opacity-[var(--opacity-disabled)]",
          )}
          aria-hidden="true"
        >
          {trailingAdornment}
        </span>
      ) : null}
    </div>
  );
});
