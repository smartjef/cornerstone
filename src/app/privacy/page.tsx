import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — Cornerstone Foundation",
    description: "Learn how the Cornerstone Foundation collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    return (
        <div className="w-full bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-3">Legal</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 2026</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
                        <p>The Cornerstone Foundation (&quot;Foundation&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the information you provide when you interact with our website.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600 dark:text-slate-400">
                            <li><strong>Contact information</strong> — name, email address, and phone number submitted through our contact form</li>
                            <li><strong>Usage data</strong> — pages visited, time spent on the Site, and browser information collected through standard web analytics</li>
                            <li><strong>Correspondence</strong> — any information you provide when communicating with us by email</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600 dark:text-slate-400">
                            <li>Respond to enquiries and requests submitted via the contact form</li>
                            <li>Send programme updates and newsletters (only where you have opted in)</li>
                            <li>Improve the content and experience of our website</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Data Sharing</h2>
                        <p>We do not sell, rent, or trade your personal information to third parties. We may share data with trusted service providers (e.g., email platforms) strictly for operational purposes and under confidentiality agreements. We may also disclose information where required by law.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Cookies</h2>
                        <p>Our website may use cookies to improve your browsing experience. You may configure your browser to refuse cookies; however, some parts of the Site may not function correctly without them. We do not use cookies for advertising purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Data Security</h2>
                        <p>We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Your Rights</h2>
                        <p>You have the right to request access to, correction of, or deletion of personal data we hold about you. To exercise these rights, please contact us at the address below.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will post the revised version on this page with an updated date. Continued use of the Site after changes constitutes acceptance of the updated policy.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please reach out to us at <a href="mailto:info@cornerstone.or.ke" className="text-emerald-600 hover:underline">info@cornerstone.or.ke</a> or write to us at our Nairobi office.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
