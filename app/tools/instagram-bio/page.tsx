import type { Metadata } from "next";
import InstagramBioClient from "./InstagramBioClient";

export const metadata: Metadata = {
  title: "Instagram Bio Generator — Craft the Perfect IG Bio",
  description:
    "Generate engaging Instagram bios in seconds with AI. Stand out, attract followers, and express your personality. Free, no signup required.",
  keywords: [
    "instagram bio generator",
    "IG bio",
    "Instagram profile bio",
    "AI bio generator",
    "creative Instagram bio",
  ],
};

export default function InstagramBioPage() {
  return <InstagramBioClient />;
}
