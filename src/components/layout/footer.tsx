import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="font-bold tracking-tight text-emerald-600 dark:text-emerald-500 text-2xl flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            Cornerstone
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Serving communities through healthcare, education, social support, and dignified humanitarian response.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>Email: info@cornerstone.or.ke</li>
            <li>Phone: +254 700 000 000</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white">Governance & Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-emerald-600 transition-colors">Trustees & Governance</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-600 transition-colors">Activities</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
