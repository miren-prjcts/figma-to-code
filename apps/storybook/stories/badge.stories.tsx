import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@repo/ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Status" },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "success", "warning", "destructive"] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Info: Story = { args: { tone: "info", children: "Info" } };
export const Success: Story = { args: { tone: "success", children: "Success" } };
export const Warning: Story = { args: { tone: "warning", children: "Warning" } };
export const Destructive: Story = { args: { tone: "destructive", children: "Error" } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="destructive">Error</Badge>
    </div>
  ),
};
