import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@repo/ui";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Enter a project name",
    "aria-label": "Project name",
    containerClassName: "w-[280px]",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Atlas" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: "Atlas", readOnly: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, "aria-describedby": "project-error" },
  render: (args) => (
    <div>
      <Input {...args} />
      <p id="project-error" style={{ color: "var(--destructive-foreground)", marginTop: 8 }}>
        A project name is required.
      </p>
    </div>
  ),
};

export const WithAdornments: Story = {
  args: {
    "aria-label": "Budget",
    leadingAdornment: "$",
    trailingAdornment: "USD",
    placeholder: "0.00",
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input
        aria-label="Default project name"
        placeholder="Default"
        containerClassName="w-[280px]"
      />
      <Input
        aria-label="Filled project name"
        defaultValue="Filled"
        containerClassName="w-[280px]"
      />
      <Input
        aria-label="Focused project name"
        placeholder="Focus visible"
        className="ring-2 ring-ring ring-offset-2 ring-offset-background"
        containerClassName="w-[280px]"
      />
      <Input
        aria-label="Disabled project name"
        placeholder="Disabled"
        disabled
        containerClassName="w-[280px]"
      />
      <Input
        aria-label="Read-only project name"
        defaultValue="Read only"
        readOnly
        containerClassName="w-[280px]"
      />
      <Input
        aria-label="Invalid project name"
        placeholder="Invalid"
        aria-invalid="true"
        containerClassName="w-[280px]"
      />
    </div>
  ),
};
