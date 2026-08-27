import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

function renderOptions() {
  return (
    <>
      <option value="">Select a plan</option>
      <option value="starter">Starter</option>
      <option value="growth">Growth</option>
      <option value="enterprise">Enterprise</option>
    </>
  );
}

describe("Select", () => {
  it("is a native select exposed with the combobox role", () => {
    render(<Select aria-label="Plan">{renderOptions()}</Select>);

    const select = screen.getByRole("combobox", { name: "Plan" });
    expect(select.tagName).toBe("SELECT");
  });

  it("changes value via native selection (keyboard model is the browser's own)", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="Plan">{renderOptions()}</Select>);

    const select = screen.getByRole("combobox", { name: "Plan" }) as HTMLSelectElement;
    await user.selectOptions(select, "growth");

    expect(select).toHaveValue("growth");
  });

  it("exposes disabled state on the native field", () => {
    render(
      <Select aria-label="Plan" disabled>
        {renderOptions()}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Plan" });
    expect(select).toBeDisabled();
    expect(select).toHaveClass("disabled:bg-muted", "disabled:opacity-[var(--opacity-disabled)]");
    expect(select.parentElement).toHaveAttribute("data-disabled", "true");
  });

  it("forwards aria-invalid and applies the invalid state, matching Input's convention", () => {
    render(
      <Select aria-label="Plan" aria-invalid="true">
        {renderOptions()}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Plan" });
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveClass(
      "aria-invalid:border-invalid-border",
      "aria-invalid:focus-visible:ring-invalid-ring",
    );
    expect(select.parentElement).toHaveAttribute("data-invalid", "true");
  });

  it("renders a decorative caret that does not intercept pointer or a11y focus", () => {
    render(<Select aria-label="Plan">{renderOptions()}</Select>);

    const caret = document.querySelector('[data-slot="select-caret"]');
    expect(caret).not.toBeNull();
    expect(caret).toHaveAttribute("aria-hidden", "true");
    expect(caret).toHaveClass("pointer-events-none");
  });

  it("uses focus-visible styles on the native select and forwards its ref", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Plan">
        {renderOptions()}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Plan" });
    expect(select).toHaveClass("focus-visible:ring-2", "focus-visible:ring-ring");
    expect(ref.current).toBe(select);
  });
});
