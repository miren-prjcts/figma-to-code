"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "value" | "onChange"
> {
  /** Controlled on/off state. Omit and use `defaultChecked` for uncontrolled use. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * `<button role="switch" aria-checked>` inside the same 44px hit-area wrapper as Checkbox/Radio.
 * A real `<button>` gets Space/Enter activation from the browser for free — no custom keydown
 * handling needed.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    "aria-invalid": ariaInvalid,
    checked,
    className,
    defaultChecked = false,
    disabled,
    onCheckedChange,
    onClick,
    ...props
  },
  ref,
): React.ReactElement {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const next = !isChecked;
    if (!isControlled) setInternalValue(next);
    onCheckedChange?.(next);
  };

  function setInternalValue(next: boolean): void {
    setInternalChecked(next);
  }

  return (
    <span
      data-slot="switch"
      className="relative inline-flex size-[var(--size-target-min)] shrink-0 items-center justify-center"
    >
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex h-[calc(var(--size-icon-md)*0.8)] w-[calc(var(--size-icon-md)*1.6)] shrink-0 cursor-pointer items-center rounded-full border border-input bg-muted p-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] aria-checked:border-primary aria-checked:bg-primary aria-invalid:border-invalid-border aria-invalid:focus-visible:ring-invalid-ring",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-[calc(var(--size-icon-md)*0.6)] rounded-full bg-background transition-transform",
            isChecked && "translate-x-[calc(var(--size-icon-md)*0.8)] bg-primary-foreground",
          )}
        />
      </button>
    </span>
  );
});
