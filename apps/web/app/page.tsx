import { Button } from "@repo/ui";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Design system starter
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Tokens that scale with the interface.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            A working Next.js surface for the same token-driven components documented in Storybook.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button>Explore components</Button>
          <Button variant="ghost">Read the docs</Button>
        </div>
      </div>
    </main>
  );
}
