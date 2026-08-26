import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StatCard } from "./card";

describe("StatCard", () => {
  it("renders a compact metric without an action by default", () => {
    render(<StatCard title="Components" value="12" />);

    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("Components").tagName).toBe("DT");
    expect(screen.getByText("12").tagName).toBe("DD");
  });

  it("renders an explicitly configured action with an accessible name", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <StatCard title="Components" value="12" action={{ label: "View components", onClick }} />,
    );

    await user.click(screen.getByRole("button", { name: "View components" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("gives the overflow action a minimum pointer target sized from the shared token", () => {
    render(
      <StatCard
        title="Components"
        value="12"
        action={{ label: "View components", onClick: vi.fn() }}
      />,
    );

    const action = screen.getByRole("button", { name: "View components" });
    expect(action).toHaveClass("size-[var(--size-target-min)]", "top-1", "right-1");
    expect(action).toHaveClass("flex", "items-center", "justify-center");
  });
});
