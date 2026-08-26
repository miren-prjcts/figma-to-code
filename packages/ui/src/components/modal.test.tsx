import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal, type ModalCloseReason } from "./modal";

const primaryAction = { label: "Save", onAction: vi.fn() };

describe("Modal", () => {
  it("renders only while open with labelled dialog semantics", () => {
    const { rerender } = render(
      <Modal
        open={false}
        title="Confirm changes"
        description="Review these changes before saving."
        primaryAction={primaryAction}
        onCloseRequest={vi.fn()}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Modal
        open
        title="Confirm changes"
        description="Review these changes before saving."
        primaryAction={primaryAction}
        onCloseRequest={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog", { name: "Confirm changes" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Review these changes before saving.");
  });

  it("omits optional description and close button semantics", () => {
    render(
      <Modal
        open
        title="Session expired"
        primaryAction={primaryAction}
        showCloseButton={false}
        onCloseRequest={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog", { name: "Session expired" });
    expect(dialog).not.toHaveAttribute("aria-describedby");
    expect(within(dialog).queryByRole("button", { name: "Close dialog" })).not.toBeInTheDocument();
  });

  it("requests close with the source for Escape and the close button", async () => {
    const user = userEvent.setup();
    const onCloseRequest = vi.fn<(reason: ModalCloseReason) => void>();

    render(
      <Modal
        open
        title="Confirm changes"
        primaryAction={primaryAction}
        onCloseRequest={onCloseRequest}
      />,
    );

    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(onCloseRequest).toHaveBeenNthCalledWith(1, "escape-key");
    expect(onCloseRequest).toHaveBeenNthCalledWith(2, "close-button");
  });

  it("uses an explicit backdrop-close policy", async () => {
    const user = userEvent.setup();
    const onCloseRequest = vi.fn();
    const { rerender } = render(
      <Modal
        open
        title="Confirm changes"
        primaryAction={primaryAction}
        onCloseRequest={onCloseRequest}
      />,
    );

    const backdrop = screen.getByRole("dialog").parentElement;
    expect(backdrop).not.toBeNull();
    await user.click(backdrop!);
    expect(onCloseRequest).not.toHaveBeenCalled();

    rerender(
      <Modal
        open
        title="Confirm changes"
        primaryAction={primaryAction}
        closeOnBackdropClick
        onCloseRequest={onCloseRequest}
      />,
    );
    await user.click(screen.getByRole("dialog").parentElement!);
    expect(onCloseRequest).toHaveBeenCalledOnce();
    expect(onCloseRequest).toHaveBeenCalledWith("backdrop");
  });

  it("contains keyboard focus and returns it after the consumer closes the modal", async () => {
    const user = userEvent.setup();

    function ControlledModal(): React.ReactElement {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open modal
          </button>
          <Modal
            open={open}
            title="Edit profile"
            primaryAction={{ label: "Save", onAction: vi.fn() }}
            secondaryAction={{ label: "Cancel", onAction: vi.fn() }}
            onCloseRequest={() => setOpen(false)}
          />
        </>
      );
    }

    render(<ControlledModal />);
    const trigger = screen.getByRole("button", { name: "Open modal" });
    await user.click(trigger);

    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    const primaryButton = screen.getByRole("button", { name: "Save" });
    expect(closeButton).toHaveFocus();

    primaryButton.focus();
    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(primaryButton).toHaveFocus();

    trigger.focus();
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("locks body scrolling only while open", () => {
    document.body.style.overflow = "auto";
    const { rerender, unmount } = render(
      <Modal open title="Confirm changes" primaryAction={primaryAction} onCloseRequest={vi.fn()} />,
    );

    expect(document.body).toHaveStyle({ overflow: "hidden" });
    rerender(
      <Modal
        open={false}
        title="Confirm changes"
        primaryAction={primaryAction}
        onCloseRequest={vi.fn()}
      />,
    );
    expect(document.body).toHaveStyle({ overflow: "auto" });

    unmount();
    document.body.style.overflow = "";
  });

  it("supports one or two actions in default, disabled, and loading states", async () => {
    const user = userEvent.setup();
    const onPrimaryAction = vi.fn();
    const onSecondaryAction = vi.fn();

    render(
      <Modal
        open
        title="Publish release"
        primaryAction={{
          label: "Publish",
          loadingLabel: "Publishing",
          state: "loading",
          onAction: onPrimaryAction,
        }}
        secondaryAction={{ label: "Save draft", state: "disabled", onAction: onSecondaryAction }}
        onCloseRequest={vi.fn()}
      />,
    );

    const loadingAction = screen.getByRole("button", { name: "Publishing" });
    const disabledAction = screen.getByRole("button", { name: "Save draft" });
    expect(loadingAction).toBeDisabled();
    expect(loadingAction).toHaveAttribute("aria-busy", "true");
    expect(disabledAction).toBeDisabled();
    await user.click(loadingAction);
    await user.click(disabledAction);
    expect(onPrimaryAction).not.toHaveBeenCalled();
    expect(onSecondaryAction).not.toHaveBeenCalled();
  });

  it("runs a single action in its default state", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <Modal
        open
        title="Update complete"
        primaryAction={{ label: "Continue", onAction }}
        onCloseRequest={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
