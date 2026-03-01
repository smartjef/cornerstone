import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trustees } from "@/lib/content";

export default function AboutPage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">About The Cornerstone Foundation</h1>
        <p className="text-muted-foreground">
          The Cornerstone Foundation is anchored in Christian values of compassion, stewardship, service, and dignity. We exist to strengthen vulnerable communities with practical, accountable interventions.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Vision</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Thriving communities where every person can access health, opportunity, and hope.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Mission</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Deliver trusted, evidence-informed support in healthcare, education, social relief, and water access.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Values</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Faith, integrity, transparency, collaboration, and community dignity.</CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Founder</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">Julius Migos Ogamba</p>
            <p className="mt-2 text-sm text-muted-foreground">Founder and steward of the foundation’s strategic direction and institutional values.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Board of Trustees</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {trustees.map((trustee) => (
                <li key={trustee}>{trustee}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader><CardTitle>Governance & Ethos</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Governance structures prioritize accountability, legal compliance, and responsible program execution. Strategic oversight is provided by trustees, with reporting designed for donor clarity and public trust.
            </p>
            <p>
              Our Christian cornerstone ethos guides how we serve: with humility, honesty, compassion, and practical commitment to those facing the greatest vulnerability.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
