import type { Meta, StoryObj } from "@storybook/react";
import { FormField, Switch } from "@repo/ui";

const meta: Meta<typeof Switch> = {
  title: "Components/Forms/Switch",
  component: Switch,
  args: {
    "aria-label": "Enable notifications",
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithFormField: Story = {
  render: () => (
    <FormField
      label="Enable notifications"
      description="Get notified about important account activity."
      orientation="horizontal"
    >
      <Switch />
    </FormField>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch aria-label="Off" />
      <Switch aria-label="On" defaultChecked />
      <Switch aria-label="Disabled off" disabled />
      <Switch aria-label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
