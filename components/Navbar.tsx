"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Zap, Menu, X } from "lucide-react";
import clsx from "clsx";

const tools = [
  { label: "Background Remover", href: "/tools/background-remover" },
  { label: "Username Generator", href: "/tools/username-generator" },
  { label: "Instagram Bio", href: "/tools/instagram-bio" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "dark:bg-obsidian-900/80 bg-white/80 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-green-500/30 transition-shadow">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-700 text-xl tracking-tight">
            Tool<span className="text-gradient">zia</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === "/"
                ? "dark:text-green-400 text-green-600 dark:bg-green-400/10 bg-green-50"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:dark:bg-white/5 hover:bg-black/5"
            )}
          >
            Home
          </Link>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === tool.href
                  ? "dark:text-green-400 text-green-600 dark:bg-green-400/10 bg-green-50"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:dark:bg-white/5 hover:bg-black/5"
              )}
            >
              {tool.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] dark:hover:bg-white/10 hover:bg-black/5 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <Link
            href="/tools/background-remover"
            className="hidden md:flex btn-primary px-5 py-2 rounded-lg text-sm items-center gap-2"
          >
            Try Free
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] dark:hover:bg-white/10 hover:bg-black/5 transition-all"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden dark:bg-obsidian-800/95 bg-white/95 backdrop-blur-xl border-b border-[var(--border)] px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                pathname === "/"
                  ? "dark:text-green-400 text-green-600 dark:bg-green-400/10 bg-green-50"
                  : "text-[var(--muted)]"
              )}
            >
              Home
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  pathname === tool.href
                    ? "dark:text-green-400 text-green-600 dark:bg-green-400/10 bg-green-50"
                    : "text-[var(--muted)]"
                )}
              >
                {tool.label}
              </Link>
            ))}
            <Link
              href="/tools/background-remover"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 px-5 py-2.5 rounded-lg text-sm text-center"
            >
              Try Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
