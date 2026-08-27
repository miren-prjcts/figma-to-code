import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./radio";

describe("RadioGroup / Radio", () => {
  it("renders a radiogroup with one Tab stop, only the selected option checked", () => {
    render(
      <RadioGroup name="plan" defaultValue="pro">
        <Radio value="free" aria-label="Free" />
        <Radio value="pro" aria-label="Pro" />
        <Radio value="team" aria-label="Team" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Team" })).not.toBeChecked();

    // All radios share `name="plan"`, which is what gives the group native browser roving-
    // tabindex and Arrow-key move-and-select behavior — real keyboard-driven focus movement
    // between same-name radios is browser UA behavior, not something jsdom's DOM simulation
    // reimplements, so it is not asserted here (same boundary DSV2-012 documents for Select's
    // native keyboard model). What's verified: the grouping mechanism itself is wired correctly.
    for (const name of ["Free", "Pro", "Team"]) {
      expect(screen.getByRole("radio", { name })).toHaveAttribute("name", "plan");
    }
  });

  it("selects an option on click and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <RadioGroup name="plan" defaultValue="free" onValueChange={onValueChange}>
        <Radio value="free" aria-label="Free" />
        <Radio value="pro" aria-label="Pro" />
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("supports a fully controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <RadioGroup name="plan" value="free" onValueChange={onValueChange}>
        <Radio value="free" aria-label="Free" />
        <Radio value="pro" aria-label="Pro" />
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onValueChange).toHaveBeenCalledWith("pro");
    // Controlled: selection does not move until the `value` prop itself changes.
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });

  it("disables all radios via the group, per-radio override still wins", () => {
    render(
      <RadioGroup name="plan" defaultValue="free" disabled>
        <Radio value="free" aria-label="Free" />
        <Radio value="pro" aria-label="Pro" disabled={false} />
      </RadioGroup>,
    );

    expect(screen.getByRole("radio", { name: "Free" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeDisabled();
  });

  it("throws when a Radio is rendered outside a RadioGroup", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Radio value="free" aria-label="Free" />)).toThrow(
      "Radio must be rendered inside a RadioGroup.",
    );
    consoleError.mockRestore();
  });
});
