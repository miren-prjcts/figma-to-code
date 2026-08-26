import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("is a native text input that accepts input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Component name" placeholder="Enter a component name" />);

    const input = screen.getByRole("textbox", { name: "Component name" });
    await user.type(input, "Button");

    expect(input).toHaveValue("Button");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Enter a component name");
  });

  it("supports native input types and external labels", () => {
    render(
      <>
        <label htmlFor="email">Email address</label>
        <Input id="email" type="email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveAttribute("type", "email");
  });

  it("exposes filled and disabled states on the native field", () => {
    render(<Input aria-label="Project" defaultValue="Atlas" disabled />);

    const input = screen.getByRole("textbox", { name: "Project" });
    expect(input).toHaveValue("Atlas");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:bg-muted", "disabled:opacity-50");
    expect(input.parentElement).toHaveAttribute("data-disabled", "true");
  });

  it("supports read-only behavior", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Project" defaultValue="Atlas" readOnly />);

    const input = screen.getByRole("textbox", { name: "Project" });
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveClass("read-only:bg-muted");
    expect(input.parentElement).toHaveAttribute("data-readonly", "true");

    await user.type(input, " updated");
    expect(input).toHaveValue("Atlas");
  });

  it("forwards aria-invalid and applies the invalid state", () => {
    render(<Input aria-label="Project" aria-invalid="true" />);

    const input = screen.getByRole("textbox", { name: "Project" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass(
      "aria-invalid:border-destructive-foreground",
      "aria-invalid:focus-visible:ring-destructive-foreground",
    );
    expect(input.parentElement).toHaveAttribute("data-invalid", "true");
  });

  it("renders explicit decorative adornments and reserves input space", () => {
    render(
      <Input
        aria-label="Amount"
        leadingAdornment={<span data-testid="leading-adornment">$</span>}
        trailingAdornment={<span data-testid="trailing-adornment">USD</span>}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Amount" });
    expect(input).toHaveClass("pl-9", "pr-9");
    expect(screen.getByTestId("leading-adornment").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByTestId("trailing-adornment").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("uses focus-visible styles on the native input and forwards its ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Project" />);

    const input = screen.getByRole("textbox", { name: "Project" });
    expect(input).toHaveClass("focus-visible:ring-2", "focus-visible:ring-ring");
    expect(ref.current).toBe(input);
  });
});
