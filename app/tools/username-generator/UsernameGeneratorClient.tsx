"use client";

import { useState } from "react";
import {
  RefreshCw,
  Copy,
  CheckCheck,
  AtSign,
  Loader2,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import ToolPageHeader from "@/components/ToolPageHeader";

const styles = [
  { value: "cool", label: "🔥 Cool & Edgy" },
  { value: "cute", label: "🌸 Cute & Fun" },
  { value: "pro", label: "💼 Professional" },
  { value: "gamer", label: "🎮 Gamer" },
  { value: "creative", label: "🎨 Creative" },
];

const platforms = [
  { value: "any", label: "Any Platform" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter/X" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitch", label: "Twitch" },
];

export default function UsernameGeneratorClient() {
  const [keyword, setKeyword] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cool");
  const [selectedPlatform, setSelectedPlatform] = useState("any");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUsernames = async () => {
    setLoading(true);
    setUsernames([]);

    const prompt = `Generate 12 unique, creative usernames for someone with the keyword "${keyword || "creative"}" in a "${selectedStyle}" style for ${selectedPlatform === "any" ? "any platform" : selectedPlatform}.

Rules:
- Mix of formats: word combinations, with numbers, with underscores
- Keep them under 20 characters
- No spaces, special chars except _ and .
- Make them memorable and brandable
- Vary the format across suggestions

Return ONLY a JSON array of 12 username strings, nothing else. Example: ["username1","username2",...]`;

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
      const parsed: string[] = JSON.parse(clean);
      setUsernames(parsed.slice(0, 12));
    } catch (err) {
      console.error(err);
      // Fallback usernames if API fails
      const base = keyword || "creator";
      setUsernames([
        `${base}_official`,
        `the_${base}`,
        `${base}xyz`,
        `${base}hq`,
        `real${base}`,
        `${base}studio`,
        `${base}pro`,
        `im${base}`,
        `${base}world`,
        `${base}vibes`,
        `${base}creates`,
        `just${base}`,
      ]);
    }

    setLoading(false);
  };

  const copyUsername = async (username: string, idx: number) => {
    await navigator.clipboard.writeText(username);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <ToolPageHeader
          icon="@"
          title="Username Generator"
          description="Generate unique, creative usernames for any platform. Powered by AI to give you names that are memorable, available, and match your vibe."
          badge="AI-Powered"
        />

        {/* Config panel */}
        <div className="dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] p-6 mb-6 space-y-6">
          {/* Keyword input */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">
              Keyword or Name (optional)
            </label>
            <div className="relative">
              <AtSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. ninja, luna, pixel..."
                className="w-full pl-9 pr-4 py-3 rounded-xl dark:bg-obsidian-700 bg-gray-50 border border-[var(--border)] text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all placeholder:text-[var(--muted)]"
                onKeyDown={(e) => e.key === "Enter" && generateUsernames()}
              />
            </div>
          </div>

          {/* Style picker */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-3">
              Style
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSelectedStyle(s.value)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedStyle === s.value
                      ? "dark:bg-green-400/15 bg-green-50 text-green-600 dark:text-green-400 border dark:border-green-400/30 border-green-300"
                      : "dark:bg-white/5 bg-black/5 text-[var(--muted)] border border-transparent hover:border-[var(--border)]"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform picker */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-3">
              Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setSelectedPlatform(p.value)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedPlatform === p.value
                      ? "dark:bg-green-400/15 bg-green-50 text-green-600 dark:text-green-400 border dark:border-green-400/30 border-green-300"
                      : "dark:bg-white/5 bg-black/5 text-[var(--muted)] border border-transparent hover:border-[var(--border)]"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generateUsernames}
            disabled={loading}
            className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Usernames
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {usernames.length > 0 && (
          <div className="dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold dark:text-white text-gray-900">
                Generated Usernames
              </h3>
              <button
                onClick={generateUsernames}
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {usernames.map((username, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-3 rounded-xl dark:bg-obsidian-700/50 bg-gray-50 border border-[var(--border)] hover:border-green-500/30 transition-all"
                >
                  <span className="font-mono text-sm dark:text-white text-gray-800">
                    @{username}
                  </span>
                  <button
                    onClick={() => copyUsername(username, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted)] hover:text-green-500"
                    aria-label="Copy username"
                  >
                    {copiedIndex === idx ? (
                      <CheckCheck size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
