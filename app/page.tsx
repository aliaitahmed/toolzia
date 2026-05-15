import type { Metadata } from "next";
import Link from "next/link";
import {
  ImageIcon,
  AtSign,
  Instagram,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Toolzia — Free AI-Powered Tools for Creators",
  description:
    "Remove image backgrounds instantly, generate unique usernames, and craft perfect Instagram bios — all free, no signup required.",
};

const tools = [
  {
    icon: ImageIcon,
    label: "Background Remover",
    description:
      "Remove backgrounds from any image in seconds using cutting-edge AI. Perfect for product photos, portraits, and more.",
    href: "/tools/background-remover",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139, 92, 246, 0.15)",
    tag: "Most Popular",
  },
  {
    icon: AtSign,
    label: "Username Generator",
    description:
      "Generate hundreds of unique, creative usernames instantly. Find the perfect handle for any platform.",
    href: "/tools/username-generator",
    color: "from-sky-500 to-blue-600",
    glow: "rgba(14, 165, 233, 0.15)",
    tag: null,
  },
  {
    icon: Instagram,
    label: "Instagram Bio Generator",
    description:
      "Craft engaging Instagram bios that attract followers and express your unique personality with AI assistance.",
    href: "/tools/instagram-bio",
    color: "from-rose-500 to-pink-600",
    glow: "rgba(244, 63, 94, 0.15)",
    tag: "New",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run in real-time. No waiting, no queues.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your files never leave your browser. 100% private.",
  },
  {
    icon: Globe,
    title: "No Signup Needed",
    description: "Just open, use, and go. Zero friction.",
  },
  {
    icon: Sparkles,
    title: "AI Powered",
    description: "State-of-the-art models powering every tool.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-dark dark:bg-grid-dark bg-grid-light bg-grid dark:opacity-100 opacity-60" />
        <div className="absolute inset-0 bg-glow-green dark:opacity-100 opacity-40" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-green-400/10 bg-green-50 dark:border dark:border-green-400/20 border border-green-200 mb-8">
            <Sparkles size={12} className="text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400 font-body">
              Free AI Tools — No signup required
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-6">
            <span className="dark:text-white text-gray-900">Your Creative</span>
            <br />
            <span className="text-gradient">AI Toolkit</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Powerful AI tools for creators and developers. Remove backgrounds,
            generate usernames, craft Instagram bios — all in seconds, all for
            free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/background-remover"
              className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-base w-full sm:w-auto justify-center"
            >
              Start for Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#tools"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base dark:bg-white/5 bg-black/5 hover:dark:bg-white/10 hover:bg-black/10 transition-all w-full sm:w-auto justify-center font-medium"
            >
              Browse Tools
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: "100K+", label: "Images processed" },
              { value: "3", label: "AI-powered tools" },
              { value: "0", label: "Sign-ups needed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl dark:text-white text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--muted)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--muted)]" />
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl dark:text-white text-gray-900 mb-4">
              All Tools
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">
              Everything you need to create stunning content — powered by the
              latest AI models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative dark:bg-obsidian-800 bg-white rounded-2xl p-8 border border-[var(--border)] card-hover overflow-hidden"
                >
                  {/* Glow bg on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${tool.glow}, transparent 70%)`,
                    }}
                  />

                  {/* Tag */}
                  {tool.tag && (
                    <span className="absolute top-4 right-4 text-xs font-mono font-medium px-2.5 py-1 rounded-full dark:bg-green-400/10 bg-green-50 text-green-500 border dark:border-green-400/20 border-green-200">
                      {tool.tag}
                    </span>
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>

                    <h3 className="font-display font-semibold text-xl dark:text-white text-gray-900 mb-3">
                      {tool.label}
                    </h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    <div className="flex items-center gap-2 text-green-500 text-sm font-medium group-hover:gap-3 transition-all">
                      Use Tool <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 dark:bg-obsidian-800/30 bg-gray-50/50 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl dark:text-white text-gray-900 mb-4">
              Why Toolzia?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="dark:bg-obsidian-700/50 bg-white rounded-2xl p-6 border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-semibold dark:text-white text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative dark:bg-obsidian-800 bg-white rounded-3xl p-12 border border-[var(--border)] overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.2), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-green-500 mx-auto mb-6" />
              <h2 className="font-display font-bold text-4xl sm:text-5xl dark:text-white text-gray-900 mb-4">
                Ready to create?
              </h2>
              <p className="text-[var(--muted)] text-lg mb-8 max-w-lg mx-auto">
                Join thousands of creators using Toolzia to build better content
                faster.
              </p>
              <Link
                href="/tools/background-remover"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
