import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, GraduationCap, Droplets, Users, Shield, Award } from "lucide-react";

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

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "Education", desc: "Access to quality education for the most vulnerable." },
              { icon: Users, title: "Humanitarian Support", desc: "Direct support for the destitute, aged, infirm, widows, and orphans." },
              { icon: Droplets, title: "Clean Water", desc: "Access to clean water and sanitation." }
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
              src="/images/foundation_community_impact.png"
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

      {/* Video Section - Impact in Action */}
      <section className="w-full py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Our Impact in Action</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The Cornerstone Aspiration</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">The sowing seed for Impacts.</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 pt-[56.25%]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 3. Latest Updates (Clean Masonry-like presentation) */}
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
                    src={update.image}
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

      {/* Testimonial Section - Voices of Impact */}
      <section className="w-full py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Voices of Impact</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">What Our Beneficiaries Say</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Real stories from the communities we serve across Kenya.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The bursary from Cornerstone Foundation allowed me to finish my high school education when my family had lost all hope. I am now pursuing nursing.",
                author: "Grace Akinyi",
                role: "Scholarship Recipient",
                image: "/images/avatar_grace_1772437833562.png"
              },
              {
                text: "Before the new borehole, we walked miles every day for water that wasn't even safe. Now, our children are healthier and we have more time to farm.",
                author: "Joseph Mathenge",
                role: "Village Elder, Laikipia",
                image: "/images/avatar_joseph_1772438049897.png"
              },
              {
                text: "The free medical camp came right when my son was very ill. The doctors not only treated him but gave us medicine we could never have afforded.",
                author: "Mary Atieno",
                role: "Community Member",
                image: "/images/avatar_mary_1772437851425.png"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 relative">
                <div className="text-emerald-500 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 italic"><q>{testimonial.text}</q></p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                    <Image src={testimonial.image} alt={testimonial.author} width={100} height={100} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{testimonial.author}</h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
