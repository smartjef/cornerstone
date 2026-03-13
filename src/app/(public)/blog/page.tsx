import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Search, Filter, Tag, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 6;

interface Props {
  searchParams: Promise<{
    query?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.query || "";
  const selectedCategory = params.category || "All";
  const selectedTag = params.tag || null;
  const currentPage = parseInt(params.page || "1");

  // Fetch data
  const [blogs, categories, allTags] = await Promise.all([
    prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        AND: [
          searchQuery ? {
            OR: [
              { title: { contains: searchQuery, mode: 'insensitive' } },
              { excerpt: { contains: searchQuery, mode: 'insensitive' } }
            ]
          } : {},
          selectedCategory !== "All" ? { category: { slug: selectedCategory } } : {},
          selectedTag ? { tags: { some: { slug: selectedTag } } } : {}
        ]
      },
      include: {
        category: true,
        author: true,
        tags: true
      },
      orderBy: { publishedAt: 'desc' },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE
    }),
    prisma.category.findMany({
      where: { blogs: { some: { status: 'PUBLISHED' } } },
      include: { _count: { select: { blogs: { where: { status: 'PUBLISHED' } } } } }
    }),
    prisma.tag.findMany({
      where: { blogs: { some: { status: 'PUBLISHED' } } }
    })
  ]);

  const totalCount = await prisma.blog.count({
    where: {
      status: 'PUBLISHED',
      AND: [
        searchQuery ? {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { excerpt: { contains: searchQuery, mode: 'insensitive' } }
          ]
        } : {},
        selectedCategory !== "All" ? { category: { slug: selectedCategory } } : {},
        selectedTag ? { tags: { some: { slug: selectedTag } } } : {}
      ]
    }
  });

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Page Header */}
      <section className="relative w-full pt-32 pb-20 bg-slate-900 border-b border-white/10" style={{
        backgroundImage: 'url("https://s3.mauzoplus.app/public/1773424446276-modern-school-exterior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-6 backdrop-blur-md border border-primary/20">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-widest">Our Activities</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-primary transition-colors uppercase tracking-widest font-bold">Home</Link>
            <span>/</span>
            <span className="uppercase tracking-widest font-bold text-white">Activities</span>
          </nav>
        </div>
      </section>

      {/* 2. Content & Sidebar Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-8 flex-shrink-0 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Search className="w-4 h-4 mr-3 text-primary" /> Search
              </h4>
              <form action="/blog" className="relative">
                <Input
                  name="query"
                  defaultValue={searchQuery}
                  placeholder="Keywords..."
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-none h-12 pr-10"
                />
                <button type="submit" className="absolute right-3 top-3">
                  <Search className="w-4 h-4 text-slate-400" />
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Filter className="w-4 h-4 mr-3 text-primary" /> Categories
              </h4>
              <div className="flex flex-col gap-1">
                <Link
                  href="/blog"
                  className={`flex items-center justify-between py-2 text-sm font-bold transition-colors ${selectedCategory === "All" ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  <span>All Categories</span>
                </Link>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.slug}`}
                    className={`flex items-center justify-between py-2 text-sm font-bold transition-colors ${selectedCategory === cat.slug ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {cat._count.blogs}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Tag className="w-4 h-4 mr-3 text-primary" /> Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 transition-colors border ${selectedTag === tag.slug ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary'}`}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">
            {blogs.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-12 text-center border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">No activities found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
                <Link href="/blog" className="mt-6 inline-block text-primary font-bold uppercase text-xs tracking-widest hover:underline">Clear all filters</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                  <Link href={`/blog/${blog.slug}`} key={blog.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-64 w-full overflow-hidden">
                      {blog.featuredImage ? (
                        <Image 
                          src={blog.featuredImage} 
                          alt={blog.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          unoptimized={blog.featuredImage.includes('mauzoplus.app') || blog.featuredImage.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                      {blog.category && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                          {blog.category.name}
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {blog.publishedAt?.toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-4 line-clamp-2 uppercase tracking-wide leading-tight">
                        {blog.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                          Read Full Report <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
                <Link
                  href={`/blog?page=${Math.max(1, currentPage - 1)}${searchQuery ? `&query=${searchQuery}` : ''}${selectedCategory !== "All" ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                  className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 transition-colors hover:border-primary ${currentPage === 1 ? 'pointer-events-none opacity-30' : ''}`}
                >
                  Prev
                </Link>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Link
                      key={i}
                      href={`/blog?page=${i + 1}${searchQuery ? `&query=${searchQuery}` : ''}${selectedCategory !== "All" ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                      className={`w-10 h-10 flex items-center justify-center text-xs font-bold border transition-all ${currentPage === i + 1 ? 'bg-primary border-primary text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary'}`}
                    >
                      {i + 1}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/blog?page=${Math.min(totalPages, currentPage + 1)}${searchQuery ? `&query=${searchQuery}` : ''}${selectedCategory !== "All" ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                  className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 transition-colors hover:border-primary ${currentPage === totalPages ? 'pointer-events-none opacity-30' : ''}`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

