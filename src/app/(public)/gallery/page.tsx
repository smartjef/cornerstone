import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "../../../components/gallery-grid";

export default async function GalleryPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const galleryItems = await (prisma as any).galleryItem.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });

    // Flatten images from all gallery items and map to expected format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const galleryItemsMapped = galleryItems.flatMap((item: any) => {
        const imgs = Array.isArray(item.images) ? item.images : []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return imgs.map((img: any) => ({
            src: img.src,
            caption: img.caption || item.title,
            category: item.category?.name || "General",
            span: img.span || 1
        }))
    });

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

            {galleryItemsMapped.length > 0 ? (
                <GalleryGrid items={galleryItemsMapped} />
            ) : (
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <p className="text-blue-200/50 font-medium italic">Our gallery is currently being curated. Check back soon for updates.</p>
                </div>
            )}
        </div>
    );
}


