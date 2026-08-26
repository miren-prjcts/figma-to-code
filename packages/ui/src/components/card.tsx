import * as React from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

/**
 * A compact, standalone metric. Use a generic Skeleton while metric data is loading;
 * StatCard deliberately does not duplicate loading UI.
 *
 * `action` is optional. Omit it to keep the action hidden. When present, its label is
 * the button's accessible name and its callback is invoked by the overflow control.
 */
export interface StatCardAction {
  /** Accessible name for the overflow action, such as "View total products". */
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  action?: StatCardAction;
}

export function StatCard({
  title,
  value,
  action,
  className,
  ...props
}: StatCardProps): React.ReactElement {
  return (
    <div
      className={cn("relative rounded-lg border border-border bg-card p-5", className)}
      {...props}
    >
      {action ? (
        // Hit area is --size-target-min (44px) so the control meets the minimum pointer
        // target while the icon keeps its --size-icon-md visual size. The box is inset by
        // top-1/right-1 (4px) rather than the icon's old top-4/right-4 (16px) so the icon's
        // rendered position is unchanged: (16px inset + 20px icon / 2) === (4px inset + 44px
        // box / 2) — both place the icon's center 26px from the card's top and right edges.
        <button
          type="button"
          aria-label={action.label}
          disabled={action.disabled}
          onClick={action.onClick}
          className="absolute top-1 right-1 flex size-[var(--size-target-min)] cursor-pointer items-center justify-center rounded-md border-0 bg-transparent leading-none text-muted-foreground hover:text-card-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]"
        >
          <DotsThreeVertical className="size-[var(--size-icon-md)]" aria-hidden />
        </button>
      ) : null}
      <dl>
        <dt className="text-sm text-muted-foreground">{title}</dt>
        <dd className="m-0 text-2xl font-semibold text-card-foreground">{value}</dd>
      </dl>
    </div>
  );
}
