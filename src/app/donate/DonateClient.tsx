"use client";

import { useState } from "react";
import { ShieldCheck, Heart, HeartHandshake, ArrowRight } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { donationTiers } from "@/lib/content";

export default function DonatePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<"KES" | "USD">("KES");
  const [amount, setAmount] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const exchangeRate = 130; // Mock rate USD to KES

  const handleSelectTier = (tierValue: string) => {
    // Extract numeric value from "KES 2,500" string
    const numericStr = tierValue.replace(/[^0-9]/g, '');
    const value = parseInt(numericStr, 10);

    if (selectedCurrency === "KES") {
      setAmount(value);
    } else {
      setAmount(Math.round(value / exchangeRate));
    }
  };

  // Paystack Configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || "donor@example.com",
    amount: (typeof amount === 'number' ? amount : 0) * (selectedCurrency === "KES" ? 100 : 100 * exchangeRate), // Convert to kobo/cents equivalent base
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder", // Requires a real key in production
    currency: "KES",
  };

  const initializePayment = usePaystackPayment(config);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    initializePayment({
      onSuccess: () => {
        alert("Thank you for your generous donation!");
      },
      onClose: () => {
        console.log("Payment dialog closed.");
      }
    });
  };

  return (
    <div className="w-full relative bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      {/* Background Brick Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v10H0V0zm20 10h20v10H20V10zM0 20h20v10H0V20zm20 10h20v10H20V30z' fill='%2310b981' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      {/* Header section integrated into layout */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Left Side: Information */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-full w-fit mb-1">
            <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Make an <span className="text-emerald-600">Impact</span> Today
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-2">
            Your support directly fuels mission-critical programs—from providing clean water to funding essential medical camps. Every contribution, no matter the size, changes lives.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Why Give Here?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mr-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Governance-led Oversight</h4>
                  <p className="text-sm text-slate-500 mt-1">100% transparent fund allocation verified by our board of trustees.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mr-4">
                  <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Direct Beneficiary Support</h4>
                  <p className="text-sm text-slate-500 mt-1">Reduced overhead means your funds go directly straight to field programs.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Donation Form */}
        <div className="lg:w-1/2 relative">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 relative z-10 w-full">

            {/* Currency Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-8 w-fit mx-auto md:mx-0">
              <button
                onClick={() => setSelectedCurrency("KES")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${selectedCurrency === "KES" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white " : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
              >
                KES (KSh)
              </button>
              <button
                onClick={() => setSelectedCurrency("USD")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${selectedCurrency === "USD" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white " : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
              >
                USD ($)
              </button>
            </div>

            <form onSubmit={handleDonateSubmit} className="space-y-6">

              {/* Preset Amounts Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {donationTiers.map((tier) => {
                  const numericStr = tier.tier.replace(/[^0-9]/g, '');
                  const baseValue = parseInt(numericStr, 10);
                  const displayValue = selectedCurrency === "KES" ? baseValue : Math.round(baseValue / exchangeRate);

                  const isSelected = amount === displayValue;

                  return (
                    <div
                      key={tier.tier}
                      onClick={() => handleSelectTier(tier.tier)}
                      className={`cursor-pointer rounded-xl p-3 md:p-4 border text-center transition-all flex flex-col items-center justify-center ${isSelected ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-300"}`}
                    >
                      <div className="text-sm md:text-xl font-bold whitespace-nowrap">{selectedCurrency === "KES" ? "KSh" : "$"} {displayValue.toLocaleString()}</div>
                      <div className="hidden md:block text-[10px] leading-tight text-slate-500 font-normal mt-1">{tier.impact}</div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Custom Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">{selectedCurrency === "KES" ? "KSh" : "$"}</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter amount"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!amount || amount <= 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex justify-center items-center transition-colors"
                >
                  Donate {amount ? `${selectedCurrency === "KES" ? "KSh" : "$"} ${amount.toLocaleString()}` : "Now"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Secure payment powered by Paystack
                </p>
              </div>

            </form>
          </div>

          {/* Decorative blob behind the form */}
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-emerald-600/10 rounded-[2rem] -z-10"></div>
        </div>

      </section>
    </div>
  );
}
