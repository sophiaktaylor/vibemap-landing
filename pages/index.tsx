import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Users, Compass, BellRing, Filter, ArrowRight, ShieldCheck, Smartphone, Clock, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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
    <Card className={`relative rounded-2xl border-2 ${t.featured ? "ring-2 ring-pink-500 border-pink-300 bg-gradient-to-br from-white to-pink-50" : "border-purple-200/50"}` }>
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
        <Button className={`w-full group ${t.featured ? "bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700" : ""}`} variant={t.featured ? "default" : "secondary"}>
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-purple-200/40 bg-gradient-to-r from-white/90 to-purple-50/90">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.svg 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              width="24" 
              height="32" 
              viewBox="0 0 24 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <defs>
                <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path 
                d="M12 0C5.4 0 0 5.4 0 12c0 8 12 20 12 20s12-12 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" 
                fill="url(#pinGradient)"
              />
            </motion.svg>
            <span className="font-semibold">VibeMap</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-purple-600 transition-colors">Features</a>
            <a href="#how" className="hover:text-pink-600 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-8 left-10 w-72 h-72 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl/tight font-extrabold tracking-tight md:text-5xl"
            >
              Find your next plan in <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">60 seconds</span>
            </motion.h1>
            <p className="mt-4 text-slate-600 max-w-prose">
              VibeMap brings together local events, hidden spots, and campus happenings—personalized to your interests, on a clean map that cuts the scroll.
            </p>

            <motion.ul 
              className="mt-6 space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {valueProps.map((vp, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-center gap-3 text-sm">
                  <motion.div 
                    className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 grid place-items-center"
                    animate={floatingVariants.animate}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {vp.icon}
                  </motion.div>
                  <span>{vp.text}</span>
                </motion.li>
              ))}
            </motion.ul>

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
              <Button type="submit" className="rounded-xl px-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Join waitlist</Button>
            </form>
            {submitted && (
              <p className="mt-2 text-sm text-emerald-600">Thanks! We'll be in touch with beta invites soon.</p>
            )}
          </div>

          {/* Live Map Preview */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-20"
              animate={pulseVariants.animate}
            />
            <div className="relative z-10">
              <MapPreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 border-t border-purple-200/40 bg-gradient-to-b from-white via-purple-50/30 to-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Why VibeMap?</h2>
          <p className="mt-2 text-slate-600 max-w-prose">Unified discovery, less friction, more plans. Built from 20+ student interviews and validated demand.</p>

          <motion.div 
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((f, i) => {
              const colors = ['from-purple-100 to-pink-100 text-purple-700', 'from-pink-100 to-red-100 text-pink-700', 'from-blue-100 to-purple-100 text-blue-700', 'from-yellow-100 to-orange-100 text-yellow-700', 'from-green-100 to-blue-100 text-green-700', 'from-red-100 to-pink-100 text-red-700'];
              return (
                <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                  <Card className="rounded-2xl border-2 border-purple-100/50 hover:border-purple-300/50 transition-all h-full cursor-pointer">
                    <CardHeader className="space-y-1">
                      <motion.div 
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colors[i]} grid place-items-center`}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {f.icon}
                      </motion.div>
                      <CardTitle className="text-xl">{f.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">{f.desc}</CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Tell us your interests", "Browse the live map", "Plan with friends"].map((step, i) => {
              const stepColors = ['from-purple-600 to-pink-600', 'from-pink-600 to-red-600', 'from-blue-600 to-purple-600'];
              return (
                <Card key={i} className="rounded-2xl border-2 border-blue-100/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><span className={`h-8 w-8 rounded-full bg-gradient-to-r ${stepColors[i]} text-white grid place-items-center text-sm`}>{i + 1}</span>{step}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">
                    {i === 0 && "Pick vibes, budgets, and interests. VibeMap tunes recommendations instantly."}
                    {i === 1 && "See everything on one clean map with filters for time, distance, and price."}
                    {i === 2 && "Tag friends, share plans, and get alerts when something's trending nearby."}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 border-y border-purple-200/40">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Simple pricing</h2>
          <p className="mt-2 text-slate-600">Start free. Upgrade anytime for exclusive drops and advanced filters.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tiers.map((t, i) => <Tier key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Students are finding their vibe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { q: "I stopped doomscrolling and actually went out.", a: "Transfer student, SLO" },
              { q: "Finally an app that shows hidden things—not just ads.", a: "Junior, CS" },
              { q: "We planned a last‑minute beach volleyball game in minutes.", a: "Freshman, Business" },
            ].map((t, i) => {
              const testimonialColors = ['border-purple-200/50', 'border-pink-200/50', 'border-blue-200/50'];
              return (
                <Card key={i} className={`rounded-2xl border-2 ${testimonialColors[i]} bg-gradient-to-br ${i === 0 ? 'from-purple-50 to-white' : i === 1 ? 'from-pink-50 to-white' : 'from-blue-50 to-white'}`}>
                  <CardContent className="p-6">
                    <p className="text-slate-800">"{t.q}"</p>
                    <p className="mt-3 text-sm text-slate-500">— {t.a}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
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
            <Button type="submit" variant="secondary" className="rounded-xl bg-white text-purple-600 hover:bg-purple-50">Join waitlist</Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 to-white"><CardHeader><CardTitle>Where does event data come from?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Aggregated from public sources (e.g., campus orgs, local venues, community boards) plus user submissions and partner feeds.</CardContent></Card>
            <Card className="rounded-2xl border-2 border-pink-200/50 bg-gradient-to-br from-pink-50 to-white"><CardHeader><CardTitle>Will this drain my battery?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">No—VibeMap uses adaptive location checks and local caching to be battery‑friendly.</CardContent></Card>
            <Card className="rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-white"><CardHeader><CardTitle>Is my data private?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Yes. We keep data minimal, let you control visibility, and avoid dark‑pattern engagement.</CardContent></Card>
            <Card className="rounded-2xl border-2 border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-white"><CardHeader><CardTitle>How do I get early access?</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Join the waitlist above—cities roll out in waves. Ambassadors get priority.</CardContent></Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-purple-200/40 bg-gradient-to-b from-white to-purple-50/20">
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
