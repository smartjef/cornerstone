"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Search, Filter, MessageCircle, Eye, Tag } from "lucide-react";
import { updates, categories, allTags } from "@/lib/content";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 3;

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

  // Top 5 Activities (based on views)
  const topActivities = [...updates].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%23002365' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 w-full flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-slate-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-2">
            <BookOpen className="w-6 h-6 text-blue-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Our <span className="text-blue-400">Activities</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light max-w-2xl mx-auto">
            Explore detailed reports, field updates, and measurable outcomes. Filter by category or search to read specific community impact stories.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Feed */}
          <div className="flex-1 space-y-8">
            {paginatedUpdates.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 ">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No activities found</h3>
                <p className="text-slate-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTag(null); }} className="mt-6 text-primary font-bold hover:underline">Clear all filters</button>
              </div>
            ) : (
              paginatedUpdates.map((update, idx) => (
                <Link href={`/blog/${update.slug}`} key={update.slug} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 dark:hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row">
                  <div className="relative md:w-2/5 h-[240px] sm:h-[300px] md:h-auto overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                    <Image
                      src={update.image || `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop&sig=${idx}`}
                      alt={update.title}
                      width={800} height={600}
                      className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20 dark:border-primary/30">
                      {update.category}
                    </div>
                  </div>
                  <div className="p-8 md:w-3/5 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                      <span>{update.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-1"></span>
                      <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {update.views || 0}</span>
                      <span className="flex items-center"><MessageCircle className="w-3.5 h-3.5 mr-1" /> {update.comments || 0}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors mb-4 text-slate-900 dark:text-white">{update.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">{update.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {update.tags?.map(tag => (
                        <span key={tag} className="text-[11px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center">
                          <Tag className="w-3 h-3 mr-1" />{tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm font-bold text-primary flex items-center w-fit group-hover:translate-x-1 transition-transform mt-auto">
                      Read Full Report <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))
            )}

            {/* Pagination block */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors ${currentPage === i + 1 ? 'bg-primary text-white border-primary ' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-8 flex-shrink-0">
            {/* Search */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 ">
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center"><Search className="w-4 h-4 mr-2 text-primary" /> Search</h4>
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-xl h-11"
              />
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 ">
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center"><Filter className="w-4 h-4 mr-2 text-primary" /> Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-primary/10 dark:bg-primary/20 text-primary/80 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    {cat}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-primary/20 dark:bg-primary/30 text-primary/80 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {cat === "All" ? updates.length : updates.filter(u => u.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top 5 Activities */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 ">
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center"><Eye className="w-4 h-4 mr-2 text-primary" /> Popular Posts</h4>
              <div className="space-y-4">
                {topActivities.map((post, idx) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex gap-4 items-center">
                    <span className="text-3xl font-bold text-slate-200 dark:text-slate-800 group-hover:text-blue-200/50 dark:group-hover:text-primary/20 leading-none">0{idx + 1}</span>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">{post.title}</h5>
                      <span className="text-xs text-slate-500 font-medium flex items-center mt-1"><Eye className="w-3 h-3 mr-1" /> {post.views} views</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 ">
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center"><Tag className="w-4 h-4 mr-2 text-primary" /> Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-colors ${selectedTag === tag ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTag && (
                <button onClick={() => setSelectedTag(null)} className="text-xs font-bold text-red-500 mt-4 hover:underline block w-full text-center">
                  Clear Tag Filter
                </button>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
