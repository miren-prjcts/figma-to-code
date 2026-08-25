import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "@repo/ui";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "fullscreen" },
  args: {
    title: "Confirm changes",
    description: "This action will update the product.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
