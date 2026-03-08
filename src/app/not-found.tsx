import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center z-10 relative mt-20">
            <div className="text-primary/10 dark:text-blue-400/5 font-black text-9xl absolute -z-10 select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                404
            </div>

            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full inline-block mb-8 shadow-sm">
                <FileQuestion className="w-16 h-16 text-primary" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Page Not Found</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10">
                We could not find the page you were looking for. It might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold px-8 w-full"
                    >
                        <Home className="w-4 h-4 mr-2" /> Back to Home
                    </Button>
                </Link>
                <Link href="/blog">
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-primary font-bold px-8 w-full block"
                    >
                        Our Activities
                    </Button>
                </Link>
            </div>
        </div>
    );
}
