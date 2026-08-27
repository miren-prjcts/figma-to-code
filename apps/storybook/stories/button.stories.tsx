import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline", "ghost", "destructive"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

function PlusIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function ArrowIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor">
      <path d="m6 3 5 5-5 5" />
    </svg>
  );
}

export const Solid: Story = { args: { variant: "solid" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Destructive: Story = { args: { variant: "destructive" } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button leadingIcon={<PlusIcon />}>Create</Button>
      <Button variant="outline" trailingIcon={<ArrowIcon />}>
        Continue
      </Button>
    </div>
  ),
};

const STATES: Array<{ label: string; props: Partial<React.ComponentProps<typeof Button>> }> = [
  { label: "Default", props: {} },
  { label: "Hover", props: {} },
  { label: "Pressed", props: {} },
  { label: "Focus visible", props: {} },
  { label: "Disabled", props: { disabled: true } },
  { label: "Loading", props: { loading: true } },
];
const VARIANTS = ["solid", "outline", "ghost", "destructive"] as const;

function getForcedStateClass(
  state: string,
  variant: (typeof VARIANTS)[number],
): string | undefined {
  if (state === "Hover") {
    if (variant === "solid") return "bg-primary-hover";
    if (variant === "destructive") return "bg-destructive-hover";
    return "bg-muted";
  }
  if (state === "Pressed") {
    if (variant === "solid") return "bg-primary-pressed";
    if (variant === "destructive") return "bg-destructive-pressed";
    return "bg-secondary";
  }
  if (state === "Focus visible") {
    return "ring-2 ring-ring ring-offset-2 ring-offset-background";
  }

  return undefined;
}

const cellLabel: React.CSSProperties = {
  font: "500 12px/16px var(--font-sans, sans-serif)",
  color: "var(--muted-foreground)",
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "72px repeat(6, max-content)",
        gap: 16,
        alignItems: "center",
      }}
    >
      <span />
      {STATES.map((s) => (
        <span key={s.label} style={cellLabel}>
          {s.label}
        </span>
      ))}
      {VARIANTS.flatMap((variant) => [
        <span key={variant} style={cellLabel}>
          {variant}
        </span>,
        ...STATES.map((s) => (
          <Button
            key={`${variant}-${s.label}`}
            variant={variant}
            className={getForcedStateClass(s.label, variant)}
            {...s.props}
          >
            Button
          </Button>
        )),
      ])}
    </div>
  ),
};

/**
 * The loading spinner is `animate-spin motion-reduce:animate-none`, so it only animates
 * when the OS has no reduced-motion preference. Storybook's canvas doesn't expose a
 * `prefers-reduced-motion` toolbar, so the right-hand button simulates the media query by
 * forcing `animation: none` on the same `data-slot="button-spinner"` element the real CSS
 * variant targets — it renders the identical static ring a reduced-motion user sees,
 * without needing the OS setting itself.
 */
export const LoadingMotion: Story = {
  name: "Loading — reduced motion",
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <Button loading>Save changes</Button>
        <span style={cellLabel}>No preference (animated)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <style>{`.motion-reduce-demo [data-slot="button-spinner"] { animation: none; }`}</style>
        <div className="motion-reduce-demo">
          <Button loading>Save changes</Button>
        </div>
        <span style={cellLabel}>prefers-reduced-motion: reduce</span>
      </div>
    </div>
  ),
};
