import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, GraduationCap, HeartPulse, Droplets, Users, Shield, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updates } from "@/lib/content";
import { HeroCarousel } from "@/components/hero-carousel";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-950 relative">
      {/* Background Brick Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%2310b981' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      <HeroCarousel />

      {/* 2. Interactive Core Pillars (Clean Vector Approach) */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-16">

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Core Strategic Areas</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Pillars of Intervention</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Delivering sustainable, accountable impact through focused programs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Education", desc: "Scholarships and bursaries ensuring access for the most vulnerable." },
              { icon: HeartPulse, title: "Healthcare", desc: "Construction and maintenance of critical medical clinics." },
              { icon: Users, title: "Relief", desc: "Direct support for the destitute, aged, infirm, widows, and orphans." },
              { icon: Droplets, title: "Clean Water", desc: "Developing reliable sanitation and water infrastructure." }
            ].map((pillar, i) => (
              <div key={i} className="group relative bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:hover:-translate-y-2 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10">
                  <pillar.icon className="w-24 h-24 text-emerald-600" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 ">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{pillar.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trust & Impact Sneak Peek */}
      <section className="w-full py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Visual Side */}
          <div className="relative">
            {/* Soft decorative background shape */}
            <div className="absolute -inset-4 bg-emerald-100 dark:bg-emerald-900/20 rounded-[3rem] transform -rotate-3 transition-transform hover:rotate-0 duration-500" />
            <Image
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop"
              alt="Impact Foundation"
              width={2670} height={1500}
              className="relative rounded-3xl object-cover h-[500px] w-full"
            />

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom flex-row">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full text-emerald-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Accountability</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">100% Transparent</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase flex items-center gap-2">
                <Award className="w-4 h-4" /> The Foundation
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.15]">
                Guided by <span className="text-emerald-500">Integrity</span> and Compassion.
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                Established to serve the most vulnerable, The Cornerstone Foundation operates under a strict Declaration of Trust. We believe in evidence-driven programs implemented with trusted local partners.
              </p>
            </div>

            <ul className="space-y-4">
              {["Clear governance and responsible stewardship of all donor resources.", "Long-term outcomes designed strictly around community priorities.", "Faith-driven ethos ensuring care for the marginalized."].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-emerald-500/10 p-1 rounded-full mt-1">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-500 transition-colors group">
                Meet the Trustees <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Latest Updates (Clean Masonry-like presentation) */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Field Reports</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Recent Activities</h3>
            </div>
            <Link href="/blog" className="inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all group ">
              View All Reports <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3 z-10 relative">
            {updates.map((update) => (
              <Link href={`/blog/${update.slug}`} key={update.slug} className="group bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:transition-all duration-300 flex flex-col h-full">
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={`https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop&sig=${update.slug}`}
                    alt={update.title}
                    width={800} height={600}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-600 ">
                    {update.date}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors mb-3 text-slate-900 dark:text-white line-clamp-2">{update.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{update.excerpt}</p>
                  <div className="text-sm font-bold text-emerald-600 flex items-center">
                    Read Report <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimalist CTA */}
      <section className="w-full relative py-0">
        <div className="relative max-w-7xl mx-auto px-6 -mb-24 z-20">
          <div className="bg-emerald-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to make an impact?</h2>
              <p className="text-emerald-50 text-lg md:text-xl font-light">
                Join us in providing education, healthcare, and vital resources to those who need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/donate">
                  <Button size="lg" className="rounded-full bg-white text-emerald-900 hover:bg-slate-100 h-14 px-10 font-bold ">
                    Donate Today
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full bg-emerald-700/50 border-emerald-500 hover:bg-emerald-700 hover:border-emerald-400 text-white h-14 px-10 font-semibold backdrop-blur-sm">
                    Contact Foundation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Spacer to visually hold the overlapping CTA above the footer */}
        <div className="h-48 bg-white dark:bg-slate-950 w-full" />
      </section>

    </div>
  );
}
