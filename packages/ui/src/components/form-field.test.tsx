import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./form-field";
import { Input } from "./input";
import { Checkbox } from "./checkbox";

describe("FormField", () => {
  it("wires a generated id and label association to the control", () => {
    render(
      <FormField label="Project name">
        <Input placeholder="Acme Inc." />
      </FormField>,
    );

    const input = screen.getByRole("textbox", { name: "Project name" });
    expect(input).toHaveAttribute("id");
  });

  it("preserves the child's own explicit id", () => {
    render(
      <FormField label="Project name">
        <Input id="project-name" placeholder="Acme Inc." />
      </FormField>,
    );

    expect(screen.getByRole("textbox", { name: "Project name" })).toHaveAttribute(
      "id",
      "project-name",
    );
  });

  it("wires description and error into aria-describedby, and sets aria-invalid when error is present", () => {
    render(
      <FormField label="Project name" description="Shown to your team" error="Name is required">
        <Input />
      </FormField>,
    );

    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    const ids = describedBy.split(" ");

    expect(screen.getByText("Shown to your team")).toHaveAttribute("id", ids[0]);
    expect(screen.getByText("Name is required")).toHaveAttribute("id", ids[1]);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders a required indicator when required is set", () => {
    render(
      <FormField label="Project name" required>
        <Input />
      </FormField>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("supports horizontal orientation for label-wraps-control fields like Checkbox", () => {
    render(
      <FormField label="Accept terms" orientation="horizontal">
        <Checkbox />
      </FormField>,
    );

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });
});
