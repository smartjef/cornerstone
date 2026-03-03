import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions — Cornerstone Foundation",
    description: "Read the Terms & Conditions governing the use of the Cornerstone Foundation website and services.",
};

export default function TermsPage() {
    return (
        <div className="w-full bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-3">Legal</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Terms &amp; Conditions</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 2026</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing or using the Cornerstone Foundation website (the &quot;Site&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use the Site.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. About the Foundation</h2>
                        <p>The Cornerstone Foundation is a registered charitable trust based in Kenya. Our mission is to provide access to quality education, scholarships, bursaries, clean water, and humanitarian support to the most vulnerable members of society.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Use of the Site</h2>
                        <p>You agree to use this Site only for lawful purposes and in a manner that does not infringe on the rights of others. You must not:</p>
                        <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600 dark:text-slate-400">
                            <li>Misrepresent your identity or affiliation with the Foundation</li>
                            <li>Use the Site to distribute unsolicited communications</li>
                            <li>Attempt to gain unauthorised access to any part of the Site</li>
                            <li>Use content from the Site without written permission from the Foundation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Intellectual Property</h2>
                        <p>All content on this Site — including text, images, logos, and graphics — is the property of the Cornerstone Foundation or its content suppliers and is protected by applicable copyright and intellectual property laws. Reproduction without prior written consent is prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Disclaimer of Warranties</h2>
                        <p>The Site and its content are provided on an &quot;as is&quot; basis without any warranties of any kind, either express or implied. The Foundation does not warrant that the Site will be error-free or uninterrupted.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, the Cornerstone Foundation shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Changes to These Terms</h2>
                        <p>We reserve the right to update these Terms &amp; Conditions at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Contact</h2>
                        <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@cornerstone.or.ke" className="text-emerald-600 hover:underline">info@cornerstone.or.ke</a>.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
