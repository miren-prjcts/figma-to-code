"use client";

import * as React from "react";
import { X } from "@phosphor-icons/react";
import { Button } from "./button";
import { cn } from "../lib/utils";

/**
 * Modal — a 1:1 match with the Figma “Modal” component.
 *
 * Scrim (overlay) + surface (card/border/radius/shadow-soft). Colors and shadow come ONLY
 * from tokens: bg-foreground/40, bg-card, border-border, shadow-soft, text-foreground,
 * text-muted-foreground. No hex values.
 *
 * Accessibility: role="dialog" + aria-modal + aria-labelledby/aria-describedby;
 * close is a button with aria-label; the X icon is decorative (Phosphor, the same library).
 */
export interface ModalProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
}

export function Modal({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  onClose,
  className,
}: ModalProps): React.ReactElement {
  const titleId = React.useId();
  const descId = React.useId();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          "flex w-[420px] flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-soft",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {title}
            </h2>
            {description && (
              <p id={descId} className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 cursor-pointer border-0 bg-transparent p-0 leading-none text-muted-foreground hover:text-foreground"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
