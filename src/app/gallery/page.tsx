"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { gallery } from "@/lib/content";



export default function GalleryPage() {
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [fullscreen, setFullscreen] = useState(false);

    const open = (i: number) => setLightbox(i);
    const close = () => { setLightbox(null); setFullscreen(false); };
    const prev = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + gallery.length) % gallery.length : null), []);
    const next = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % gallery.length : null), []);

    useEffect(() => {
        if (lightbox === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox, prev, next]);

    const current = lightbox !== null ? gallery[lightbox] : null;

    return (
        <div className="w-full bg-slate-950 min-h-screen">
            {/* Header */}
            <section className="relative pt-32 pb-16 flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-950 to-slate-950" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
                    <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase">Our Work in Pictures</h2>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                        Photo <span className="text-blue-400">Gallery</span>
                    </h1>
                    <p className="text-lg text-blue-200/70 font-light">
                        A visual record of our projects and programmes across Kenya.
                    </p>
                </div>
            </section>

            <section>
                <div className="gallery-grid">
                    <style>{`
                        .gallery-grid {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 1px;
                        }
                        @media (min-width: 768px) {
                            .gallery-grid {
                                grid-template-columns: repeat(4, 1fr);
                            }
                        }
                        .gallery-cell-wide {
                            grid-column: span 2;
                            aspect-ratio: 16/9;
                        }
                        .gallery-cell-std {
                            grid-column: span 1;
                            aspect-ratio: 1/1;
                        }
                        @media (min-width: 768px) {
                            .gallery-cell-std {
                                aspect-ratio: 4/5;
                            }
                        }
                    `}</style>
                    {gallery.map((item, i) => (
                        <div
                            key={i}
                            className={`gallery-cell-${item.span === 2 ? "wide" : "std"} relative overflow-hidden group cursor-pointer select-none`}
                            style={{}}
                            onClick={() => open(i)}
                        >
                            <Image
                                src={item.src}
                                alt={item.caption}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Hover overlay — caption only on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1">{item.category}</span>
                                <p className="text-white font-semibold text-sm md:text-base leading-snug">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && current && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
                    onClick={close}
                >
                    {/* Container */}
                    <div
                        className={`relative flex flex-col items-center justify-center ${fullscreen ? "w-screen h-screen" : "w-full max-w-5xl max-h-[90vh] mx-4"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className={`relative w-full ${fullscreen ? "h-screen" : "max-h-[80vh]"} overflow-hidden`}>
                            <Image
                                src={current.src}
                                alt={current.caption}
                                width={1600}
                                height={1000}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Caption */}
                        <div className="w-full px-2 py-3 flex items-center justify-between">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">{current.category}</span>
                                <p className="text-white font-semibold text-sm mt-0.5">{current.caption}</p>
                            </div>
                            <span className="text-slate-400 text-sm">{lightbox + 1} / {gallery.length}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    {/* Prev */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Top controls: expand + close */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); setFullscreen((f) => !f); }}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
                            aria-label="Toggle fullscreen"
                        >
                            <Maximize2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); close(); }}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
