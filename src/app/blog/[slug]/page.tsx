import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updates } from "@/lib/content";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = updates.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-16">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <p className="text-sm text-muted-foreground">{post.date}</p>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            This is a presentation-ready article layout intended for future dynamic content. Body text, cover images, author details, and rich content blocks will be populated from Payload CMS.
          </p>
          <p>
            Include space for metadata, categories, social sharing, and related articles to support long-term content growth while keeping a clean, professional reading experience.
          </p>
        </CardContent>
      </Card>
    </article>
  );
}
