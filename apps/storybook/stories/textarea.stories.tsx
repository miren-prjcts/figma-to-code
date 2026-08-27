import type { Meta, StoryObj } from "@storybook/react";
import { FormField, Textarea } from "@repo/ui";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Add project notes",
    "aria-label": "Project notes",
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Atlas launches next quarter." },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: "Atlas launches next quarter.", readOnly: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, "aria-describedby": "notes-error" },
  render: (args) => (
    <div>
      <Textarea {...args} />
      <p id="notes-error" style={{ color: "var(--destructive-foreground)", marginTop: 8 }}>
        Notes are required.
      </p>
    </div>
  ),
};

/**
 * `autoResize` grows the field to fit content instead of showing a scrollbar (no new runtime
 * dependency — a plain ref + `scrollHeight` measurement). This is opt-in; the default is a
 * fixed-rows textarea (`rows={3}`) with the native vertical resize handle, shown in `Default`.
 */
export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue:
      "Auto-resize grows this field as you type.\nTry adding a few more lines to see it expand.",
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Textarea aria-label="Default notes" placeholder="Default" />
      <Textarea aria-label="Filled notes" defaultValue="Filled" />
      <Textarea
        aria-label="Focused notes"
        placeholder="Focus visible"
        className="ring-2 ring-ring ring-offset-2 ring-offset-background"
      />
      <Textarea aria-label="Disabled notes" placeholder="Disabled" disabled />
      <Textarea aria-label="Read-only notes" defaultValue="Read only" readOnly />
      <Textarea aria-label="Invalid notes" placeholder="Invalid" aria-invalid="true" />
    </div>
  ),
};

export const FormFieldWrapped: Story = {
  name: "FormField-wrapped",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
      <FormField label="Project notes" description="Visible to everyone on the project.">
        <Textarea placeholder="Add project notes" />
      </FormField>
      <FormField label="Launch summary" error="A summary is required." required>
        <Textarea defaultValue="" />
      </FormField>
    </div>
  ),
};
