import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it.each([
    ["solid", ["bg-primary", "text-primary-foreground"]],
    ["outline", ["border", "border-input", "bg-background"]],
    ["ghost", ["bg-transparent", "text-foreground"]],
  ] as const)("renders the %s variant", (variant, classes) => {
    render(<Button variant={variant}>Action</Button>);

    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toHaveClass(...classes);
  });

  it.each([
    ["sm", "h-[var(--size-control-sm)]"],
    ["md", "h-[var(--size-control-md)]"],
  ] as const)("renders the %s size", (size, expectedClass) => {
    render(<Button size={size}>Action</Button>);

    expect(screen.getByRole("button", { name: "Action" })).toHaveClass(expectedClass);
  });

  it("includes hover, pressed, and focus-visible interaction styles", () => {
    render(<Button>Action</Button>);

    expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
      "hover:bg-primary-hover",
      "active:bg-primary-pressed",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
    );
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

  it("renders decorative leading and trailing icons without changing the accessible name", () => {
    render(
      <Button
        leadingIcon={<svg data-testid="leading-icon" />}
        trailingIcon={<svg data-testid="trailing-icon" />}
      >
        Continue
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    expect(screen.getByTestId("leading-icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("trailing-icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("prevents activation while loading and retains the accessible name", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button.querySelector('[data-slot="button-content"]')).toHaveClass("opacity-0");
    expect(button.querySelector('[data-slot="button-spinner"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(button.querySelector('[data-slot="button-spinner"]')).toHaveClass(
      "animate-spin",
      "motion-reduce:animate-none",
    );

    await user.click(button);
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards its ref to the native button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Action</Button>);

    expect(ref.current).toBe(screen.getByRole("button", { name: "Action" }));
  });
});
