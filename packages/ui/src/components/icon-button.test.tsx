import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./icon-button";

function BellIcon(): React.ReactElement {
  return <svg data-testid="bell-icon" />;
}

describe("IconButton", () => {
  it.each([
    ["solid", ["bg-primary", "text-primary-foreground"]],
    ["outline", ["border", "border-input", "bg-background"]],
    ["ghost", ["bg-transparent", "text-foreground"]],
  ] as const)("renders the %s variant", (variant, classes) => {
    render(<IconButton variant={variant} icon={<BellIcon />} aria-label="Notifications" />);

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(button).toHaveClass(...classes);
  });

  it.each([
    ["sm", "size-[var(--size-control-sm)]"],
    ["md", "size-[var(--size-control-md)]"],
    ["lg", "size-[var(--size-control-lg)]"],
  ] as const)("renders the %s size", (size, expectedClass) => {
    render(<IconButton size={size} icon={<BellIcon />} aria-label="Notifications" />);

    expect(screen.getByRole("button", { name: "Notifications" })).toHaveClass(expectedClass);
  });

  it("defaults to the md size and solid variant", () => {
    render(<IconButton icon={<BellIcon />} aria-label="Notifications" />);

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(button).toHaveClass("size-[var(--size-control-md)]", "bg-primary");
  });

  it("expands the sm size's hit area to the shared minimum-target token without resizing the visible box", () => {
    render(<IconButton size="sm" icon={<BellIcon />} aria-label="Notifications" />);

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(button).toHaveClass("size-[var(--size-control-sm)]");
    expect(button).toHaveClass(
      "before:absolute",
      "before:content-['']",
      "before:inset-[calc((var(--size-control-sm)_-_var(--size-target-min))/2)]",
    );
  });

  it("keeps the icon's own visual size fixed regardless of the button size", () => {
    const { rerender } = render(
      <IconButton size="sm" icon={<BellIcon />} aria-label="Notifications" />,
    );
    expect(screen.getByTestId("bell-icon").parentElement).toHaveClass("size-[var(--size-icon-sm)]");

    rerender(<IconButton size="lg" icon={<BellIcon />} aria-label="Notifications" />);
    expect(screen.getByTestId("bell-icon").parentElement).toHaveClass("size-[var(--size-icon-md)]");
  });

  it("uses aria-label as the accessible name and marks the icon decorative", () => {
    render(<IconButton icon={<BellIcon />} aria-label="Notifications" />);

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(screen.getByTestId("bell-icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(button).toBeInTheDocument();
  });

  it("enforces aria-label at the type level (a TypeScript error, not just an a11y lint warning)", () => {
    // @ts-expect-error aria-label is a required prop on IconButtonProps — omitting it must
    // fail `tsc --noEmit`. If this stops erroring, aria-label has silently become optional.
    render(<IconButton icon={<BellIcon />} />);
  });

  it("does not offer a destructive variant (scoped to Button only)", () => {
    render(
      // @ts-expect-error "destructive" is not a valid IconButton variant.
      <IconButton variant="destructive" icon={<BellIcon />} aria-label="Delete" />,
    );
  });

  it("supports disabled interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <IconButton disabled icon={<BellIcon />} aria-label="Notifications" onClick={onClick} />,
    );

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("prevents activation while loading, shows a spinner, and retains the accessible name", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<IconButton loading icon={<BellIcon />} aria-label="Notifications" onClick={onClick} />);

    const button = screen.getByRole("button", { name: "Notifications" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    expect(screen.getByTestId("bell-icon").parentElement).toHaveClass("invisible");

    const spinner = button.querySelector('[data-slot="icon-button-spinner"]');
    expect(spinner).toHaveAttribute("aria-hidden", "true");
    expect(spinner).toHaveClass("animate-spin", "motion-reduce:animate-none");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards its ref to the native button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={<BellIcon />} aria-label="Notifications" />);

    expect(ref.current).toBe(screen.getByRole("button", { name: "Notifications" }));
  });
});
