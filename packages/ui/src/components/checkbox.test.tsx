import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("is unchecked by default and toggles on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("toggles with the Space key", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    checkbox.focus();
    await user.keyboard(" ");

    expect(checkbox).toBeChecked();
  });

  it("supports indeterminate, set imperatively and read back via aria-checked=mixed", () => {
    render(<Checkbox aria-label="Select all" indeterminate />);

    const checkbox = screen.getByRole("checkbox", { name: "Select all" }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("respects disabled", () => {
    render(<Checkbox aria-label="Accept terms" disabled />);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeDisabled();
  });

  it("renders aria-invalid styling state", () => {
    render(<Checkbox aria-label="Accept terms" aria-invalid />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox.closest('[data-slot="checkbox"]')).toHaveAttribute("data-invalid", "true");
  });

  it("forwards a ref to the underlying input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox aria-label="Accept terms" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
