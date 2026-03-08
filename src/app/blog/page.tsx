"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Search, Filter, Tag, Calendar } from "lucide-react";
import { updates, categories, allTags } from "@/lib/content";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredUpdates = useMemo(() => {
    let result = updates;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(post => post.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter(post => post.tags.includes(selectedTag));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTag]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUpdates.length / POSTS_PER_PAGE);
  const paginatedUpdates = filteredUpdates.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset pagination when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* 1. Page Header (Starbase style: Dark image background with breadcrumbs) */}
      <section className="relative w-full pt-32 pb-20 bg-slate-900 border-b border-white/10" style={{
        backgroundImage: 'url("/images/school_building_premium.png")',
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

          {/* Sidebar (Left on Desktop) */}
          <aside className="lg:w-80 space-y-8 flex-shrink-0 order-2 lg:order-1">
            {/* Search */}
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Search className="w-4 h-4 mr-3 text-primary" /> Search
              </h4>
              <Input
                placeholder="Keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-none h-12"
              />
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Filter className="w-4 h-4 mr-3 text-primary" /> Categories
              </h4>
              <div className="flex flex-col gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between py-2 text-sm font-bold transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {cat === "All" ? updates.length : updates.filter(u => u.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-slate-900 dark:text-white flex items-center">
                <Tag className="w-4 h-4 mr-3 text-primary" /> Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 transition-colors border ${selectedTag === tag ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content (Right on Desktop) */}
          <div className="flex-1 order-1 lg:order-2">
            {paginatedUpdates.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-12 text-center border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">No activities found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTag(null); }} className="mt-6 text-primary font-bold uppercase text-xs tracking-widest hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {paginatedUpdates.map((update) => (
                  <Link href={`/blog/${update.slug}`} key={update.slug} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image src={update.image} alt={update.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        {update.category}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {update.date}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-4 line-clamp-2 uppercase tracking-wide leading-tight">
                        {update.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {update.excerpt}
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

            {/* Pagination block */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
                >
                  Prev
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center text-xs font-bold border transition-all ${currentPage === i + 1 ? 'bg-primary border-primary text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
