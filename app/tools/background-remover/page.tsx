import type { Metadata } from "next";
import BackgroundRemoverClient from "./BackgroundRemoverClient";

export const metadata: Metadata = {
  title: "Background Remover — Remove Image Backgrounds Instantly",
  description:
    "Remove backgrounds from any image in seconds using AI. Free, no signup required. Perfect for product photos, portraits, and more.",
  keywords: [
    "background remover",
    "remove background",
    "AI background removal",
    "free background remover",
  ],
};

export default function BackgroundRemoverPage() {
  return <BackgroundRemoverClient />;
}
