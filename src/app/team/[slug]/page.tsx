import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { boardOfTrustees, managementTeam } from "@/lib/content";

export async function generateStaticParams() {
    const all = [...boardOfTrustees, ...managementTeam];
    return all.map((member) => ({ slug: member.slug }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const all = [...boardOfTrustees, ...managementTeam];
    const member = all.find((m) => m.slug === slug);

    if (!member) return notFound();

    const isTrustee = boardOfTrustees.some((m) => m.slug === slug);

    return (
        <div className="w-full bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                {/* Back link */}
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-10 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to About
                </Link>

                <div className="flex flex-col sm:flex-row gap-10 items-start">
                    {/* Photo */}
                    <div className="w-48 h-48 rounded-3xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-lg">
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 dark:bg-primary/40 px-3 py-1 rounded-full">
                            {isTrustee ? "Board of Trustees" : "Management Team"}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{member.name}</h1>
                        <p className="text-lg font-semibold text-primary">{member.position}</p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">{member.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
