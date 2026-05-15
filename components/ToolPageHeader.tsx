interface ToolPageHeaderProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export default function ToolPageHeader({
  icon,
  title,
  description,
  badge,
}: ToolPageHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl dark:bg-white/5 bg-black/5 border border-[var(--border)] text-3xl mb-6">
        {icon}
      </div>

      {badge && (
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full dark:bg-green-400/10 bg-green-50 dark:border dark:border-green-400/20 border border-green-200 text-green-600 dark:text-green-400">
            ✦ {badge}
          </span>
        </div>
      )}

      <h1 className="font-display font-bold text-4xl sm:text-5xl dark:text-white text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}
