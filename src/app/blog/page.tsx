import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updates } from "@/lib/content";

export default function BlogPage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">Blog & Activities</h1>
        <p className="text-muted-foreground">Field updates, stories, and measurable outcomes. This section is intentionally structured for future Payload CMS integration.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {updates.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardHeader>
                <CardDescription>{post.date}</CardDescription>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{post.excerpt}</CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
