import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./card";

describe("StatCard", () => {
  it("renders its content and accessible options action", () => {
    render(<StatCard title="Components" value="12" />);

    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More options" })).toBeInTheDocument();
  });
});
