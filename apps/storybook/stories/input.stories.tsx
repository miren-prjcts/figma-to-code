import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@repo/ui";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Search products…",
    "aria-label": "Search products",
    containerClassName: "w-[280px]",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Wireless mouse" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input placeholder="Search products…" containerClassName="w-[280px]" />
      <Input defaultValue="Wireless mouse" containerClassName="w-[280px]" />
      <Input placeholder="Search products…" disabled containerClassName="w-[280px]" />
    </div>
  ),
};
