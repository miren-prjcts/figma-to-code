import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { isAriaInvalid } from "./input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Class name for the outer layout container. */
  containerClassName?: string;
}

/**
 * A styled wrapper around the real native `<select>` element — never a custom-rendered
 * listbox/combobox. This is a deliberate scope boundary per Charter §4's "a single correct API
 * exists today" test: a custom listbox has an open-ended API (search, multi-select, async
 * options) that `docs/BACKLOG.md` already names as deferred until product-driven discovery.
 * Keyboard model (typing to jump options, Arrow keys, Escape/Enter to open/close/commit) is the
 * browser's native `<select>` behavior — not reimplemented here, and therefore not something
 * this component can get wrong.
 *
 * FormField consumption (DSV2-011): accepts standard `id`, `aria-describedby`, and
 * `aria-invalid` props so a `FormField` wrapper (per DSV2-011's documented API) can inject them
 * exactly as it would into `Input` or `Textarea`. See the `FormFieldDemo` story in
 * `select.stories.tsx` for the intended composition shape (a local, clearly-labeled stand-in
 * used only because DSV2-011 was not yet integrated into this worktree at implementation time).
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { "aria-invalid": ariaInvalid, className, containerClassName, disabled, ...props },
  ref,
): React.ReactElement {
  const invalid = isAriaInvalid(ariaInvalid);

  return (
    <div
      data-slot="select-container"
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      className={cn("relative inline-flex items-center", containerClassName)}
    >
      <select
        ref={ref}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        className={cn(
          "h-[var(--size-control-md)] w-full appearance-none rounded-md border border-input bg-background pr-9 pl-3 text-sm text-foreground transition-[color,background-color,border-color,box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-[var(--opacity-disabled)] aria-invalid:border-invalid-border aria-invalid:focus-visible:ring-invalid-ring",
          className,
        )}
        {...props}
      />
      <CaretDown
        data-slot="select-caret"
        className={cn(
          "pointer-events-none absolute top-1/2 right-3 z-10 size-[var(--size-icon-sm)] -translate-y-1/2 text-muted-foreground",
          disabled && "opacity-[var(--opacity-disabled)]",
        )}
        aria-hidden="true"
      />
    </div>
  );
});
