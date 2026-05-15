import type { Metadata } from "next";
import UsernameGeneratorClient from "./UsernameGeneratorClient";

export const metadata: Metadata = {
  title: "Username Generator — Create Unique Usernames Instantly",
  description:
    "Generate hundreds of unique, creative usernames in seconds. Perfect for social media, gaming, and more. Free, no signup required.",
  keywords: [
    "username generator",
    "unique username",
    "social media username",
    "gaming username",
    "free username generator",
  ],
};

export default function UsernameGeneratorPage() {
  return <UsernameGeneratorClient />;
}
