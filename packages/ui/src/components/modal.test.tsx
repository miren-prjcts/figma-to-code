import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./modal";

describe("Modal", () => {
  it("exposes dialog semantics and calls action handlers", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClose = vi.fn();

    render(
      <Modal
        title="Delete component"
        description="This action cannot be undone."
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole("dialog", { name: "Delete component" })).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
