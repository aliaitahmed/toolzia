"use client";

import { useState } from "react";
import {
  Copy,
  CheckCheck,
  Loader2,
  Sparkles,
  RefreshCw,
  Instagram,
} from "lucide-react";
import clsx from "clsx";
import ToolPageHeader from "@/components/ToolPageHeader";

const vibes = [
  { value: "professional", label: "💼 Professional" },
  { value: "funny", label: "😂 Funny & Witty" },
  { value: "aesthetic", label: "✨ Aesthetic" },
  { value: "motivational", label: "🔥 Motivational" },
  { value: "minimalist", label: "🤍 Minimalist" },
  { value: "creative", label: "🎨 Creative" },
];

const niches = [
  "Lifestyle",
  "Fitness",
  "Travel",
  "Food",
  "Fashion",
  "Tech",
  "Art",
  "Business",
  "Music",
  "Gaming",
  "Beauty",
  "Photography",
];

interface BioResult {
  bio: string;
  emojis: string;
}

export default function InstagramBioClient() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [vibe, setVibe] = useState("aesthetic");
  const [keywords, setKeywords] = useState("");
  const [bios, setBios] = useState<BioResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateBios = async () => {
    setLoading(true);
    setBios([]);

    const selectedNiche = customNiche || niche || "lifestyle";

    const prompt = `Generate 4 unique Instagram bios for:
- Name: ${name || "a creator"}
- Niche: ${selectedNiche}
- Vibe: ${vibe}
- Keywords/interests: ${keywords || "not specified"}

Each bio must:
- Be under 150 characters
- Feel authentic and on-brand for the vibe
- Include relevant emojis naturally
- Have a clear hook or personality
- Optionally end with a subtle CTA or link prompt

Return ONLY a JSON array of 4 objects with "bio" and "emojis" fields. No markdown.
Example: [{"bio":"Full bio text here 🎯","emojis":"🎯✨"}]`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed: BioResult[] = JSON.parse(clean);
      setBios(parsed.slice(0, 4));
    } catch (err) {
      console.error(err);
      // Fallback
      setBios([
        {
          bio: `✨ ${name || "Creator"} | ${selectedNiche} enthusiast\n📍 Living life one day at a time\n👇 Check my latest`,
          emojis: "✨📍👇",
        },
        {
          bio: `${selectedNiche} | ${name || "Creator"} 🎯\nTurning passion into purpose\n🔗 Link below`,
          emojis: "🎯🔗",
        },
        {
          bio: `🌟 ${name || "Creative"} doing ${selectedNiche} differently\nBuilding something beautiful\nDM for collabs 📩`,
          emojis: "🌟📩",
        },
        {
          bio: `${name || "Creator"} ⚡ ${selectedNiche}\nContent that inspires\nFollow for daily posts ✅`,
          emojis: "⚡✅",
        },
      ]);
    }

    setLoading(false);
  };

  const copyBio = async (bio: string, idx: number) => {
    await navigator.clipboard.writeText(bio);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <ToolPageHeader
          icon="📸"
          title="Instagram Bio Generator"
          description="Craft the perfect Instagram bio that attracts followers and captures your personality. AI-powered bios tailored to your niche and vibe."
          badge="Claude AI Powered"
        />

        {/* Form */}
        <div className="dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] p-6 mb-6 space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex, Luna Design..."
                className="w-full px-4 py-3 rounded-xl dark:bg-obsidian-700 bg-gray-50 border border-[var(--border)] text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all placeholder:text-[var(--muted)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
                Keywords / Interests (optional)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. coffee, travel, minimalism..."
                className="w-full px-4 py-3 rounded-xl dark:bg-obsidian-700 bg-gray-50 border border-[var(--border)] text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all placeholder:text-[var(--muted)]"
              />
            </div>
          </div>

          {/* Niche */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-3">
              Niche
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {niches.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setNiche(n);
                    setCustomNiche("");
                  }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm transition-all",
                    niche === n && !customNiche
                      ? "dark:bg-rose-400/15 bg-rose-50 text-rose-600 dark:text-rose-400 border dark:border-rose-400/30 border-rose-300"
                      : "dark:bg-white/5 bg-black/5 text-[var(--muted)] border border-transparent hover:border-[var(--border)]"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customNiche}
              onChange={(e) => {
                setCustomNiche(e.target.value);
                setNiche("");
              }}
              placeholder="Or type your own niche..."
              className="w-full px-4 py-2.5 rounded-xl dark:bg-obsidian-700 bg-gray-50 border border-[var(--border)] text-sm focus:outline-none focus:border-rose-500/50 transition-all placeholder:text-[var(--muted)]"
            />
          </div>

          {/* Vibe */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-3">
              Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {vibes.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVibe(v.value)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    vibe === v.value
                      ? "dark:bg-green-400/15 bg-green-50 text-green-600 dark:text-green-400 border dark:border-green-400/30 border-green-300"
                      : "dark:bg-white/5 bg-black/5 text-[var(--muted)] border border-transparent hover:border-[var(--border)]"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateBios}
            disabled={loading}
            className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Crafting your bios...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Instagram Bios
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {bios.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold dark:text-white text-gray-900 flex items-center gap-2">
                <Instagram size={18} className="text-rose-500" />
                Your Bios
              </h3>
              <button
                onClick={generateBios}
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
            </div>

            {bios.map((item, idx) => (
              <div
                key={idx}
                className="group dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] hover:border-rose-500/30 transition-all p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[var(--muted)] dark:bg-white/5 bg-black/5 px-2 py-0.5 rounded">
                        Option {idx + 1}
                      </span>
                      <span className="text-xs text-[var(--muted)]">
                        {item.bio.length} / 150 chars
                      </span>
                    </div>
                    <p className="text-sm dark:text-white text-gray-800 whitespace-pre-line leading-relaxed">
                      {item.bio}
                    </p>
                  </div>
                  <button
                    onClick={() => copyBio(item.bio, idx)}
                    className="shrink-0 w-9 h-9 rounded-lg dark:bg-white/5 bg-black/5 flex items-center justify-center text-[var(--muted)] hover:text-green-500 transition-all"
                    aria-label="Copy bio"
                  >
                    {copiedIndex === idx ? (
                      <CheckCheck size={15} className="text-green-500" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
