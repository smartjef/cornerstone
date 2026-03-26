import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MessageCircle, Tag, Calendar, User, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug, status: 'PUBLISHED' },
    include: {
      author: true,
      category: true,
      tags: true
    }
  });

  if (!post) {
    notFound();
  }

  // Find related posts (same category, exclude current)
  const relatedPosts = post.categoryId ? await prisma.blog.findMany({
    where: {
      categoryId: post.categoryId,
      slug: { not: post.slug },
      status: 'PUBLISHED'
    },
    take: 2,
    orderBy: { publishedAt: 'desc' }
  }) : [];

  return (
    <article className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%23002365' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      {/* Hero Image Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 w-full flex items-center justify-center overflow-hidden min-h-[500px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.featuredImage || "https://s3.mauzoplus.app/public/1773424446276-modern-school-exterior.jpg"}
            alt={post.title}
            fill
            className="w-full h-full object-cover"
            unoptimized={post.featuredImage?.includes('mauzoplus.app') || post.featuredImage?.startsWith('http')}
          />

          <div className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-bold text-sm uppercase tracking-wider mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Activities
          </Link>

          <div className="flex justify-center gap-2 mb-4">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-slate-300 font-medium">
            <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author?.name || 'Admin'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.publishedAt?.toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-10 md:-mt-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 dark:border-slate-800">

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map(tag => (
                <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                  <span className="text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center cursor-pointer">
                    <Tag className="w-3 h-3 mr-1" />{tag.name}
                  </span>
                </Link>
              ))}
            </div>
            <Button variant="outline" size="sm" className="rounded-full w-full sm:w-auto font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>

          {/* Article Body */}
          <div className="prose prose-base sm:prose-lg dark:prose-invert prose-slate max-w-none mb-12">
            <p className="text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-light mb-8">
              {post.excerpt}
            </p>
            <div className="text-slate-800 dark:text-slate-200 leading-relaxed text-base sm:text-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Comments Section */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-10 mt-10">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center mb-6 sm:mb-8 text-slate-900 dark:text-white">
              <MessageCircle className="w-6 h-6 mr-3 text-primary" />
              Comments ({post.comments || 0})
            </h3>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mb-8">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Leave a Reply</h4>
              <textarea
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary focus:outline-none resize-none mb-4 text-sm sm:text-base"
                placeholder="Share your thoughts about this impact report..."
              ></textarea>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-xl">
                Post Comment
              </Button>
            </div>

            {/* Mock Comment */}
            <div className="flex gap-3 sm:gap-4 p-2 sm:p-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-1 sm:mb-2">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Jane Doe</h5>
                  <span className="text-xs text-slate-500 font-medium">2 days ago</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">This is incredible work! The impact you are making in these rural communities is truly inspiring. Keep it up.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">Related Activities in <span className="text-primary">{post.category}</span></h3>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {relatedPosts.map((related) => (
              <Link href={`/blog/${related.slug}`} key={related.slug} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 dark:hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 relative">
                  <Image
                    src={related.featuredImage || "https://s3.mauzoplus.app/public/1773424441046-modern-school-exterior-1.jpg"}
                    alt={related.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    unoptimized={related.featuredImage?.includes('mauzoplus.app') || related.featuredImage?.startsWith('http')}
                  />

                </div>
                <div className="w-full sm:w-2/3 p-5 sm:p-6 flex flex-col justify-center">
                  <span className="text-xs font-bold text-primary mb-2 block">{related.date}</span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">{related.title}</h4>
                  <span className="text-sm font-bold text-slate-500 group-hover:text-primary flex items-center mt-auto">Read <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}

