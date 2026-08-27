"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { isAriaInvalid } from "./input";

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Shared `name` for the native radio inputs — this is what gives the browser's native
   * same-name grouping (roving tabindex, Arrow-key move-and-select, Tab as a single stop). */
  name: string;
  /** Controlled selected value. Omit and use `defaultValue` for uncontrolled use. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * Provides `name`/`value`/`onValueChange`/`disabled` to child `Radio`s and renders the
 * `role="radiogroup"` container. Roving-tabindex and Arrow-key navigation are NOT implemented
 * here — grouped native `<input type="radio">`s with the same `name` already get that behavior
 * from the browser (the WAI-ARIA radiogroup interaction model), so no keydown handling is added.
 */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
  ...props
}: RadioGroupProps): React.ReactElement {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({ name, value: currentValue, onValueChange: handleValueChange, disabled }),
    [name, currentValue, handleValueChange, disabled],
  );

  return (
    <div role="radiogroup" className={cn("flex flex-col gap-2", className)} {...props}>
      <RadioGroupContext.Provider value={contextValue}>{children}</RadioGroupContext.Provider>
    </div>
  );
}

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "name" | "checked" | "onChange"
> {
  /** This option's value within the enclosing RadioGroup. */
  value: string;
}

const circleBase =
  "pointer-events-none flex size-[var(--size-icon-md)] shrink-0 items-center justify-center rounded-full border border-input bg-background transition-[border-color,box-shadow] peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-[var(--opacity-disabled)] peer-data-[invalid=true]:border-invalid-border peer-data-[invalid=true]:peer-focus-visible:ring-invalid-ring";

/**
 * Native `<input type="radio">`, visually hidden inside a `--size-target-min` (44px) hit area,
 * same pattern as Checkbox. Must be rendered inside a `RadioGroup`.
 *
 * Accepts `aria-invalid` for the invalid visual state, but does not forward it to the native
 * `<input>` as a DOM attribute: `role="radio"` does not support `aria-invalid` per the WAI-ARIA
 * spec (a single option's "validity" isn't a meaningful concept — it's the group's selection
 * that would be invalid). The visual state is instead driven by `data-invalid`.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { "aria-invalid": ariaInvalid, className, disabled: disabledProp, value, ...props },
  ref,
): React.ReactElement {
  const group = React.useContext(RadioGroupContext);
  if (!group) {
    throw new Error("Radio must be rendered inside a RadioGroup.");
  }

  const checked = group.value === value;
  const disabled = disabledProp ?? group.disabled;
  const invalid = isAriaInvalid(ariaInvalid);

  return (
    <span
      data-slot="radio"
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      className={cn(
        "relative inline-flex size-[var(--size-target-min)] shrink-0 items-center justify-center",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        name={group.name}
        value={value}
        checked={checked}
        disabled={disabled}
        data-invalid={invalid ? "true" : undefined}
        onChange={() => group.onValueChange(value)}
        className="peer absolute inset-0 m-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span aria-hidden="true" className={cn(circleBase, "peer-checked:border-primary")} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto size-[calc(var(--size-icon-md)*0.4)] scale-0 rounded-full bg-primary transition-transform peer-checked:scale-100 peer-disabled:opacity-[var(--opacity-disabled)]"
      />
    </span>
  );
});
