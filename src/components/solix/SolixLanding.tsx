import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sun, Wind, Zap, Thermometer, Leaf, Droplets, Lightbulb, Plug,
  ShieldCheck, Building2, GraduationCap, TreePine, ArrowRight,
  Moon, SunMedium, Menu, X, Mail, Phone, Linkedin, Instagram,
  Heart, Cpu, Recycle, Sparkles, CircuitBoard, CloudSun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import podImage from "@/assets/solix-pod.jpg";
import pod1 from "@/assets/refs/pod-1.png";
import pod2 from "@/assets/refs/pod-2.png";
import pod3 from "@/assets/refs/pod-3.png";
import pod4 from "@/assets/refs/pod-4.png";

/* ---------- Theme toggle ---------- */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("solix-theme") : null;
    const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefers;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("solix-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ---------- Section wrapper ---------- */
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-primary">
      <span className="size-1.5 rounded-full bg-secondary" />
      {children}
    </div>
  );
}

/* ---------- Navigation ---------- */
function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#solution", label: "Solution" },
    { href: "#how", label: "How it works" },
    { href: "#benefits", label: "Benefits" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-6 md:px-10 ${scrolled ? "glass rounded-2xl shadow-soft" : ""} transition-all`}>
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-gradient-hero shadow-glow">
              <Sun className="size-4 text-white" />
            </span>
            <span className="gradient-text text-xl">SOLIX</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="size-10 inline-flex items-center justify-center rounded-full glass hover:scale-105 transition-transform"
            >
              {dark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button asChild className="hidden md:inline-flex bg-gradient-hero shadow-glow border-0 hover:opacity-95 hover:scale-[1.02] transition-all">
              <a href="#contact">Contact <ArrowRight className="size-4" /></a>
            </Button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden size-10 inline-flex items-center justify-center rounded-full glass">
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-4 pb-2">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-2 py-2 rounded-lg hover:bg-muted text-sm font-medium">
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div id="top" ref={ref} className="relative min-h-screen pt-32 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Sunlight backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-sun opacity-70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_120%,oklch(0.72_0.18_148/0.18),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="absolute -top-40 -right-40 size-[600px] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, oklch(0.83 0.16 84 / 0.45) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Animated rays */}
      <motion.div
        aria-hidden
        className="absolute top-[-200px] right-[-200px] size-[700px] -z-10 opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.83 0.16 84 / 0.4) 10deg, transparent 20deg, transparent 40deg, oklch(0.83 0.16 84 / 0.3) 50deg, transparent 60deg)",
          borderRadius: "50%",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow>Smart City · Sustainable Infrastructure</SectionEyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Smart Solar-Powered <span className="gradient-text">Shading</span> for the Cities of Tomorrow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            SOLIX generates clean energy, reduces heat, and creates comfortable outdoor spaces — powered by sun, cooled by nature.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="h-12 px-7 bg-gradient-hero shadow-glow border-0 hover:opacity-95 hover:scale-[1.02] transition-all">
              <a href="#solution">Explore solution <ArrowRight className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 glass border-0 hover:bg-muted">
              <a href="#contact">Contact us</a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2"><Leaf className="size-4 text-secondary" /> 100% renewable</div>
            <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> UV protection</div>
            <div className="flex items-center gap-2"><Cpu className="size-4 text-accent" /> Smart-city ready</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-glow">
            <img
              src={podImage}
              alt="SOLIX solar-powered shading pod in a smart-city park"
              width={1536}
              height={1152}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-10 glass rounded-2xl p-4 shadow-soft hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Zap className="size-5 text-accent-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Daily output</div>
                <div className="text-sm font-bold">~3.2 kWh clean</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-10 glass rounded-2xl p-4 shadow-soft hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Thermometer className="size-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Surface cooler</div>
                <div className="text-sm font-bold">up to −12 °C</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Problem ---------- */
const problems = [
  { icon: Thermometer, title: "Rising heat & UV", desc: "Public outdoor areas suffer increased heat stress and dangerous UV exposure." },
  { icon: Zap, title: "Cooling energy waste", desc: "Conventional cooling consumes massive electricity loads from the grid." },
  { icon: CircuitBoard, title: "No renewable infra", desc: "Cities lack public infrastructure powered by clean, renewable energy." },
  { icon: CloudSun, title: "Few smart shades", desc: "Smart shading solutions in modern urban planning are limited and outdated." },
];

function Problem() {
  return (
    <Section id="problem">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>The challenge</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Cities are getting hotter, faster.</h2>
        <p className="mt-4 text-muted-foreground text-lg">The infrastructure protecting public outdoor spaces has not kept up with our changing climate.</p>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card className="group h-full p-6 border-border/60 hover:border-primary/40 hover:shadow-soft transition-all bg-card/60 backdrop-blur">
              <div className="size-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <p.icon className="size-5 text-white" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Impact ---------- */
const stats = [
  { value: 78, suffix: "%", label: "Higher heat stress risk in dense urban areas", icon: Thermometer },
  { value: 60, suffix: "%", label: "Of electricity in summer goes to cooling", icon: Zap },
  { value: 45, suffix: "%", label: "Reduction in outdoor comfort during heatwaves", icon: Wind },
  { value: 12, suffix: "Mt", label: "Annual CO₂ from inefficient public cooling", icon: Leaf },
];

function Impact() {
  return (
    <Section id="impact" className="bg-muted/40">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>Why it matters</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Heat is the silent crisis of urban life.</h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative rounded-3xl p-8 glass shadow-soft overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 size-32 rounded-full bg-gradient-hero opacity-10" />
            <s.icon className="size-6 text-primary" />
            <div className="mt-5 text-5xl font-bold gradient-text tabular-nums">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Solution ---------- */
const features = [
  { icon: Sun, title: "Solar energy generation", desc: "High-efficiency panels harvest sunlight all day, every day.", color: "text-accent-foreground", bg: "bg-accent/20" },
  { icon: ShieldCheck, title: "Smart shading system", desc: "Reflective canopy blocks heat and harmful UV instantly.", color: "text-primary", bg: "bg-primary/15" },
  { icon: Wind, title: "Natural cooling", desc: "Engineered airflow channels drop temperatures passively.", color: "text-secondary", bg: "bg-secondary/15" },
  { icon: Plug, title: "USB charging stations", desc: "Free, public, clean-energy charging for every device.", color: "text-primary", bg: "bg-primary/15" },
  { icon: Lightbulb, title: "LED night lighting", desc: "Stored solar power illuminates public spaces after dark.", color: "text-accent-foreground", bg: "bg-accent/20" },
  { icon: Droplets, title: "Water collection", desc: "Optional condensation capture for irrigation reuse.", color: "text-secondary", bg: "bg-secondary/15" },
];

function Solution() {
  return (
    <Section id="solution">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
        <div className="lg:sticky lg:top-32">
          <SectionEyebrow>Meet SOLIX</SectionEyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">One pod. Six systems. <span className="gradient-text">Zero emissions.</span></h2>
          <p className="mt-5 text-muted-foreground text-lg">A modular smart pod that brings shade, energy, lighting, charging and cooling to any public space — installed in hours, autonomous for years.</p>
          <div className="mt-8 relative aspect-square max-w-md rounded-3xl overflow-hidden shadow-glow bg-gradient-hero p-1">
            <div className="size-full rounded-[22px] bg-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-sun opacity-60" />
              <motion.div
                className="absolute top-6 right-6 size-16 rounded-full bg-accent shadow-[0_0_60px_oklch(0.83_0.16_84)]"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
              <div className="absolute inset-x-12 top-1/2 mt-3 h-1 bg-foreground/40 rounded-full" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2 text-xs font-medium"
              >
                Pod · v1.0
              </motion.div>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group p-6 rounded-2xl glass shadow-soft border border-border/60 hover:border-primary/40 transition-colors"
            >
              <div className={`size-11 rounded-xl ${f.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <f.icon className={`size-5 ${f.color}`} />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Design References</SectionEyebrow>
          <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Concepts in the real world</h3>
          <p className="mt-3 text-muted-foreground">Inspiration and reference configurations of the SOLIX pod across bus stops, mobility hubs, parks and urban plazas.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { src: pod1, label: "Campus Stop" },
            { src: pod2, label: "Mobility Hub" },
            { src: pod3, label: "City Pod" },
            { src: pod4, label: "Smart Bench" },
          ].map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass shadow-soft border border-border/60"
            >
              <img
                src={img.src}
                alt={`SOLIX pod reference — ${img.label}`}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{img.label}</span>
                <span className="text-[10px] uppercase tracking-wider glass px-2 py-1 rounded-full">Concept</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- How it works ---------- */
const energyFlow = [
  { icon: Sun, label: "Sunlight" },
  { icon: CircuitBoard, label: "Solar panel" },
  { icon: Zap, label: "Energy generation" },
  { icon: Plug, label: "USB + LED" },
];
const coolingFlow = [
  { icon: Wind, label: "Natural airflow" },
  { icon: Thermometer, label: "Temperature drop" },
  { icon: Heart, label: "Comfort" },
];

function FlowRow({ items, gradient }: { items: { icon: React.ElementType; label: string }[]; gradient: string }) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch gap-3">
      {items.map((it, i) => (
        <div key={it.label} className="flex items-center gap-3 flex-1 min-w-[140px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex-1 rounded-2xl p-5 glass shadow-soft text-center"
          >
            <div className={`mx-auto size-12 rounded-xl ${gradient} flex items-center justify-center shadow-glow`}>
              <it.icon className="size-5 text-white" />
            </div>
            <div className="mt-3 text-sm font-semibold">{it.label}</div>
          </motion.div>
          {i < items.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="hidden sm:block text-muted-foreground"
            >
              <ArrowRight className="size-5" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  return (
    <Section id="how" className="bg-muted/40">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Two natural systems, perfectly choreographed.</h2>
      </div>
      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl glass p-8 shadow-soft">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-primary">
            <Zap className="size-4" /> Energy flow
          </div>
          <h3 className="mt-2 text-2xl font-bold">From sunlight to charged device</h3>
          <div className="mt-8">
            <FlowRow items={energyFlow} gradient="bg-gradient-hero" />
          </div>
        </div>
        <div className="rounded-3xl glass p-8 shadow-soft">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-secondary">
            <Wind className="size-4" /> Cooling process
          </div>
          <h3 className="mt-2 text-2xl font-bold">From hot air to comfortable shade</h3>
          <div className="mt-8">
            <FlowRow items={coolingFlow} gradient="bg-gradient-eco" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Benefits ---------- */
const benefits = [
  { icon: Leaf, title: "Clean renewable energy", desc: "100% solar-powered, grid-independent operation." },
  { icon: ShieldCheck, title: "Comfortable shaded spaces", desc: "Reflective canopy with full UV protection." },
  { icon: Building2, title: "Sustainable infrastructure", desc: "Modular pods built for decades of service." },
  { icon: Zap, title: "Reduced electricity costs", desc: "Public charging without straining the grid." },
  { icon: Heart, title: "Improved public comfort", desc: "Cooler, safer, friendlier public spaces." },
  { icon: Recycle, title: "Environmental protection", desc: "Lower carbon, less heat-island, more nature." },
];

function Benefits() {
  return (
    <Section id="benefits">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>Benefits</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Built for people. Engineered for the planet.</h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-glow transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow shrink-0 group-hover:scale-110 transition-transform">
                <b.icon className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- SDGs ---------- */
const sdgs = [
  { n: 3, title: "Good Health & Well-being", color: "from-[#4C9F38] to-[#2d8a9e]" },
  { n: 7, title: "Affordable & Clean Energy", color: "from-[#FCC30B] to-[#f59e0b]" },
  { n: 9, title: "Industry, Innovation & Infrastructure", color: "from-[#FD6925] to-[#dc2626]" },
  { n: 11, title: "Sustainable Cities & Communities", color: "from-[#F99D26] to-[#fb923c]" },
  { n: 12, title: "Responsible Consumption & Production", color: "from-[#BF8B2E] to-[#a16207]" },
];

function SDGs() {
  return (
    <Section id="sdgs" className="bg-muted/40">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>UN Sustainable Development Goals</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Aligned with global priorities.</h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sdgs.map((s, i) => (
          <motion.a
            key={s.n}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -8, rotate: -1 }}
            onClick={(e) => e.preventDefault()}
            className={`block aspect-square rounded-3xl p-6 bg-gradient-to-br ${s.color} text-white shadow-soft hover:shadow-glow transition-shadow`}
          >
            <div className="text-xs font-bold tracking-widest uppercase opacity-90">SDG</div>
            <div className="mt-1 text-6xl font-black tabular-nums">{s.n}</div>
            <div className="mt-auto pt-6 text-sm font-semibold leading-snug">{s.title}</div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Roadmap ---------- */
const roadmap = [
  { period: "Short-term", years: "1–2 years", items: ["Build final product", "Product testing & validation"], icon: Sparkles },
  { period: "Medium-term", years: "3–5 years", items: ["Deploy in schools", "Deploy in parks", "Deploy in public streets"], icon: TreePine },
  { period: "Long-term", years: "5+ years", items: ["Smart city integration", "IoT connectivity", "Urban sustainability networks"], icon: Building2 },
];

function Roadmap() {
  return (
    <Section id="roadmap">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>Future roadmap</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">A clear path to scale.</h2>
      </div>
      <div className="mt-20 relative">
        <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />
        <div className="grid lg:grid-cols-3 gap-8">
          {roadmap.map((r, i) => (
            <motion.div
              key={r.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="hidden lg:flex absolute left-1/2 -top-2 -translate-x-1/2 size-6 rounded-full bg-gradient-hero shadow-glow items-center justify-center">
                <div className="size-2 rounded-full bg-white" />
              </div>
              <Card className="mt-12 p-8 border-border/60 hover:shadow-glow transition-all bg-card/80 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                    <r.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{r.years}</div>
                    <div className="font-bold">{r.period}</div>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 size-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Cost ---------- */
function Cost() {
  return (
    <Section id="cost" className="bg-muted/40">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionEyebrow>Prototype cost</SectionEyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Affordable to prototype. <span className="gradient-text">Scalable to deploy.</span></h2>
          <p className="mt-5 text-muted-foreground text-lg">Engineered with locally-sourced components and modular assembly — making SOLIX accessible for pilot programs and municipal trials.</p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Modular construction", "Locally sourced parts", "Open documentation for pilots"].map((x) => (
              <li key={x} className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-secondary" /> {x}</li>
            ))}
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-1 bg-gradient-hero shadow-glow"
        >
          <div className="rounded-[22px] bg-card p-10">
            <Badge className="bg-secondary/15 text-secondary border-0">Estimated</Badge>
            <div className="mt-4 text-sm uppercase tracking-wider text-muted-foreground font-medium">Prototype cost</div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-6xl md:text-7xl font-black gradient-text tabular-nums">
                <Counter to={30000} />
              </span>
              <span className="text-2xl font-semibold text-muted-foreground">EGP</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">All-in cost of materials, electronics and assembly for the first functional pod.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[{l:"Structure",v:"40%"},{l:"Solar",v:"35%"},{l:"Smart",v:"25%"}].map((c) => (
                <div key={c.l} className="rounded-xl glass p-3">
                  <div className="text-xs text-muted-foreground">{c.l}</div>
                  <div className="text-lg font-bold">{c.v}</div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 w-full h-12 bg-gradient-hero shadow-glow border-0 hover:opacity-95">
              <a href="#contact">Request a pilot <ArrowRight className="size-4" /></a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Team ---------- */
const team = [
  { name: "Shahd Rady", role: "Co-founder" },
  { name: "Melessia Medhat", role: "Engineering" },
  { name: "Mariam Waled", role: "Product Design" },
  { name: "Haneen Mostafa", role: "Sustainability" },
  { name: "Sohila Emad", role: "Operations" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function Team() {
  return (
    <Section id="team">
      <div className="text-center max-w-2xl mx-auto">
        <SectionEyebrow>The team</SectionEyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Engineers and designers building a cooler future.</h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -8 }}
            className="group rounded-3xl p-6 bg-card border border-border/60 hover:border-primary/40 hover:shadow-glow transition-all text-center"
          >
            <div className="mx-auto aspect-square w-full max-w-[180px] rounded-2xl bg-gradient-hero flex items-center justify-center text-white text-3xl font-black shadow-glow group-hover:scale-[1.03] transition-transform">
              {initials(m.name)}
            </div>
            <div className="mt-5 font-semibold">{m.name}</div>
            <div className="text-xs text-muted-foreground">{m.role}</div>
            <div className="mt-4 flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <a href="#" aria-label={`${m.name} on LinkedIn`} onClick={(e) => e.preventDefault()} className="size-8 rounded-full glass inline-flex items-center justify-center hover:scale-110 transition-transform"><Linkedin className="size-3.5" /></a>
              <a href="#" aria-label={`${m.name} on Instagram`} onClick={(e) => e.preventDefault()} className="size-8 rounded-full glass inline-flex items-center justify-center hover:scale-110 transition-transform"><Instagram className="size-3.5" /></a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! We'll get back to you soon.");
    }, 700);
  };
  return (
    <Section id="contact">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Let's bring SOLIX to <span className="gradient-text">your city.</span></h2>
          <p className="mt-5 text-muted-foreground text-lg">For pilots, partnerships and municipal collaborations — reach out and we'll respond within two business days.</p>
          <div className="mt-10 space-y-4">
            <a href="mailto:greeners444@gmail.com" className="group flex items-center gap-4 rounded-2xl p-5 glass hover:shadow-soft transition-all">
              <div className="size-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow"><Mail className="size-5 text-white" /></div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Email</div>
                <div className="font-semibold group-hover:text-primary transition-colors">greeners444@gmail.com</div>
              </div>
            </a>
            <a href="tel:+201270371323" className="group flex items-center gap-4 rounded-2xl p-5 glass hover:shadow-soft transition-all">
              <div className="size-12 rounded-xl bg-gradient-eco flex items-center justify-center shadow-glow"><Phone className="size-5 text-white" /></div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Phone</div>
                <div className="font-semibold group-hover:text-primary transition-colors">+20 0127 037 1323</div>
              </div>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {[Building2, GraduationCap, TreePine].map((Icon, i) => (
              <Badge key={i} variant="secondary" className="px-3 py-1.5 text-xs">
                <Icon className="size-3.5 mr-1.5" />
                {["Municipalities", "Universities", "Parks"][i]}
              </Badge>
            ))}
          </div>
        </div>
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-10 bg-card border border-border/60 shadow-soft space-y-5"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input id="name" name="name" maxLength={100} required className="mt-2 h-12 bg-background" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" name="email" type="email" maxLength={255} required className="mt-2 h-12 bg-background" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" name="message" maxLength={1000} required className="mt-2 min-h-32 bg-background" placeholder="Tell us about your project..." />
          </div>
          <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-hero shadow-glow border-0 hover:opacity-95">
            {submitting ? "Sending…" : <>Send message <ArrowRight className="size-4" /></>}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const links = [
    { href: "#top", label: "Home" },
    { href: "#solution", label: "Solution" },
    { href: "#benefits", label: "Benefits" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <footer className="relative border-t border-border/60 mt-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-9 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow">
                <Sun className="size-4 text-white" />
              </span>
              <span className="text-xl font-bold gradient-text">SOLIX</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">Powered by Sun, Cooled by Nature — smart solar shading for public spaces.</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:text-primary transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Get in touch</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:greeners444@gmail.com" className="hover:text-primary transition-colors">greeners444@gmail.com</a></li>
              <li><a href="tel:+201270371323" className="hover:text-primary transition-colors">+20 0127 037 1323</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SOLIX. All rights reserved.</div>
          <div>Designed for a cooler, cleaner future.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function SolixLanding() {
  const { dark, toggle } = useTheme();
  // smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav dark={dark} toggle={toggle} />
      <Hero />
      <Problem />
      <Impact />
      <Solution />
      <HowItWorks />
      <Benefits />
      <SDGs />
      <Roadmap />
      <Cost />
      <Team />
      <Contact />
      <Footer />
      <Toaster richColors position="top-right" />
    </main>
  );
}