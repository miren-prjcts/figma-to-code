import type { Meta, StoryObj } from "@storybook/react";
import { FormField, Select } from "@repo/ui";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    "aria-label": "Plan",
    containerClassName: "w-[280px]",
  },
  render: (args) => (
    <Select {...args}>
      <option value="">Select a plan</option>
      <option value="starter">Starter</option>
      <option value="growth">Growth</option>
      <option value="enterprise">Enterprise</option>
    </Select>
  ),
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "growth" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, "aria-describedby": "plan-error" },
  render: (args) => (
    <div>
      <Select {...args}>
        <option value="">Select a plan</option>
        <option value="starter">Starter</option>
        <option value="growth">Growth</option>
        <option value="enterprise">Enterprise</option>
      </Select>
      <p id="plan-error" style={{ color: "var(--destructive-foreground)", marginTop: 8 }}>
        Choose a plan to continue.
      </p>
    </div>
  ),
};

export const States: Story = {
  render: () => {
    const options = (
      <>
        <option value="">Select a plan</option>
        <option value="starter">Starter</option>
        <option value="growth">Growth</option>
        <option value="enterprise">Enterprise</option>
      </>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select aria-label="Default plan" containerClassName="w-[280px]">
          {options}
        </Select>
        <Select aria-label="Filled plan" defaultValue="growth" containerClassName="w-[280px]">
          {options}
        </Select>
        <Select
          aria-label="Focused plan"
          className="ring-2 ring-ring ring-offset-2 ring-offset-background"
          containerClassName="w-[280px]"
        >
          {options}
        </Select>
        <Select aria-label="Disabled plan" disabled containerClassName="w-[280px]">
          {options}
        </Select>
        <Select aria-label="Invalid plan" aria-invalid="true" containerClassName="w-[280px]">
          {options}
        </Select>
      </div>
    );
  },
};

/**
 * The keyboard model here (typing to jump options, Arrow keys, Escape/Enter) is the browser's
 * native `<select>` behavior, not reimplemented by this component — it can only be verified live
 * in a real browser, not statically in Storybook's canvas. This story exists to document that
 * fact next to the component, per Charter §8's accessibility-notes requirement for states that
 * can only be demonstrated statically.
 */
export const NativeKeyboardModel: Story = {
  name: "Native keyboard model (see comment)",
};

export const FormFieldWrapped: Story = {
  name: "FormField-wrapped",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
      <FormField label="Plan" description="You can change this later.">
        <Select>
          <option value="">Select a plan</option>
          <option value="starter">Starter</option>
          <option value="growth">Growth</option>
          <option value="enterprise">Enterprise</option>
        </Select>
      </FormField>
      <FormField label="Region" error="Choose a region to continue." required>
        <Select defaultValue="">
          <option value="">Select a region</option>
          <option value="us">United States</option>
          <option value="eu">Europe</option>
        </Select>
      </FormField>
    </div>
  ),
};
