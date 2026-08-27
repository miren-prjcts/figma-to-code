import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders role=switch, off by default, and toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Enable notifications" />);

    const toggle = screen.getByRole("switch", { name: "Enable notifications" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("toggles with Space and Enter", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Enable notifications" />);

    const toggle = screen.getByRole("switch", { name: "Enable notifications" });
    toggle.focus();

    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("supports a controlled checked state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch
        aria-label="Enable notifications"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );

    const toggle = screen.getByRole("switch", { name: "Enable notifications" });
    await user.click(toggle);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // Controlled: visual state does not move until the `checked` prop itself changes.
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("respects disabled", () => {
    render(<Switch aria-label="Enable notifications" disabled />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeDisabled();
  });

  it("forwards a ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch aria-label="Enable notifications" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
