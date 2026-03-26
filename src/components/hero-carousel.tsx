"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
    {
        image: "/images/hero_scholarship_main.png",
        badge: "Empowering Through Education",
        title1: "Building a",
        titleHighlight: "Brighter",
        title2: "Future",
        desc: "The Cornerstone Foundation provides scholarships and bursaries ensuring every child, regardless of circumstance, has access to quality education across Kenya.",
    },
    {
        image: "/images/modern-school-exterior.jpg",
        badge: "Educating the Youth",
        title1: "Scholarships for",
        titleHighlight: "Every",
        title2: "Child",
        desc: "Ensuring access to quality education for the most vulnerable members of society through targeted bursaries and support.",
    },
];

interface Props {
  slides: Slide[]
}

export function HeroCarousel({ slides: SLIDES }: Props) {
    const [current, setCurrent] = useState(0);

    // Standard navigation functions
    const next = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (SLIDES && SLIDES.length > 0) {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }
    }, [SLIDES]);

    const prev = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (SLIDES && SLIDES.length > 0) {
            setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        }
    }, [SLIDES]);

    const goToSlide = useCallback((index: number, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrent(index);
    }, []);

    // Effect for automatic scrolling every 6 seconds
    useEffect(() => {
        if (!SLIDES || SLIDES.length === 0) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [SLIDES]);

    if (!SLIDES || SLIDES.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden bg-slate-900" style={{ height: "80vh", minHeight: 400 }}>

            {/* Slides container - z-10 for background layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {SLIDES.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            priority={i === 0}
                            className="object-cover object-center"
                            unoptimized={slide.image.includes('mauzoplus.app') || slide.image.startsWith('http')}
                        />

                        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Navigation Controls - High Layer (z-60) - Hidden or sized smaller on mobile */}
            <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-between px-2 sm:px-4">
                <button
                    onClick={prev}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-primary text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto shadow-lg"
                    aria-label="Previous slide"
                >
                    <Image
                        src={slide.image}
                        alt={slide.badge}
                        width={2670} height={1600}
                        priority={index === 0}
                        className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[10000ms] ease-out ${index === current ? "scale-105" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/20" />
                </div>
            ))}

            {/* Bottom Info Bar - Highest Layer (z-[70]) - Fully Responsive Layout */}
            <div className="absolute bottom-0 left-0 right-0 z-[70] bg-black/80 md:bg-black/60 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pointer-events-auto">
                {/* Current Slide Label - Centered on mobile, Left-aligned on desktop */}
                <p className="text-white text-[10px] sm:text-sm font-bold tracking-[0.2em] uppercase text-center sm:text-left leading-relaxed max-w-[280px] sm:max-w-none">
                    {SLIDES[current]?.label}
                </p>

                    <div className="transition-all duration-700 transform translate-y-0 opacity-100">
                        <Badge className="bg-primary/20 text-blue-400 border border-primary/30 rounded-full px-4 py-1.5 backdrop-blur-md font-medium tracking-wide mb-6 inline-flex ">
                            {SLIDES[current].badge}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 min-h-[140px] md:min-h-[160px]">
                            {SLIDES[current].title1} <br className="hidden md:block" />
                            <span className="text-blue-400">{SLIDES[current].titleHighlight}</span> {SLIDES[current].title2}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed font-light min-h-[80px]">
                            {SLIDES[current].desc}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
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
                                className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-blue-400" : "w-3 bg-white/40 hover:bg-white/80"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Discover More Button - Optimized for touch and mobile readability */}
                    <Link
                        href="/about"
                        className="shrink-0 text-[10px] sm:text-xs font-bold text-white border border-white/40 hover:bg-primary hover:border-primary px-4 sm:px-6 py-2 sm:py-2.5 transition-all uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-white/5 sm:bg-transparent text-center whitespace-nowrap hidden sm:block"
                    >
                        Discover More
                    </Link>
                </div>
            </div>
        </section>
    );
}
