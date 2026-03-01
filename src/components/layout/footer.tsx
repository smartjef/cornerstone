import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">The Cornerstone Foundation</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Serving communities through healthcare, education, social support, and dignified humanitarian response.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Email: info@cornerstonefoundation.org</li>
            <li>Phone: +254 700 000 000</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Governance & Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about">Trustees & Governance</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/blog">Activities</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
