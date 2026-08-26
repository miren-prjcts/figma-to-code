import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * Tokens — live documentation for design tokens.
 *
 * Every swatch reads CSS variables directly from @repo/tokens (var(--token)), so:
 *  - switching between light/dark in the toolbar updates the Semantic/Status section;
 *  - Primitives remain constants (they do not depend on the theme);
 *  - changing a value in tokens.css → HMR → updates this page immediately.
 *
 * The Figma source of truth is packages/tokens/src/tokens.css (1:1).
 */

const PRIMITIVES: Array<[string, string]> = [
  ["gray-50", "#fafafa"],
  ["gray-100", "#f5f5f5"],
  ["gray-200", "#e5e5e5"],
  ["gray-300", "#d4d4d4"],
  ["gray-400", "#a3a3a3"],
  ["gray-500", "#737373"],
  ["gray-600", "#525252"],
  ["gray-700", "#404040"],
  ["gray-800", "#262626"],
  ["gray-900", "#171717"],
  ["gray-950", "#0a0a0a"],
];

const SURFACES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "muted",
  "muted-foreground",
  "border",
  "input",
  "ring",
  "primary",
  "primary-foreground",
  "primary-hover",
  "primary-pressed",
  "secondary",
  "secondary-foreground",
  "invalid-border",
  "invalid-ring",
];

const STATUSES = ["success", "warning", "destructive", "info"] as const;

/** Theme-invariant foundation scales — same value in Light and Dark. */
const FOUNDATION_SCALES: Array<[string, string]> = [
  ["--opacity-disabled", "Button/Input disabled state"],
  ["--layer-overlay", "Modal stacking context"],
  ["--size-icon-sm", "Modal close icon, loading spinner"],
  ["--size-icon-md", "StatCard overflow-action icon"],
  ["--size-dialog-sm", "Modal surface max width"],
];
const STATUS_LABEL: Record<(typeof STATUSES)[number], string> = {
  success: "In stock",
  warning: "Low stock",
  destructive: "Out of stock",
  info: "New",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        font: "600 14px/20px var(--font-sans, sans-serif)",
        color: "var(--muted-foreground)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        margin: "0 0 12px",
      }}
    >
      {children}
    </h3>
  );
}

/** Color swatch: the square reads var(--name); the label shows the token name (+ optional hex). */
function Swatch({ name, hex }: { name: string; hex?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 104 }}>
      <div
        style={{
          height: 56,
          borderRadius: 8,
          background: `var(--${name})`,
          border: "1px solid var(--border)",
        }}
      />
      <div
        style={{ font: "500 12px/16px var(--font-sans, sans-serif)", color: "var(--foreground)" }}
      >
        {name}
      </div>
      {hex && (
        <code
          style={{
            font: "400 11px/14px var(--font-mono, monospace)",
            color: "var(--muted-foreground)",
          }}
        >
          {hex}
        </code>
      )}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>{children}</div>;
}

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        padding: 32,
        background: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100vh",
        font: "400 14px/20px var(--font-sans, sans-serif)",
      }}
    >
      <div>
        <h1 style={{ font: "600 24px/32px var(--font-sans, sans-serif)", margin: "0 0 8px" }}>
          Design Tokens
        </h1>
        <p style={{ color: "var(--muted-foreground)", margin: 0, maxWidth: 560 }}>
          Swatches read live CSS variables. Switch between light/dark in the toolbar — Semantic and
          Status update, while Primitives remain constants. Source of truth:{" "}
          <code>@repo/tokens</code>.
        </p>
      </div>

      <section>
        <SectionTitle>Primitives — neutral scale (constants)</SectionTitle>
        <Grid>
          {PRIMITIVES.map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </Grid>
      </section>

      <section>
        <SectionTitle>Semantic — surfaces and actions (light / dark)</SectionTitle>
        <Grid>
          {SURFACES.map((name) => (
            <Swatch key={name} name={name} />
          ))}
        </Grid>
      </section>

      <section>
        <SectionTitle>Status — soft (tinted background + saturated text)</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STATUSES.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 6,
                  padding: "2px 8px",
                  font: "500 12px/16px var(--font-sans, sans-serif)",
                  background: `var(--${s}-surface)`,
                  color: `var(--${s}-foreground)`,
                }}
              >
                {STATUS_LABEL[s]}
              </span>
              <code
                style={{
                  font: "400 12px/16px var(--font-mono, monospace)",
                  color: "var(--muted-foreground)",
                }}
              >
                {s}-surface · {s}-foreground
              </code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Radius</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 96,
              height: 56,
              background: "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          />
          <code
            style={{
              font: "400 12px/16px var(--font-mono, monospace)",
              color: "var(--muted-foreground)",
            }}
          >
            --radius
          </code>
        </div>
      </section>

      <section>
        <SectionTitle>Elevation (light / dark)</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 96,
              height: 56,
              background: "var(--card)",
              borderRadius: "var(--radius-surface)",
              boxShadow: "var(--effect-shadow-soft)",
            }}
          />
          <code
            style={{
              font: "400 12px/16px var(--font-mono, monospace)",
              color: "var(--muted-foreground)",
            }}
          >
            --effect-shadow-soft (Tailwind: shadow-soft)
          </code>
        </div>
      </section>

      <section>
        <SectionTitle>Foundation scales (theme-invariant)</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FOUNDATION_SCALES.map(([name, consumer]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                aria-hidden
                style={{
                  width: `var(${name})`.startsWith("var(--size") ? `var(${name})` : 24,
                  height: `var(${name})`.startsWith("var(--size") ? `var(${name})` : 24,
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  opacity: name === "--opacity-disabled" ? `var(${name})` : undefined,
                  flexShrink: 0,
                }}
              />
              <code
                style={{
                  font: "400 12px/16px var(--font-mono, monospace)",
                  color: "var(--foreground)",
                }}
              >
                {name}
              </code>
              <span
                style={{
                  font: "400 12px/16px var(--font-sans, sans-serif)",
                  color: "var(--muted-foreground)",
                }}
              >
                {consumer}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Typography — Geist</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ font: "600 24px/32px var(--font-sans, sans-serif)" }}>
            Heading — Geist SemiBold 24
          </div>
          <div style={{ font: "400 14px/20px var(--font-sans, sans-serif)" }}>
            Body — Geist Regular 14
          </div>
          <code
            style={{
              font: "400 13px/20px var(--font-mono, monospace)",
              color: "var(--muted-foreground)",
            }}
          >
            Mono — Geist Mono 13
          </code>
        </div>
      </section>
    </div>
  ),
};
