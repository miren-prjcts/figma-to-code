import type { Meta, StoryObj } from "@storybook/react";
import { FormField, Radio, RadioGroup } from "@repo/ui";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Forms/Radio",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="plan-default" defaultValue="pro">
      <Radio value="free" aria-label="Free" />
      <Radio value="pro" aria-label="Pro" />
      <Radio value="team" aria-label="Team" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="plan-disabled" defaultValue="pro" disabled>
      <Radio value="free" aria-label="Free" />
      <Radio value="pro" aria-label="Pro" />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup name="plan-invalid" defaultValue="free">
      <Radio value="free" aria-label="Free" aria-invalid="true" />
      <Radio value="pro" aria-label="Pro" aria-invalid="true" />
    </RadioGroup>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>Plan</span>
      <RadioGroup name="plan-form-field" defaultValue="pro">
        <FormField label="Free" orientation="horizontal">
          <Radio value="free" />
        </FormField>
        <FormField label="Pro" orientation="horizontal">
          <Radio value="pro" />
        </FormField>
        <FormField label="Team" orientation="horizontal">
          <Radio value="team" />
        </FormField>
      </RadioGroup>
    </div>
  ),
};

/**
 * All options share `name`, which is what gives the group native browser roving-tabindex and
 * Arrow-key move-and-select behavior — real keyboard-driven UA behavior, only verifiable live
 * in a browser (jsdom does not simulate it; see `radio.test.tsx`'s note and the same boundary
 * documented for Select's native keyboard model in DSV2-012).
 */
export const NativeKeyboardModel: Story = {
  render: () => (
    <RadioGroup name="plan-keyboard" defaultValue="free">
      <Radio value="free" aria-label="Free" />
      <Radio value="pro" aria-label="Pro" />
      <Radio value="team" aria-label="Team" />
    </RadioGroup>
  ),
};
