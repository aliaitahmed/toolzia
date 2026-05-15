import Link from "next/link";
import { Zap, Github, Twitter } from "lucide-react";

const tools = [
  { label: "Background Remover", href: "/tools/background-remover" },
  { label: "Username Generator", href: "/tools/username-generator" },
  { label: "Instagram Bio Generator", href: "/tools/instagram-bio" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] dark:bg-obsidian-800/50 bg-gray-50/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Tool<span className="text-gradient">zia</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Free AI-powered tools for creators and developers. No signup, no
              watermarks, no limits.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/toolzia"
                className="w-8 h-8 rounded-lg dark:bg-white/5 bg-black/5 flex items-center justify-center text-[var(--muted)] hover:text-green-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={14} />
              </a>
              <a
                href="https://github.com/toolzia"
                className="w-8 h-8 rounded-lg dark:bg-white/5 bg-black/5 flex items-center justify-center text-[var(--muted)] hover:text-green-500 transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-[var(--muted)] hover:text-green-500 transition-colors"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--muted)] hover:text-green-500 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Toolzia. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Built with ❤️ for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
