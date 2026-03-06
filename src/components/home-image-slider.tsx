"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { gallery } from "@/lib/content";

const IMAGES = gallery.map(item => item.src).slice(4, 9);

export function HomeImageSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setCurrent((p) => (p + 1) % IMAGES.length), 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden rounded-none">
            {IMAGES.map((src, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
                >
                    <Image src={src} alt="Cornerstone Foundation" fill className="object-cover" />
                </div>
            ))}
            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
