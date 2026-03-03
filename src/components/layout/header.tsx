"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Activities" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 transition-all duration-300">
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold tracking-tight text-emerald-600 dark:text-emerald-500 text-2xl flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            Cornerstone
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-bold transition-colors ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hidden md:inline-flex">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 md:px-6 font-bold tracking-wide">
                Contact Us
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="md:hidden text-slate-900 dark:text-white p-2 h-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col h-screen">
          <nav className="flex flex-col gap-6 w-full py-8 border-y border-slate-100 dark:border-slate-800">
            {[...navItems, { href: "/contact", label: "Contact Us" }].map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-colors ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  );
}
