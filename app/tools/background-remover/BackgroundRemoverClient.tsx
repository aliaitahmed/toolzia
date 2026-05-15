"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Download,
  ImageIcon,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import ToolPageHeader from "@/components/ToolPageHeader";

type Status = "idle" | "loading" | "success" | "error";

export default function BackgroundRemoverClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (PNG, JPG, WEBP).");
      setStatus("error");
      return;
    }

    const originalObjectUrl = URL.createObjectURL(file);
    setOriginalUrl(originalObjectUrl);
    setResultUrl(null);
    setStatus("loading");
    setProgress("Loading AI model...");

    try {
      const { removeBackground } = await import("@imgly/background-removal");

      setProgress("Analyzing image...");
      const result = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (key.startsWith("fetch")) {
            const pct = Math.round((current / total) * 100);
            setProgress(`Downloading model: ${pct}%`);
          } else {
            setProgress("Removing background...");
          }
        },
      });

      const resultObjectUrl = URL.createObjectURL(result);
      setResultUrl(resultObjectUrl);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong processing your image. Please try again.");
      setStatus("error");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImage(file);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "toolzia-removed-bg.png";
    a.click();
  };

  const reset = () => {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setErrorMsg("");
    setProgress("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ToolPageHeader
          icon="🖼️"
          title="Background Remover"
          description="Remove backgrounds from any image instantly using AI. Supports PNG, JPG, and WebP. Runs 100% in your browser — your images stay private."
          badge="Powered by @imgly/background-removal"
        />

        {/* Upload zone */}
        {status === "idle" && (
          <div
            className={clsx(
              "drag-zone rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 dark:bg-obsidian-800/50 bg-white",
              isDragging && "active"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
              <Upload size={28} className="text-white" />
            </div>
            <h3 className="font-display font-semibold text-xl dark:text-white text-gray-900 mb-2">
              Drop your image here
            </h3>
            <p className="text-[var(--muted)] mb-4">
              or click to browse — PNG, JPG, WEBP supported
            </p>
            <span className="text-xs text-[var(--muted)] dark:bg-white/5 bg-black/5 px-3 py-1.5 rounded-full">
              Max 10MB • Processed in your browser
            </span>
          </div>
        )}

        {/* Loading state */}
        {status === "loading" && (
          <div className="dark:bg-obsidian-800 bg-white rounded-3xl border border-[var(--border)] p-16 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
                <Loader2 size={32} className="text-green-500 animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
            </div>
            <h3 className="font-display font-semibold text-xl dark:text-white text-gray-900 mb-2">
              Processing your image
            </h3>
            <p className="text-[var(--muted)] text-sm">{progress}</p>
            <p className="text-xs text-[var(--muted)] mt-4 max-w-xs">
              The AI model runs locally in your browser. First load may take a
              moment to download.
            </p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="dark:bg-obsidian-800 bg-white rounded-3xl border border-red-500/30 p-16 flex flex-col items-center justify-center text-center">
            <AlertCircle size={40} className="text-red-500 mb-4" />
            <h3 className="font-display font-semibold text-xl dark:text-white text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-[var(--muted)] mb-6">{errorMsg}</p>
            <button
              onClick={reset}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Result */}
        {status === "success" && originalUrl && resultUrl && (
          <div className="space-y-6">
            {/* Success banner */}
            <div className="flex items-center gap-3 p-4 dark:bg-green-400/10 bg-green-50 border dark:border-green-400/20 border-green-200 rounded-2xl">
              <CheckCircle size={18} className="text-green-500 shrink-0" />
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                Background removed successfully!
              </span>
              <button
                onClick={reset}
                className="ml-auto text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Before / After */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
                  <ImageIcon size={14} className="text-[var(--muted)]" />
                  <span className="text-sm font-medium dark:text-white text-gray-700">
                    Original
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full object-contain max-h-80"
                />
              </div>

              <div className="dark:bg-obsidian-800 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
                  <Sparkles size={14} className="text-green-500" />
                  <span className="text-sm font-medium dark:text-white text-gray-700">
                    Background Removed
                  </span>
                </div>
                <div
                  className="w-full max-h-80 flex items-center justify-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultUrl}
                    alt="Result"
                    className="w-full object-contain max-h-80"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base flex-1"
              >
                <Download size={16} />
                Download PNG
              </button>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base dark:bg-white/5 bg-black/5 hover:dark:bg-white/10 hover:bg-black/10 transition-all font-medium"
              >
                Remove Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
