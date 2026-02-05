"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">Support</p>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">Start a project</h1>
            <p className="text-lg text-neutral-400 mb-8">
              Share your details and a specialist will reach out with pricing, availability, and installation guidance.
            </p>
          </div>

          <div className="max-w-xl">
            <LeadCaptureForm
              title="Request a consultation"
              description="We’ll respond with pricing and next steps."
              source="support"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
