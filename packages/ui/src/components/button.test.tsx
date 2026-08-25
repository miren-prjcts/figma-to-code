import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it.each([
    ["solid", ["bg-primary", "text-primary-foreground"]],
    ["outline", ["border", "border-border"]],
    ["ghost", ["bg-transparent", "text-foreground"]],
  ] as const)("renders the %s variant", (variant, classes) => {
    render(<Button variant={variant}>Action</Button>);

    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toHaveClass(...classes);
  });

  it("defaults to a non-submit button", () => {
    render(<Button>Action</Button>);

    expect(screen.getByRole("button", { name: "Action" })).toHaveAttribute("type", "button");
  });

  it("supports disabled interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Action
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
