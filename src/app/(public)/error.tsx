"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center z-10 relative mt-20">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full inline-block mb-8">
                <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Something went wrong!</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10">
                We encountered an unexpected issue while loading this page. Our team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={() => reset()}
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold px-8"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Try again
                </Button>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-emerald-500 font-bold px-8 w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
