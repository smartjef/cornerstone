import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { donationTiers } from "@/lib/content";

export default function DonatePage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">Donate</h1>
        <p className="text-muted-foreground">Support mission-critical programs through secure, transparent giving channels.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {donationTiers.map((tier) => (
          <Card key={tier.tier}>
            <CardHeader>
              <CardTitle>{tier.tier}</CardTitle>
              <CardDescription>Suggested giving tier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{tier.impact}</p>
              <Button className="w-full">Select Tier</Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trust Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Governance-led fund oversight</p>
            <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Program-level impact reporting</p>
            <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Ethical disbursement and beneficiary protection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How Funds Are Used</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Donations are allocated to healthcare outreach, social relief, education support, and clean water initiatives based on need assessments and approved implementation plans.
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Payment Integration Placeholder</CardTitle>
            <CardDescription>Future support for M-Pesa STK push, card payments, and recurring giving workflows.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
