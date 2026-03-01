import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <section className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">Contact</h1>
        <p className="text-muted-foreground">Reach us for partnerships, governance inquiries, or community collaboration opportunities.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Send us a message</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Full Name" />
            <Input type="email" placeholder="Email Address" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Your message" />
            <Button>Submit</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Foundation Information</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Email: info@cornerstonefoundation.org</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Nairobi, Kenya</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Map Placeholder</CardTitle></CardHeader>
            <CardContent className="h-48 rounded-md border border-dashed bg-muted/40" />
          </Card>
        </div>
      </section>
    </div>
  );
}
