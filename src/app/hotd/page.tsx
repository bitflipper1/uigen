import type { Metadata } from "next";
import { Dashboard } from "@/components/hotd/Dashboard";

export const metadata: Metadata = {
  title: "House of the Dragon — Companion",
  description:
    "A spoiler-safe second-screen companion for House of the Dragon: family tree, character cards, alliances, dragons, and episode recaps up to how far you've watched.",
};

export default function HotdPage() {
  return <Dashboard />;
}
