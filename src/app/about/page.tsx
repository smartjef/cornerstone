import { ShieldCheck, Heart, Compass, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { missionPillars, boardOfTrustees, managementTeam } from "@/lib/content";

export default function AboutPage() {
  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Background Brick Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%23002365' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 w-full flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-slate-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            About Our <span className="text-blue-400">Foundation</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light">
            Anchored in Christian values of compassion, stewardship, service, and dignity. We exist to strengthen vulnerable communities with practical, accountable interventions.
          </p>
        </div>
      </section>

      {/* Core Mission/Vision Blocks */}
      <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Vision", icon: Compass, desc: "Thriving communities where the most vulnerable can access quality education, clean water & sanitation, and dignified humanitarian support." },
            { title: "Mission", icon: Heart, desc: "Deliver fit for the future education, water & humanitarian solutions." },
            { title: "Values", icon: ShieldCheck, desc: "Compassion, stewardship, service and dignity." }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-8 dark:border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Programs / Strategic Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Core Initiatives</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Strategic Programs</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Practical, accountable interventions designed to strengthen vulnerable communities across Kenya.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {missionPillars.map((pillar, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex items-start gap-6 group hover:transition-shadow">
              <div className="font-bold text-3xl text-blue-200 dark:text-blue-900/50 group-hover:text-primary transition-colors">0{idx + 1}</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{pillar.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-slate-800 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Leadership</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Board of Trustees</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Guided by experience and a strict commitment to the foundation&apos;s ethos.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {boardOfTrustees.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-64 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={800} height={800}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                  {member.position}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{member.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Management Team */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-slate-800 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Operations</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Management Team</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Our management team consists of dedicated volunteers, highly qualified in their profession and passionate for the objectives of the Cornerstone Foundation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {managementTeam.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-64 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={800} height={800}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  {member.position}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{member.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Governance & Ethos */}
      <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
        <Shield className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest leading-tight">Ethos & Accountability</h2>
      <div className="space-y-6 text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed">
        <p>
          Governance structures prioritize accountability, legal compliance, and responsible program execution. Strategic oversight is provided by trustees, with reporting designed for donor clarity and public trust.
        </p>
        <p className="font-bold text-blue-400">
          Our Christian cornerstone ethos guides how we serve: with humility, honesty, compassion, and practical commitment to those facing the greatest vulnerability.
        </p>
      </div>

    </div>
  );
}
