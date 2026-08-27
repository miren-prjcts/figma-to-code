import * as React from "react";
import { cn } from "../lib/utils";
import { isAriaInvalid } from "./input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * When `true`, the textarea grows to fit its content instead of showing a scrollbar, using a
   * plain ref + `scrollHeight` measurement — no runtime dependency beyond React itself.
   *
   * Defaults to `false`: a fixed-rows textarea (`rows` defaults to `3`) with the native
   * vertical resize handle. This default-off, opt-in shape is a deliberate choice — see
   * `docs/tickets/DSV2-012-select-textarea.md` — rather than an implicit fixed-rows-only
   * limitation.
   */
  autoResize?: boolean;
}

/**
 * FormField consumption (DSV2-011): this component accepts standard `id`, `aria-describedby`,
 * and `aria-invalid` props, so a `FormField` wrapper (per DSV2-011's documented API — label,
 * optional description, optional error message, required-field indicator, with automatic
 * `id`/`aria-describedby`/`aria-invalid` wiring to a single form-control child) can inject them
 * into a `Textarea` exactly as it would into a plain `<textarea>` or `Input`. No FormField-aware
 * code lives in this component — it is a plain controlled/uncontrolled form control, matching
 * Input's own pattern. See the `FormFieldDemo` story in `textarea.stories.tsx` for the intended
 * composition shape (a local, clearly-labeled stand-in used only because DSV2-011 was not yet
 * integrated into this worktree at implementation time).
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    "aria-invalid": ariaInvalid,
    autoResize = false,
    className,
    disabled,
    onChange,
    readOnly,
    rows = 3,
    ...props
  },
  forwardedRef,
): React.ReactElement {
  const invalid = isAriaInvalid(ariaInvalid);
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  const resize = React.useCallback(() => {
    const node = innerRef.current;
    if (!node || !autoResize) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  }, [autoResize]);

  React.useLayoutEffect(() => {
    resize();
  }, [resize, props.value, props.defaultValue]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
      resize();
    },
    [onChange, resize],
  );

  return (
    <textarea
      ref={setRefs}
      aria-invalid={ariaInvalid}
      data-slot="textarea"
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      disabled={disabled}
      onChange={handleChange}
      readOnly={readOnly}
      rows={rows}
      className={cn(
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-[color,background-color,border-color,box-shadow,opacity] placeholder:text-muted-foreground read-only:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-invalid-border aria-invalid:focus-visible:ring-invalid-ring",
        autoResize ? "resize-none overflow-hidden" : "resize-y",
        className,
      )}
      {...props}
    />
  );
});
