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
