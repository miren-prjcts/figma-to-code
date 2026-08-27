"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { isAriaInvalid } from "./input";

export interface FormFieldProps {
  /** Field label. Rendered above the control (`vertical`) or beside it (`horizontal`). */
  label: React.ReactNode;
  /** Optional supporting text, always visible (not replaced by `error`). */
  description?: React.ReactNode;
  /** Optional validation message. When present, the control is marked `aria-invalid`. */
  error?: React.ReactNode;
  /** Renders a visual required-field indicator next to the label. Purely presentational — the
   * control's own `required`/`aria-required` attribute (set by the caller) carries the a11y
   * semantics, matching this codebase's native-attributes-first convention (see input.tsx). */
  required?: boolean;
  /**
   * `vertical` (default): label above the control — for Input/Select/Textarea-style fields.
   * `horizontal`: `<label><Control/><span>text</span></label>` — the native label-wraps-input
   * idiom used by Checkbox/Radio/Switch.
   */
  orientation?: "vertical" | "horizontal";
  /** Explicit id for the control. The child's own `id`, if set, always wins. */
  id?: string;
  className?: string;
  /** A single form-control element. Its `id`/`aria-describedby`/`aria-invalid` are wired
   * automatically. */
  children: React.ReactElement;
}

/**
 * Layout/accessibility wrapper: label, optional description, optional error, and a
 * required-field indicator, wired to a single form-control child via `id`/`aria-describedby`/
 * `aria-invalid`. Reuses Input's `isAriaInvalid` convention rather than a parallel one.
 */
export function FormField({
  label,
  description,
  error,
  required = false,
  orientation = "vertical",
  id,
  className,
  children,
}: FormFieldProps): React.ReactElement {
  const generatedId = React.useId();
  const child = children as React.ReactElement<Record<string, unknown>>;
  const childId = typeof child.props.id === "string" ? child.props.id : undefined;
  const controlId = childId ?? id ?? generatedId;

  const descriptionId = description !== undefined ? `${controlId}-description` : undefined;
  const errorId = error !== undefined ? `${controlId}-error` : undefined;

  const childDescribedBy =
    typeof child.props["aria-describedby"] === "string"
      ? child.props["aria-describedby"]
      : undefined;
  const describedBy =
    [childDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  const childAriaInvalid = child.props["aria-invalid"] as
    | React.AriaAttributes["aria-invalid"]
    | undefined;
  const ariaInvalid = isAriaInvalid(childAriaInvalid)
    ? childAriaInvalid
    : error !== undefined
      ? true
      : undefined;

  const control = React.cloneElement(child, {
    id: controlId,
    "aria-describedby": describedBy,
    "aria-invalid": ariaInvalid,
  });

  const requiredIndicator = required ? (
    <span aria-hidden="true" className="text-destructive-foreground">
      {" "}
      *
    </span>
  ) : null;

  const meta =
    description !== undefined || error !== undefined ? (
      <div className="flex flex-col gap-1">
        {description !== undefined ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        {error !== undefined ? (
          <p id={errorId} className="text-sm text-destructive-foreground">
            {error}
          </p>
        ) : null}
      </div>
    ) : null;

  if (orientation === "horizontal") {
    return (
      <div data-slot="form-field" className={cn("flex flex-col gap-1.5", className)}>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground has-disabled:cursor-not-allowed has-disabled:text-muted-foreground">
          {control}
          <span>
            {label}
            {requiredIndicator}
          </span>
        </label>
        {meta}
      </div>
    );
  }

  return (
    <div data-slot="form-field" className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={controlId} className="text-sm font-medium text-foreground">
        {label}
        {requiredIndicator}
      </label>
      {control}
      {meta}
    </div>
  );
}
