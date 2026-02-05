"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LEAD_STORAGE_KEY = "__bgw_leads__";

export function LeadCaptureForm({ title = "Start your project", description, source = "site", context = {} }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.name && form.email && form.phone;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid || status === "submitting") return;
    setStatus("submitting");

    const payload = {
      ...form,
      source,
      context,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed");
    } catch {
      // Allow demo to succeed even if endpoint is offline.
    }

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(LEAD_STORAGE_KEY);
      const leads = existing ? JSON.parse(existing) : [];
      leads.push(payload);
      window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leads));
    }

    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-2">Received</p>
        <h3 className="text-2xl font-light text-white mb-2">We’re on it.</h3>
        <p className="text-sm text-neutral-400">
          Your project details are saved. A specialist will follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-2">Get Pricing</p>
        <h3 className="text-2xl font-light text-white">{title}</h3>
        {description && <p className="text-sm text-neutral-400 mt-1">{description}</p>}
      </div>

      <div className="grid gap-3">
        <Input
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Full name"
          className="bg-neutral-950/60 text-white border-neutral-800 focus-visible:ring-amber-400/30"
        />
        <Input
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Email address"
          type="email"
          className="bg-neutral-950/60 text-white border-neutral-800 focus-visible:ring-amber-400/30"
        />
        <Input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Phone number"
          type="tel"
          className="bg-neutral-950/60 text-white border-neutral-800 focus-visible:ring-amber-400/30"
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || status === "submitting"}
        className="w-full bg-white text-neutral-950 hover:bg-neutral-100"
      >
        {status === "submitting" ? "Submitting..." : "Request Pricing"}
      </Button>
    </form>
  );
}
