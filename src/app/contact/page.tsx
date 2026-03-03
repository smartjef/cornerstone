"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">

      {/* 1. Page Header (Starbase style: Dark image background with breadcrumbs) */}
      <section className="relative w-full pt-32 pb-20 bg-slate-900 border-b border-white/10" style={{
        backgroundImage: 'url("/images/foundation_community_impact.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 rounded-full mb-6 backdrop-blur-md border border-emerald-500/20">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-widest">Contact Us</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors uppercase tracking-widest font-bold">Home</Link>
            <span>/</span>
            <span className="uppercase tracking-widest font-bold text-white">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Contact Form (Left 3 cols) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 md:p-12 border border-slate-200 dark:border-slate-800">
            <div className="mb-10">
              <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-4">Send us a message</h2>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Connect with our team</h3>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    className="h-14 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500 rounded-none px-6 text-sm font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="h-14 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500 rounded-none px-6 text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                <Input
                  placeholder="How can we help?"
                  className="h-14 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500 rounded-none px-6 text-sm font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message</label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[200px] resize-none bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500 rounded-none p-6 text-sm font-medium leading-relaxed"
                />
              </div>
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-12 rounded-none uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-3">
                Send Message <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Contact Info (Right 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 p-10 border border-white/10 text-white flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all" />

              <h3 className="text-xl font-bold mb-10 uppercase tracking-widest border-b border-white/10 pb-6">Foundation Hub</h3>

              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Email Us</h4>
                    <p className="text-lg text-slate-100 font-bold">info@cornerstone.or.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Call Us</h4>
                    <p className="text-lg text-slate-100 font-bold">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Location</h4>
                    <p className="text-lg text-slate-100 font-bold leading-tight">Nairobi, Kenya<br /><span className="text-xs text-slate-400 font-medium">Headquarters</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Working Hours</h4>
                    <p className="text-lg text-slate-100 font-bold">Mon - Fri: 8am - 5pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  &ldquo;Anchored in Christian values of compassion, stewardship, service, and dignity.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
