"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full w-10 h-10 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
    >
      {isDark ? <Sun className="h-5 w-5 text-slate-300" /> : <MoonStar className="h-5 w-5 text-slate-600" />}
    </Button>
  );
}
