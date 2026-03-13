import { ShieldCheck, Heart, Compass, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { missionPillars } from "@/lib/content";
import { HomeImageSlider } from "@/components/home-image-slider";
import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  const teamMembers = await prisma.user.findMany({
    where: { isPublic: true, NOT: { teamType: null } },
    orderBy: { order: 'asc' }
  });

  const boardOfTrustees = teamMembers.filter(m => m.teamType === 'BOARD');
  const managementTeam = teamMembers.filter(m => m.teamType === 'MANAGEMENT');

  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* 1. Page Header (Starbase style: Dark image background with breadcrumbs) */}
      <section className="relative w-full pt-32 pb-20 bg-slate-900 border-b border-white/10" style={{
        backgroundImage: 'url("/images/hero_scholarship_main.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-primary transition-colors uppercase tracking-widest font-bold">Home</Link>
            <span>/</span>
            <span className="uppercase tracking-widest font-bold text-white">About Us</span>
          </nav>
        </div>
      </section>

      {/* 2. About Our Foundation (2-columns: Original Content and Slider) */}
      <section className="w-full py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left (Restored Original Wording) */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase">About Our Foundation</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                Anchored in Christian values of compassion, stewardship, service, and dignity.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                We exist to strengthen vulnerable communities with practical, accountable interventions.
              </p>
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Governance structures prioritize accountability, legal compliance, and responsible program execution. Strategic oversight is provided by trustees, with reporting designed for donor clarity and public trust.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Our Christian cornerstone ethos guides how we serve: with humility, honesty, compassion, and practical commitment to those facing the greatest vulnerability.
                </p>
              </div>
            </div>

            {/* Slider Right */}
            <div className="relative">
              <HomeImageSlider />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, and Core Values (Section with background image) */}
      <section className="w-full py-20 relative bg-slate-900 border-y border-white/10" style={{
        backgroundImage: 'url("/images/modern-school-exterior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-400 uppercase tracking-widest flex items-center gap-3">
                  <Heart className="w-6 h-6" /> Our Mission
                </h3>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Deliver fit for the future education, water & humanitarian solutions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-400 uppercase tracking-widest flex items-center gap-3">
                  <Compass className="w-6 h-6" /> Our Vision
                </h3>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Thriving communities where the most vulnerable can access quality education, clean water & sanitation, and dignified humanitarian support.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6" /> Our Values
              </h3>
              <p className="text-xl text-white font-medium mb-6">Compassion, stewardship, service and dignity.</p>
              <ul className="space-y-4 text-white text-lg font-medium">
                {["Compassion", "Stewardship", "Service", "Dignity"].map((val, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Programs (Restored content from missionPillars) */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Core Initiatives</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Our Strategic Programs</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Practical, accountable interventions designed to strengthen vulnerable communities across Kenya.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionPillars.map((pillar, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-950 p-8 border border-slate-200 dark:border-slate-800 flex items-start gap-6 group">
                <div className="font-bold text-4xl text-primary/10 dark:text-primary/20 group-hover:text-primary transition-colors">0{idx + 1}</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 hover:text-primary transition-colors">{pillar.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Leadership - Board of Trustees */}
      <section className="w-full py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 uppercase border-b-2 border-primary pb-4 inline-block tracking-widest">
            Our Board of Trustees
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {boardOfTrustees.length > 0 ? (
              boardOfTrustees.map((member) => (
                <Link key={member.slug} href={`/team/${member.slug}`} className="group flex flex-col items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-slate-200 dark:bg-slate-800">
                    {member.avatar ? (
                      <Image 
                        src={member.avatar} 
                        alt={member.name || ''} 
                        fill 
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                        unoptimized={member.avatar.startsWith('http') || member.avatar.includes('mauzoplus.app')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <span className="text-4xl font-bold text-slate-300">{(member.name || 'U')[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h4>
                    <p className="text-primary font-bold uppercase tracking-wider">{member.position}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 px-6">
                <p className="text-slate-500 font-medium italic">Our board members will be listed here soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Operations - Management Team */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 uppercase border-b-2 border-primary pb-4 inline-block tracking-widest">
            Our Management Team
          </h2>
          <p className="mb-12 text-slate-600 dark:text-slate-400 max-w-3xl">Our management team consists of dedicated individuals, highly qualified in their profession and passionate for the objectives of the Cornerstone Foundation.</p>
          <div className="grid md:grid-cols-4 gap-8">
            {managementTeam.length > 0 ? (
              managementTeam.map((member) => (
                <Link key={member.slug} href={`/team/${member.slug}`} className="group flex flex-col items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-slate-200 dark:bg-slate-800">
                    {member.avatar ? (
                      <Image 
                        src={member.avatar} 
                        alt={member.name || ''} 
                        fill 
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                        unoptimized={member.avatar.startsWith('http') || member.avatar.includes('mauzoplus.app')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <span className="text-4xl font-bold text-slate-300">{(member.name || 'U')[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h4>
                    <p className="text-primary font-bold uppercase tracking-wider">{member.position}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 px-6">
                <p className="text-slate-500 font-medium italic">Our management team will be announced shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Governance - Original Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest leading-tight">Ethos & Accountability</h2>
          <div className="space-y-6 text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            <p>
              Governance structures prioritize accountability, legal compliance, and responsible program execution. Strategic oversight is provided by trustees, with reporting designed for donor clarity and public trust.
            </p>
            <p className="font-bold text-blue-400">
              Our Christian cornerstone ethos guides how we serve: with humility, honesty, compassion, and practical commitment to those facing the greatest vulnerability.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
