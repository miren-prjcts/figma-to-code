"use client";

import * as React from "react";
import { Check, Minus } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { isAriaInvalid } from "./input";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /** Mixed/partial state. Set imperatively on the native input (`indeterminate` has no HTML
   * attribute) and exposed to assistive tech via `aria-checked="mixed"`. Takes visual precedence
   * over `checked`. */
  indeterminate?: boolean;
}

const boxBase =
  "pointer-events-none flex size-[var(--size-icon-md)] shrink-0 items-center justify-center rounded-sm border border-input bg-background transition-[background-color,border-color,box-shadow] peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-[var(--opacity-disabled)] peer-aria-invalid:border-invalid-border peer-aria-invalid:peer-focus-visible:ring-invalid-ring";

const glyphBase =
  "pointer-events-none absolute inset-0 m-auto size-[var(--size-icon-sm)] text-primary-foreground peer-disabled:opacity-[var(--opacity-disabled)]";

/**
 * Native `<input type="checkbox">`, visually hidden inside a `--size-target-min` (44px) hit area
 * and styled via `peer-*` variants on a decorative sibling box — the same hit-area pattern as
 * StatCard's overflow action. Checked/unchecked/indeterminate/disabled/invalid states use only
 * semantic tokens; no hover/pressed role exists for a neutral bordered control (see handoff).
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { "aria-invalid": ariaInvalid, checked, className, disabled, indeterminate = false, ...props },
  ref,
): React.ReactElement {
  const internalRef = React.useRef<HTMLInputElement | null>(null);

  React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const invalid = isAriaInvalid(ariaInvalid);

  return (
    <span
      data-slot="checkbox"
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      className={cn(
        "relative inline-flex size-[var(--size-target-min)] shrink-0 items-center justify-center",
        className,
      )}
    >
      <input
        ref={internalRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-checked={indeterminate ? "mixed" : undefined}
        className="peer absolute inset-0 m-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          boxBase,
          indeterminate
            ? "border-primary bg-primary"
            : "peer-checked:border-primary peer-checked:bg-primary",
        )}
      />
      {indeterminate ? (
        <Minus aria-hidden="true" weight="bold" className={glyphBase} />
      ) : (
        <Check
          aria-hidden="true"
          weight="bold"
          className={cn(glyphBase, "opacity-0 peer-checked:opacity-100")}
        />
      )}
    </span>
  );
});
