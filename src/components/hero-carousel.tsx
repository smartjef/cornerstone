"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Slide {
    image: string;
    label: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    link?: string;
}

// Fallback slides if none provided
const DEFAULT_SLIDES: Slide[] = [
    {
        image: "/images/hero_scholarship_main.png",
        badge: "Empowering Through Education",
        label: "Cornerstone Scholarship Program",
        title: "Building a Brighter Future",
        subtitle: "The Cornerstone Foundation provides scholarships and bursaries ensuring every child, regardless of circumstance, has access to quality education.",
    },
    {
        image: "/images/modern-school-exterior.jpg",
        badge: "Educating the Youth",
        label: "School Infrastructure Projects",
        title: "Scholarships for Every Child",
        subtitle: "Ensuring access to quality education for the most vulnerable members of society through targeted bursaries and support.",
    },
];

interface Props {
  slides?: Slide[];
}

export function HeroCarousel({ slides }: Props) {
    const [current, setCurrent] = useState(0);
    const activeSlides = (slides && slides.length > 0) ? slides : DEFAULT_SLIDES;

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, [activeSlides.length]);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }, [activeSlides.length]);

    useEffect(() => {
        if (activeSlides.length <= 1) return;
        const interval = setInterval(next, 7000);
        return () => clearInterval(interval);
    }, [activeSlides.length, next]);

    if (activeSlides.length === 0) return null;

    const currentSlide = activeSlides[current];

    return (
        <section className="relative w-full overflow-hidden bg-slate-900" style={{ height: "80vh", minHeight: 450 }}>
            {/* 1. Background Slides */}
            <div className="absolute inset-0 z-10">
                {activeSlides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.label || "Hero Slide"}
                            fill
                            priority={i === 0}
                            className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${i === current ? "scale-105" : "scale-100"}`}
                            unoptimized={slide.image.includes('mauzoplus.app') || slide.image.startsWith('http')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/20" />
                    </div>
                ))}
            </div>

            {/* 2. Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-2xl">
                        {(currentSlide.label || currentSlide.title) && (
                            <Badge className="bg-primary/20 text-blue-400 border border-primary/30 rounded-full px-4 py-1.5 backdrop-blur-md font-medium tracking-wide mb-6 inline-flex uppercase text-[10px]">
                                {currentSlide.label || "Cornerstone Foundation"}
                            </Badge>
                        )}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 min-h-[100px] md:min-h-[140px]">
                            {currentSlide.title || "Empowering Communities Across Kenya"}
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-slate-200 max-w-lg leading-relaxed font-light min-h-[60px] mb-8">
                            {currentSlide.subtitle || "The Cornerstone Foundation focuses on sustainable, accountable impact through education, water, and humanitarian solutions."}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Link href={currentSlide.link || "/about"}>
                                <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-white h-14 px-10 font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 group">
                                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Navigation Controls */}
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-between px-4">
                <button
                    onClick={prev}
                    className="w-12 h-12 bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto backdrop-blur-sm rounded-none group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={next}
                    className="w-12 h-12 bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto backdrop-blur-sm rounded-none group"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* 4. Indicators & Strip Content */}
            <div className="absolute bottom-0 left-0 right-0 z-40 bg-slate-950/40 backdrop-blur-md px-6 md:px-12 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Progress dots */}
                    <div className="flex items-center gap-3">
                        {activeSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1 cursor-pointer transition-all duration-500 ${i === current ? "w-16 bg-primary" : "w-6 bg-white/20 hover:bg-white/40"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="text-right">
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Cornerstone Foundation</p>
                            <p className="text-white text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[300px] truncate">
                                {currentSlide.label}
                            </p>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <Link href="/gallery" className="group flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                <Play className="w-3 h-3 fill-current text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">View Impact</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
