import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("is a native multiline textbox that accepts input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Description" placeholder="Enter a description" />);

    const textarea = screen.getByRole("textbox", { name: "Description" });
    await user.type(textarea, "Some notes");

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue("Some notes");
    expect(textarea).toHaveAttribute("placeholder", "Enter a description");
  });

  it("defaults to 3 rows when autoResize is off", () => {
    render(<Textarea aria-label="Notes" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toHaveAttribute("rows", "3");
    expect(textarea).toHaveClass("resize-y");
  });

  it("supports an explicit rows override", () => {
    render(<Textarea aria-label="Notes" rows={6} />);

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("rows", "6");
  });

  it("exposes filled and disabled states on the native field", () => {
    render(<Textarea aria-label="Summary" defaultValue="Atlas launch notes" disabled />);

    const textarea = screen.getByRole("textbox", { name: "Summary" });
    expect(textarea).toHaveValue("Atlas launch notes");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass("disabled:bg-muted", "disabled:opacity-[var(--opacity-disabled)]");
    expect(textarea).toHaveAttribute("data-disabled", "true");
  });

  it("supports read-only behavior", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Summary" defaultValue="Atlas" readOnly />);

    const textarea = screen.getByRole("textbox", { name: "Summary" });
    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toHaveClass("read-only:bg-muted");
    expect(textarea).toHaveAttribute("data-readonly", "true");

    await user.type(textarea, " updated");
    expect(textarea).toHaveValue("Atlas");
  });

  it("forwards aria-invalid and applies the invalid state, matching Input's convention", () => {
    render(<Textarea aria-label="Summary" aria-invalid="true" />);

    const textarea = screen.getByRole("textbox", { name: "Summary" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass(
      "aria-invalid:border-invalid-border",
      "aria-invalid:focus-visible:ring-invalid-ring",
    );
    expect(textarea).toHaveAttribute("data-invalid", "true");
  });

  it("uses focus-visible styles on the native textarea and forwards its ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Summary" />);

    const textarea = screen.getByRole("textbox", { name: "Summary" });
    expect(textarea).toHaveClass("focus-visible:ring-2", "focus-visible:ring-ring");
    expect(ref.current).toBe(textarea);
  });

  it("grows to fit content when autoResize is enabled, without a scrollbar", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Grows" autoResize />);

    const textarea = screen.getByRole("textbox", { name: "Grows" }) as HTMLTextAreaElement;
    expect(textarea).toHaveClass("resize-none", "overflow-hidden");

    await user.type(textarea, "line one{enter}line two{enter}line three");
    // jsdom does not compute real layout/scrollHeight, but the resize handler must run without
    // throwing and must not remove the inline height it manages.
    expect(textarea.style.height).not.toBe("");
  });

  it("still calls a consumer-provided onChange when autoResize is enabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea aria-label="Grows" autoResize onChange={onChange} />);

    await user.type(screen.getByRole("textbox", { name: "Grows" }), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
