import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container grid gap-10 md:grid-cols-4">
        <div>
          <Link href="/" className="font-bold tracking-tight text-primary text-2xl flex items-center gap-2 mb-4">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/logo.png" alt="Cornerstone Foundation" fill className="object-contain" unoptimized={true} />
            </div>

            Cornerstone
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Serving communities through education, social support, and dignified humanitarian support.
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
          <h4 className="font-medium text-slate-900 dark:text-white">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Activities</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
