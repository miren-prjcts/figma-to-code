import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@repo/ui";

function BellIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor">
      <path d="M8 2a4 4 0 0 0-4 4v2.5L3 11h10l-1-2.5V6a4 4 0 0 0-4-4Z" />
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  args: { icon: <BellIcon />, "aria-label": "Notifications" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Solid: Story = { args: { variant: "solid" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <IconButton variant="solid" icon={<BellIcon />} aria-label="Notifications" />
      <IconButton variant="outline" icon={<BellIcon />} aria-label="Notifications" />
      <IconButton variant="ghost" icon={<BellIcon />} aria-label="Notifications" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <IconButton size="sm" icon={<BellIcon />} aria-label="Notifications" />
      <IconButton size="md" icon={<BellIcon />} aria-label="Notifications" />
      <IconButton size="lg" icon={<BellIcon />} aria-label="Notifications" />
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };

const cellLabel: React.CSSProperties = {
  font: "500 12px/16px var(--font-sans, sans-serif)",
  color: "var(--muted-foreground)",
};

/**
 * `sm`'s VISIBLE box stays --size-control-sm (32px, matching Button's sm control height) while
 * its actual hit area is expanded to the shared --size-target-min (44px) token via an invisible
 * `::before` overlay — the same minimum-pointer-target requirement StatCard's overflow action
 * satisfies, adapted for a standalone control instead of one inset within a card. The dashed
 * outline below is a Storybook-only visual aid — not part of the component — showing where that
 * 44×44 hit area sits relative to the 32px visible icon button, centered on the same point.
 */
export const TargetSize: Story = {
  name: "sm — minimum target size",
  render: () => (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <IconButton size="sm" icon={<BellIcon />} aria-label="Notifications" />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -6,
          left: -6,
          width: 44,
          height: 44,
          border: "1px dashed var(--destructive, crimson)",
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />
      <p style={{ ...cellLabel, position: "absolute", top: 52, left: -6, width: 220 }}>
        Dashed outline: the 44×44px (--size-target-min) pointer target around the sm icon button.
      </p>
    </div>
  ),
};
