import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle, MapPin, ArrowRight, GraduationCap, Droplets, Users, Award, Sparkles, Play } from "lucide-react";
import { updates, gallery } from "@/lib/content";
import { HeroCarousel } from "@/components/hero-carousel";
import { HomeImageSlider } from "@/components/home-image-slider";

/* ─── Scrolling logo strip images (gallery images as stand-ins) ─── */
const STRIP_IMAGES = gallery.map(item => item.src);

const PILLARS = [
  { icon: GraduationCap, title: "Education", desc: "Access to quality education for the most vulnerable." },
  { icon: Users, title: "Humanitarian Support", desc: "Direct support for the destitute, aged, infirm, widows, and orphans." },
  { icon: Droplets, title: "Clean Water", desc: "Access to clean water and sanitation." }
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: "The bursary from Cornerstone Foundation allowed me to finish my high school education when my family had lost all hope. I am now pursuing nursing.",
    name: "Grace Akinyi",
    role: "Scholarship Recipient",
  },
  {
    stars: 5,
    text: "Before the new borehole, we walked miles every day for water that wasn't even safe. Now, our children are healthier and we have more time to farm.",
    name: "Joseph Mathenge",
    role: "Village Elder, Laikipia",
  },
  {
    stars: 5,
    text: "The foundation came right when we needed them most. Their support was dignified, practical, and given with genuine compassion.",
    name: "Mary Atieno",
    role: "Community Member",
  },
];

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-950">

      {/* 1. Full-width Hero Carousel */}
      <div className="pt-20">
        <HeroCarousel />
      </div>

      {/* 2. Dark Quick-Info Bar (Visible on all screens) */}
      <section className="w-full bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {[
              { icon: Mail, label: "Email Us", value: "info@cornerstone.or.ke", href: "mailto:info@cornerstone.or.ke" },
              { icon: Phone, label: "Call Us", value: "+254 700 000 000", href: "tel:+254700000000" },
              { icon: MessageCircle, label: "WhatsApp", value: "+254 700 000 000", href: "https://wa.me/254700000000" },
              { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: "/contact" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="flex flex-col items-center gap-1 py-6 text-center group hover:bg-primary/10 transition-colors border-white/10">
                <item.icon className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{item.label}</span>
                <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors px-2 break-all">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Impact & Trust (Starbase layout with original wording) */}
      <section className="w-full py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase flex items-center gap-2">
                  <Award className="w-4 h-4" /> The Foundation
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  Guided by <span className="text-primary">Integrity</span> and Compassion.
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                  Established to serve the most vulnerable, The Cornerstone Foundation operates under a strict Declaration of Trust. We believe in evidence-driven programs implemented with trusted local partners.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "Clear governance and responsible stewardship of all donor resources.",
                  "Long-term outcomes designed strictly around community priorities.",
                  "Faith-driven ethos ensuring care for the marginalized."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1 rounded-full mt-1">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-primary/80 transition-colors group uppercase text-sm tracking-widest">
                  Discover Our Mission <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Slider Side */}
            <div className="order-1 lg:order-2">
              <HomeImageSlider />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Pillars of Intervention */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Core Strategic Areas</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-widest leading-tight">Our Pillars of Intervention</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Delivering sustainable, accountable impact through focused programs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <div key={i} className="group relative bg-white dark:bg-slate-950 p-10 border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">{pillar.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact in Action - Image Placeholder with Play Icon */}
      <section className="w-full h-[60vh] min-h-[400px] relative overflow-hidden bg-slate-900 group cursor-pointer">
        <Image
          src="/images/president-ruto-founder-migosi-graduation.jpeg"
          alt="The Cornerstone Aspiration"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
            <Play className="w-8 h-8 md:w-12 md:h-12 fill-current ml-2" />
          </div>
        </div>
        <div className="absolute bottom-12 left-0 w-full text-center z-10">
          <p className="text-white text-xl md:text-2xl font-bold uppercase tracking-[0.2em] drop-shadow-lg">Impact in Action</p>
        </div>
      </section>

      {/* 5. Scrolling Image Strip */}
      <section className="w-full bg-white dark:bg-slate-950 py-12 overflow-hidden border-b border-slate-100 dark:border-slate-900">
        <style>{`
          @keyframes scroll-strip {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .strip-track {
            display: flex;
            width: max-content;
            animation: scroll-strip 40s linear infinite;
          }
          .strip-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="strip-track">
            {[...STRIP_IMAGES, ...STRIP_IMAGES].map((src, i) => (
              <div key={i} className="shrink-0 w-56 h-36 relative mx-2 overflow-hidden border border-slate-100 dark:border-slate-800">
                <Image src={src} alt="Cornerstone Foundation Mission" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Recent Activities */}
      <section className="w-full py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-14">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-1">Field Reports</h2>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Recent Activities</h3>
            </div>
            <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary/80 uppercase tracking-widest inline-flex items-center gap-2 group">
              View All Activities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {updates.map((update) => (
              <Link href={`/blog/${update.slug}`} key={update.slug} className="group bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col hover:border-primary transition-colors">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={update.image} alt={update.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">{update.date}</span>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-4 line-clamp-2 uppercase tracking-wide">{update.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">{update.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      < section className="w-full py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase text-center mb-2">Voices of Impact</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-16 uppercase tracking-widest">What Our Beneficiaries Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 p-10 border border-slate-100 dark:border-slate-800 flex flex-col relative">
                <div className="absolute -top-4 left-10 w-8 h-8 bg-primary text-white flex items-center justify-center font-serif text-3xl italic pt-2">
                  &ldquo;
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed italic flex-1 mb-8">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">{t.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

    </div >
  );
}
