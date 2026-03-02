"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2670&auto=format&fit=crop",
        badge: "Empowering Communities",
        title1: "Building a",
        titleHighlight: "Brighter",
        title2: "Future",
        desc: "The Cornerstone Foundation provides critical support for education, healthcare, vulnerable groups, and clean water infrastructure across Kenya.",
    },
    {
        image: "/images/school_building_1772435941123.png",
        badge: "Educating the Youth",
        title1: "Scholarships for",
        titleHighlight: "Every",
        title2: "Child",
        desc: "Ensuring access to quality education for the most vulnerable members of society through targeted bursaries and support.",
    },
    {
        image: "/images/hospital_interior_1772435926459.png",
        badge: "Health & Well-being",
        title1: "Critical Care",
        titleHighlight: "Accessible",
        title2: "to All",
        desc: "Construction and maintenance of medical clinics to serve individuals in areas with restricted healthcare access.",
    }
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[85vh] w-full flex items-center pt-20 overflow-hidden bg-slate-950">
            {/* Background Images */}
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100 object-cover z-0" : "opacity-0 z-[-1]"}`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.badge}
                        width={2670} height={1600}
                        priority={index === 0}
                        className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[10000ms] ease-out ${index === current ? "scale-105" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/60 to-emerald-900/20" />
                </div>
            ))}

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-8 py-20 min-h-[400px] flex flex-col justify-center">

                    <div className="transition-all duration-700 transform translate-y-0 opacity-100">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-4 py-1.5 backdrop-blur-md font-medium tracking-wide mb-6 inline-flex ">
                            {SLIDES[current].badge}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 min-h-[140px] md:min-h-[160px]">
                            {SLIDES[current].title1} <br className="hidden md:block" />
                            <span className="text-emerald-400">{SLIDES[current].titleHighlight}</span> {SLIDES[current].title2}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed font-light min-h-[80px]">
                            {SLIDES[current].desc}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/donate">
                            <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 h-14 px-8 font-semibold transition-all hover:">
                                Donate <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline" className="rounded-full text-white border-white/30 hover:bg-white/10 hover:border-white bg-transparent h-14 px-8 font-semibold transition-all backdrop-blur-sm">
                                Discover Our Mission
                            </Button>
                        </Link>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex items-center gap-3 pt-8">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-emerald-400" : "w-3 bg-white/40 hover:bg-white/80"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
