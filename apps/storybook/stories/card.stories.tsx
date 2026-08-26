import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "@repo/ui";

const meta: Meta<typeof StatCard> = {
  title: "Components/Card",
  component: StatCard,
  args: { title: "Total products", value: "1,248" },
};
export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <StatCard {...args} />
    </div>
  ),
};

/**
 * Three cards from ONE component — different title/value for each instance.
 * This is per-instance content (like a TEXT property in Figma), not three separate components.
 */
export const Stats: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <StatCard title="Total products" value="1,248" style={{ width: 220, flexShrink: 0 }} />
      <StatCard title="Low stock" value="23" style={{ width: 220, flexShrink: 0 }} />
      <StatCard title="Out of stock" value="5" style={{ width: 220, flexShrink: 0 }} />
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    action: {
      label: "View total products",
      onClick: () => undefined,
    },
  },
  render: (args) => (
    <div style={{ width: 220 }}>
      <StatCard {...args} />
    </div>
  ),
};

/**
 * The overflow action's rendered icon stays --size-icon-md (20px), but its hit area is
 * the shared --size-target-min token (44px) so it meets the project's minimum pointer
 * target. The dashed outline below is a Storybook-only visual aid — not part of the
 * component — showing where that 44×44 hit area sits relative to the card, centered on
 * the same point the plain 20px icon used to occupy.
 */
export const TargetSize: Story = {
  name: "Action — minimum target size",
  render: () => (
    <div style={{ width: 220, position: "relative" }}>
      <StatCard
        title="Total products"
        value="1,248"
        action={{ label: "View total products", onClick: () => undefined }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 44,
          height: 44,
          border: "1px dashed var(--destructive-foreground, crimson)",
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          marginTop: 12,
          font: "500 12px/16px var(--font-sans, sans-serif)",
          color: "var(--muted-foreground)",
        }}
      >
        Dashed outline: the 44×44px (--size-target-min) pointer target around the overflow action.
      </p>
    </div>
  ),
};
