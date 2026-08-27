"use client";

import * as React from "react";
import { CircleNotch, X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { Button } from "./button";
import { cn } from "../lib/utils";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const dialogStacks = new WeakMap<Document, HTMLElement[]>();
const scrollLocks = new WeakMap<Document, { count: number; previousOverflow: string }>();

function getDialogStack(ownerDocument: Document): HTMLElement[] {
  const existingStack = dialogStacks.get(ownerDocument);
  if (existingStack) return existingStack;

  const stack: HTMLElement[] = [];
  dialogStacks.set(ownerDocument, stack);
  return stack;
}

function isTopmostDialog(dialog: HTMLElement): boolean {
  const stack = getDialogStack(dialog.ownerDocument);
  return stack.at(-1) === dialog;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.closest("[hidden]") && element.getAttribute("aria-hidden") !== "true",
  );
}

function lockBodyScroll(ownerDocument: Document): () => void {
  const activeLock = scrollLocks.get(ownerDocument);
  if (activeLock) {
    activeLock.count += 1;
  } else {
    scrollLocks.set(ownerDocument, {
      count: 1,
      previousOverflow: ownerDocument.body.style.overflow,
    });
    ownerDocument.body.style.overflow = "hidden";
  }

  return () => {
    const lock = scrollLocks.get(ownerDocument);
    if (!lock) return;

    lock.count -= 1;
    if (lock.count === 0) {
      ownerDocument.body.style.overflow = lock.previousOverflow;
      scrollLocks.delete(ownerDocument);
    }
  };
}

// ── Enter/exit transition ────────────────────────────────────────────────
// Hand-rolled (no animation dependency, matching Modal's existing no-runtime-
// dependency contract). The visible CSS classes below always read the real
// tokens (var(--duration-base), var(--duration-fast), ...), so the rendered
// timing is token-driven. EXIT_DURATION_MS is the one place JS needs a
// number of its own: it decides how long the dialog stays mounted before
// unmounting, and mirrors --duration-fast in
// packages/tokens/src/tokens.css — kept in sync by convention, since a CSS
// custom property's computed value can't be read synchronously before first
// paint. Entering has no JS-side counterpart: it only needs "next frame"
// (requestAnimationFrame), not a specific duration.
type ModalPhase = "entering" | "entered" | "exiting" | null;

const EXIT_DURATION_MS = 120; // mirrors --duration-fast
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Tracks the `prefers-reduced-motion` media query, including live changes. */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(getPrefersReducedMotion);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setPrefersReducedMotion(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export type ModalCloseReason = "backdrop" | "close-button" | "escape-key";
export type ModalActionState = "default" | "disabled" | "loading";

export interface ModalAction {
  label: string;
  onAction: () => void;
  state?: ModalActionState;
  /** Visible while `state` is `loading`. Defaults to `${label}…`. */
  loadingLabel?: string;
}

export interface ModalProps {
  /** Controlled visibility. The modal never changes this value internally. */
  open: boolean;
  title: string;
  description?: string;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  /** Reports dismiss interactions; the consumer decides whether to set `open` to false. */
  onCloseRequest: (reason: ModalCloseReason) => void;
  /** Backdrop clicks are ignored by default to prevent accidental dismissal. */
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  className?: string;
}

interface ModalActionButtonProps {
  action: ModalAction;
  variant: "outline" | "solid";
}

function ModalActionButton({ action, variant }: ModalActionButtonProps): React.ReactElement {
  const state = action.state ?? "default";
  const isLoading = state === "loading";

  return (
    <Button
      variant={variant}
      disabled={state !== "default"}
      aria-busy={isLoading || undefined}
      onClick={action.onAction}
    >
      {isLoading ? (
        <>
          <CircleNotch
            className="mr-2 size-[var(--size-icon-sm)] animate-spin motion-reduce:animate-none"
            aria-hidden
          />
          {action.loadingLabel ?? `${action.label}…`}
        </>
      ) : (
        action.label
      )}
    </Button>
  );
}

/**
 * Controlled modal dialog with focus containment, focus return, Escape dismissal,
 * scroll locking, an explicit backdrop-dismissal policy, and a token-driven
 * enter/exit transition.
 */
export function Modal({
  open,
  title,
  description,
  primaryAction,
  secondaryAction,
  onCloseRequest,
  closeOnBackdropClick = false,
  showCloseButton = true,
  closeButtonLabel = "Close dialog",
  className,
}: ModalProps): React.ReactElement | null {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const onCloseRequestRef = React.useRef(onCloseRequest);
  const [portalRoot, setPortalRoot] = React.useState<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Transition phase. Mounted whenever phase !== null — this stays true
  // through "exiting" so the dialog remains in the DOM for the exit
  // animation, instead of unmounting the instant `open` becomes false.
  const [phase, setPhase] = React.useState<ModalPhase>(open ? "entered" : null);
  const previousOpenRef = React.useRef(open);

  // Derive the next phase synchronously during render when `open` changes
  // (React's documented pattern for adjusting state from a prop change).
  // This keeps `dialogRef` populated in the same commit `open` flips true,
  // so the focus-trap effect below never runs against a null ref.
  if (previousOpenRef.current !== open) {
    previousOpenRef.current = open;
    if (open) {
      setPhase(prefersReducedMotion ? "entered" : "entering");
    } else {
      setPhase((current) => {
        if (current === null) return null; // was never mounted
        return prefersReducedMotion ? null : "exiting";
      });
    }
  }

  // entering -> entered, one frame later (lets the initial "entering" style
  // paint first so the flip to "entered" is what actually animates).
  React.useEffect(() => {
    if (phase !== "entering") return;
    const frame = requestAnimationFrame(() => setPhase("entered"));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // exiting -> unmounted, after the exit transition's duration.
  React.useEffect(() => {
    if (phase !== "exiting") return;
    const timeout = setTimeout(() => setPhase(null), EXIT_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  React.useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  React.useEffect(() => {
    onCloseRequestRef.current = onCloseRequest;
  }, [onCloseRequest]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !portalRoot || !dialog) return;

    const ownerDocument = dialog.ownerDocument;
    const dialogStack = getDialogStack(ownerDocument);
    returnFocusRef.current =
      ownerDocument.activeElement instanceof HTMLElement ? ownerDocument.activeElement : null;
    dialogStack.push(dialog);
    const unlockBodyScroll = lockBodyScroll(ownerDocument);

    const focusFirstElement = () => {
      const firstFocusableElement = getFocusableElements(dialog)[0];
      (firstFocusableElement ?? dialog).focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTopmostDialog(dialog) || event.defaultPrevented) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRequestRef.current("escape-key");
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(dialog);
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);
      const activeElement = ownerDocument.activeElement;

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      if (
        event.shiftKey &&
        (activeElement === firstFocusableElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastFocusableElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!isTopmostDialog(dialog) || dialog.contains(event.target as Node)) return;
      focusFirstElement();
    };

    ownerDocument.addEventListener("keydown", handleKeyDown);
    ownerDocument.addEventListener("focusin", handleFocusIn);
    focusFirstElement();

    return () => {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
      ownerDocument.removeEventListener("focusin", handleFocusIn);
      const dialogIndex = dialogStack.lastIndexOf(dialog);
      if (dialogIndex !== -1) dialogStack.splice(dialogIndex, 1);
      unlockBodyScroll();

      const returnFocusElement = returnFocusRef.current;
      if (returnFocusElement?.isConnected) returnFocusElement.focus();
      returnFocusRef.current = null;
    };
  }, [open, portalRoot]);

  const mounted = phase !== null;
  if (!mounted || !portalRoot) return null;

  const isEntered = phase === "entered";
  const isExiting = phase === "exiting";
  const transitionTimingClassName = isExiting
    ? "duration-[var(--duration-fast)] ease-[var(--easing-accelerate)]"
    : "duration-[var(--duration-base)] ease-[var(--easing-decelerate)]";

  return createPortal(
    <div
      role="presentation"
      data-state={phase}
      className={cn(
        "fixed inset-0 z-[var(--layer-overlay)] flex items-center justify-center bg-foreground/40 p-4",
        "transition-opacity motion-reduce:transition-none",
        transitionTimingClassName,
        isEntered ? "opacity-100" : "opacity-0",
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && closeOnBackdropClick) {
          onCloseRequest("backdrop");
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description === undefined ? undefined : descriptionId}
        tabIndex={-1}
        data-state={phase}
        className={cn(
          "flex w-full max-w-[var(--size-dialog-sm)] flex-col gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-lg focus:outline-none",
          "transition-[opacity,transform] motion-reduce:transition-none",
          transitionTimingClassName,
          isEntered ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {title}
            </h2>
            {description !== undefined ? (
              <p id={descriptionId} className="text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {showCloseButton ? (
            <button
              type="button"
              aria-label={closeButtonLabel}
              onClick={() => onCloseRequest("close-button")}
              className="-m-2 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-2 leading-none text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
            >
              <X className="size-[var(--size-icon-sm)]" aria-hidden />
            </button>
          ) : null}
        </div>
        <div className="flex justify-end gap-2">
          {secondaryAction ? (
            <ModalActionButton action={secondaryAction} variant="outline" />
          ) : null}
          <ModalActionButton action={primaryAction} variant="solid" />
        </div>
      </div>
    </div>,
    portalRoot,
  );
}
