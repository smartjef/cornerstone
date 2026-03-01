import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updates, missionPillars } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="space-y-20 py-12 md:py-20">
      <section className="container space-y-8">
        <Badge variant="outline">Public Benefit Organization</Badge>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Building healthier, dignified, and resilient communities.</h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            The Cornerstone Foundation mobilizes practical support for healthcare, vulnerable groups, education, and clean water through transparent, accountable stewardship.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/donate"><Button size="lg">Donate</Button></Link>
            <Link href="/about"><Button size="lg" variant="outline">Learn More</Button></Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6">
        <h2 className="text-2xl font-semibold md:text-3xl">Mission Pillars</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {missionPillars.map((pillar) => (
            <Card key={pillar.title}>
              <CardHeader>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{pillar.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container grid gap-5 md:grid-cols-3">
        {[
          { icon: HeartHandshake, title: "Credibility", text: "Evidence-driven programs implemented with trusted local partners." },
          { icon: ShieldCheck, title: "Transparency", text: "Clear governance and responsible stewardship of donor resources." },
          { icon: TrendingUp, title: "Sustainable Impact", text: "Long-term outcomes designed around community priorities." },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <item.icon className="h-6 w-6 text-primary" />
              <CardTitle className="pt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl">Latest Updates</h2>
          <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {updates.map((update) => (
            <Card key={update.slug}>
              <CardHeader>
                <CardDescription>{update.date}</CardDescription>
                <CardTitle className="text-lg">{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{update.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Partner with us to scale life-changing programs.</CardTitle>
            <CardDescription className="text-base">Every contribution supports measurable community outcomes and accountable impact reporting.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/donate"><Button size="lg">Donate Now</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline">Become a Partner</Button></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
