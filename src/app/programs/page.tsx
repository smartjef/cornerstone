import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { missionPillars } from "@/lib/content";

export default function ProgramsPage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">Programs</h1>
        <p className="text-muted-foreground">Structured initiatives designed around urgent needs and long-term community resilience.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {missionPillars.map((pillar) => (
          <Card key={pillar.title}>
            <CardHeader>
              <CardTitle>{pillar.title}</CardTitle>
              <CardDescription>Program area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{pillar.description}</p>
              <p>
                Placeholder for future CMS-managed fields: objectives, geographies served, annual targets, and downloadable impact reports.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
