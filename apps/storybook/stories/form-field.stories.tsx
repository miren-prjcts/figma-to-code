import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, FormField, Input } from "@repo/ui";

const meta: Meta<typeof FormField> = {
  title: "Components/Forms/FormField",
  component: FormField,
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Vertical: Story = {
  render: () => (
    <FormField label="Project name" description="Shown to your team.">
      <Input placeholder="Acme Inc." containerClassName="w-[280px]" />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField label="Project name" required>
      <Input placeholder="Acme Inc." containerClassName="w-[280px]" required />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Project name" error="A project name is required.">
      <Input containerClassName="w-[280px]" />
    </FormField>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <FormField label="Accept the terms and conditions" orientation="horizontal">
      <Checkbox />
    </FormField>
  ),
};
