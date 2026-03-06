"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { gallery } from "@/lib/content";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Hero Carousel slides using only original Cornerstone Foundation content.
 */
const SLIDES = gallery.slice(0, 4).map(item => ({
    image: item.src,
    label: item.caption
}));

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Standard navigation functions
    const next = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prev = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const goToSlide = useCallback((index: number, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrent(index);
    }, []);

    // Effect for automatic scrolling every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

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
                        />
                        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Navigation Controls - High Layer (z-60) - Hidden or sized smaller on mobile */}
            <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-between px-2 sm:px-4">
                <button
                    onClick={prev}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                    onClick={next}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-emerald-600 text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </div>

            {/* Bottom Info Bar - Highest Layer (z-[70]) - Fully Responsive Layout */}
            <div className="absolute bottom-0 left-0 right-0 z-[70] bg-black/80 md:bg-black/60 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pointer-events-auto">
                {/* Current Slide Label - Centered on mobile, Left-aligned on desktop */}
                <p className="text-white text-[10px] sm:text-sm font-bold tracking-[0.2em] uppercase text-center sm:text-left leading-relaxed max-w-[280px] sm:max-w-none">
                    {SLIDES[current].label}
                </p>

                {/* Indicators and CTA Group - Stretches on mobile */}
                <div className="flex items-center gap-4 sm:gap-10 w-full sm:w-auto justify-center sm:justify-end">
                    {/* Indicators - Smaller/Tighter on mobile */}
                    <div className="flex gap-1.5 sm:gap-3">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => goToSlide(i, e)}
                                className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === current ? "w-6 sm:w-10 bg-emerald-500" : "w-1.5 sm:w-3 bg-white/30 hover:bg-white"
                                    }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Discover More Button - Optimized for touch and mobile readability */}
                    <Link
                        href="/about"
                        className="shrink-0 text-[10px] sm:text-xs font-bold text-white border border-white/40 hover:bg-emerald-600 hover:border-emerald-600 px-4 sm:px-6 py-2 sm:py-2.5 transition-all uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-white/5 sm:bg-transparent text-center whitespace-nowrap hidden sm:block"
                    >
                        Discover More
                    </Link>
                </div>
            </div>
        </section>
    );
}
