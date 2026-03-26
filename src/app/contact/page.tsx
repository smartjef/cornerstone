import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      {/* Background Brick Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%23002365' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      {/* Page Header */}
      <section className="relative pt-32 pb-24 w-full flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-slate-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-2">
            <MessageSquare className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Get in <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light max-w-2xl mx-auto">
            Reach us for partnerships, governance inquiries, or community collaboration opportunities. We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 dark:border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h3>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <Input placeholder="John Doe" className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <Input placeholder="How can we partner?" className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[160px] resize-none bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary rounded-2xl p-4" />
              </div>
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-xl ">
                Send Message
              </Button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-primary/20 text-white h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-8 text-blue-400">Foundation Info</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-1 uppercase tracking-wider">Email Us</p>
                    <p className="text-blue-50/90 font-medium">info@cornerstone.or.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-1 uppercase tracking-wider">Call Us</p>
                    <p className="text-blue-50/90 font-medium">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-1 uppercase tracking-wider">Location</p>
                    <p className="text-blue-50/90 font-medium leading-relaxed">Nairobi, Kenya<br />HQ Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
