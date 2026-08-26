import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, Modal, type ModalProps } from "@repo/ui";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A controlled, accessible dialog. Consumers own `open`; dismissal gestures report their source through `onCloseRequest`. Backdrop dismissal is disabled unless explicitly enabled.",
      },
    },
  },
  args: {
    open: true,
    title: "Confirm changes",
    description: "Review these changes before saving.",
    primaryAction: { label: "Save changes", onAction: fn() },
    secondaryAction: { label: "Cancel", onAction: fn() },
    onCloseRequest: fn(),
    closeOnBackdropClick: false,
    showCloseButton: true,
  },
  argTypes: {
    onCloseRequest: {
      description: "Called with `escape-key`, `backdrop`, or `close-button`.",
    },
    closeOnBackdropClick: {
      description: "Opt-in backdrop dismissal policy. Defaults to `false`.",
      control: "boolean",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

function ControlledExample(props: Omit<ModalProps, "open" | "onCloseRequest">): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...props} open={open} onCloseRequest={() => setOpen(false)} />
    </div>
  );
}

export const Controlled: Story = {
  render: () => (
    <ControlledExample
      title="Invite teammate"
      description="They will receive an email invitation."
      primaryAction={{ label: "Send invitation", onAction: fn() }}
      secondaryAction={{ label: "Cancel", onAction: fn() }}
      closeOnBackdropClick
    />
  ),
};

export const OneAction: Story = {
  args: {
    title: "You are all set",
    description: undefined,
    primaryAction: { label: "Continue", onAction: fn() },
    secondaryAction: undefined,
    showCloseButton: false,
  },
};

export const ActionStates: Story = {
  args: {
    title: "Publishing release",
    primaryAction: {
      label: "Publish",
      loadingLabel: "Publishing",
      state: "loading",
      onAction: fn(),
    },
    secondaryAction: {
      label: "Save draft",
      state: "disabled",
      onAction: fn(),
    },
  },
};
