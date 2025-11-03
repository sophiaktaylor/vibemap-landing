import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Users, Compass, BellRing, Filter, ArrowRight, ShieldCheck, Smartphone, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import MapPreview to avoid SSR issues with Leaflet
const MapPreview = dynamic(() => import("@/components/MapPreview").then(mod => ({ default: mod.MapPreview })), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full rounded-xl border border-slate-200 shadow-lg bg-slate-100 animate-pulse" />,
});

const features = [
  {
    icon: <Compass className="h-6 w-6" aria-hidden />,
    title: "All events, one map",
    desc: "A unified, real-time map of what's happening around you—from pop-ups to concerts to campus clubs.",
  },
  {
    icon: <Filter className="h-6 w-6" aria-hidden />,
    title: "Smart filters",
    desc: "Dial in by vibe, price, distance, time, and interests to cut the scroll and get moving.",
  },
  {
    icon: <Users className="h-6 w-6" aria-hidden />,
    title: "Friend signals",
    desc: "See what friends are into, tag each other on plans, and never miss an invite.",
  },
  {
    icon: <BellRing className="h-6 w-6" aria-hidden />,
    title: "Last‑minute alerts",
    desc: "Push notifications for trending events and limited spots near you.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    title: "No‑toxic discovery",
    desc: "Intentional discovery without doomscroll—privacy-first, ad‑light by default.",
  },
  {
    icon: <Smartphone className="h-6 w-6" aria-hidden />,
    title: "iOS & Android",
    desc: "Fast native apps with offline caching and battery‑friendly location use.",
  },
];

const valueProps = [
  { icon: <Sparkles className="h-5 w-5" />, text: "Personalized picks based on your interests" },
  { icon: <Clock className="h-5 w-5" />, text: "Plan ahead or find something in 60 seconds" },
  { icon: <MapPin className="h-5 w-5" />, text: "Exact locations, prices, and real‑time details" },
];


const tiers = [
  {
    name: "Free",
    price: "$0",
    perks: ["Unlimited browse & map", "Core filters & interests", "Friend follows", "Event save & reminders"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Vibe+",
    price: "$3.99/mo",
    perks: [
      "Ad‑free experience",
      "Priority drops & exclusives",
      "Advanced filters (mood, crowd, vibe)",
      "Early access to limited events",
    ],
    cta: "Join Vibe+",
    featured: true,
  },
];


function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function Tier({ t }: { t: any }) {
  return (
    <Card className={`relative rounded-2xl ${t.featured ? "ring-2 ring-indigo-500" : ""}` }>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>{t.name}</span>
          <span className="text-2xl font-semibold">{t.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="mb-6 space-y-2 text-sm">
          {t.perks.map((p: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <Star className="h-4 w-4 mt-0.5" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full group" variant={t.featured ? "default" : "secondary"}>
          {t.cta}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VibeMapLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integrate with your provider (e.g., Supabase, Mailchimp) here.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-9 w-9 rounded-2xl bg-indigo-600 text-white grid place-items-center font-semibold">
              VM
            </motion.div>
            <span className="font-semibold">VibeMap</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            <Button>Download</Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl/tight font-extrabold tracking-tight md:text-5xl"
            >
              Find your next plan in <span className="text-indigo-600">60 seconds</span>
            </motion.h1>
            <p className="mt-4 text-slate-600 max-w-prose">
              VibeMap brings together local events, hidden spots, and campus happenings—personalized to your interests, on a clean map that cuts the scroll.
            </p>

            <ul className="mt-6 space-y-3">
              {valueProps.map((vp, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-700 grid place-items-center">{vp.icon}</div>
                  <span>{vp.text}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-lg gap-2">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Enter your email for beta access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="submit" className="rounded-xl px-5">Join waitlist</Button>
            </form>
            {submitted && (
              <p className="mt-2 text-sm text-emerald-600">Thanks! We'll be in touch with beta invites soon.</p>
            )}
          </div>

          {/* Live Map Preview */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <MapPreview />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Why VibeMap?</h2>
          <p className="mt-2 text-slate-600 max-w-prose">Unified discovery, less friction, more plans. Built from 20+ student interviews and validated demand (17/20 early adopters).</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="space-y-1">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 grid place-items-center">{f.icon}</div>
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Tell us your interests", "Browse the live map", "Plan with friends"].map((step, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><span className="h-8 w-8 rounded-full bg-indigo-600 text-white grid place-items-center text-sm">{i + 1}</span>{step}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  {i === 0 && "Pick vibes, budgets, and interests. VibeMap tunes recommendations instantly."}
                  {i === 1 && "See everything on one clean map with filters for time, distance, and price."}
                  {i === 2 && "Tag friends, share plans, and get alerts when something's trending nearby."}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Simple pricing</h2>
          <p className="mt-2 text-slate-600">Start free. Upgrade anytime for exclusive drops and advanced filters.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tiers.map((t, i) => <Tier key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Students are finding their vibe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { q: "I stopped doomscrolling and actually went out.", a: "Transfer student, SLO" },
              { q: "Finally an app that shows hidden things—not just ads.", a: "Junior, CS" },
              { q: "We planned a last‑minute beach volleyball game in minutes.", a: "Freshman, Business" },
            ].map((t, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-slate-800">"{t.q}"</p>
                  <p className="mt-3 text-sm text-slate-500">— {t.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Be first to the drop</h2>
            <p className="mt-2 text-indigo-100">Join the waitlist for beta access in your city and early Vibe+ perks.</p>
          </div>
          <form onSubmit={onSubmit} className="flex w-full gap-2">
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button type="submit" variant="secondary" className="rounded-xl">Join waitlist</Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl"><CardHeader><CardTitle>Where does event data come from?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Aggregated from public sources (e.g., campus orgs, local venues, community boards) plus user submissions and partner feeds.</CardContent></Card>
            <Card className="rounded-2xl"><CardHeader><CardTitle>Will this drain my battery?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">No—VibeMap uses adaptive location checks and local caching to be battery‑friendly.</CardContent></Card>
            <Card className="rounded-2xl"><CardHeader><CardTitle>Is my data private?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Yes. We keep data minimal, let you control visibility, and avoid dark‑pattern engagement.</CardContent></Card>
            <Card className="rounded-2xl"><CardHeader><CardTitle>How do I get early access?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Join the waitlist above—cities roll out in waves. Ambassadors get priority.</CardContent></Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} VibeMap • Made with ❤️ on campus</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
