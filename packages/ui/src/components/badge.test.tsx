import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it.each([
    ["info", "bg-info-surface", "text-info-foreground"],
    ["success", "bg-success-surface", "text-success-foreground"],
    ["warning", "bg-warning-surface", "text-warning-foreground"],
    ["destructive", "bg-destructive-surface", "text-destructive-foreground"],
  ] as const)("uses semantic %s tokens", (tone, surfaceClass, foregroundClass) => {
    render(<Badge tone={tone}>Status</Badge>);

    const badge = screen.getByText("Status");
    expect(badge).toHaveClass(surfaceClass, foregroundClass);
    expect(badge).not.toHaveAttribute("tabindex");
  });
});
