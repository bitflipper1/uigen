"use client";

import { useState } from "react";
import {
  CHARACTERS,
  EPISODE_COUNT,
  Team,
  TEAMS,
  effectiveTeam,
  hasAppeared,
} from "@/lib/hotd/data";
import { EpisodeSelector } from "./EpisodeSelector";
import { FamilyTree } from "./FamilyTree";
import { CharacterCard } from "./CharacterCard";
import { DragonGuide } from "./DragonGuide";
import { RivalryGraph } from "./RivalryGraph";
import { EpisodeNotes } from "./EpisodeNotes";
import { PreviouslyOn } from "./PreviouslyOn";
import { Panel, SectionHeading } from "./shared";

type TeamFilter = "all" | Team;

const FILTERS: { key: TeamFilter; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "black", label: "Team Black" },
  { key: "green", label: "Team Green" },
  { key: "neutral", label: "Unaligned" },
];

export function Dashboard() {
  // Initialize from a ?ep=N deep link so a given spoiler-safe state is shareable.
  const [watched, setWatched] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const raw = new URLSearchParams(window.location.search).get("ep");
      const n = raw ? parseInt(raw, 10) : NaN;
      if (!Number.isNaN(n)) return Math.min(EPISODE_COUNT, Math.max(1, n));
    }
    return 1;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<TeamFilter>("all");

  // Focus a character card: select it and scroll it into view.
  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (typeof document !== "undefined") {
      const el = document.getElementById(`char-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const introduced = CHARACTERS.filter((c) => hasAppeared(c, watched));
  const cards = introduced.filter((c) =>
    filter === "all" ? true : effectiveTeam(c, watched) === filter
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.amber.950/30),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400/70">
            Second-Screen Companion
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
            House of the Dragon
            <span className="ml-2 align-middle text-2xl">🐉</span>
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400">
            Who everyone is, how they&apos;re related, whose side they&apos;re on, and why
            they&apos;re angry — refreshed to exactly how far you&apos;ve watched, so nothing gets
            spoiled.
          </p>
        </header>

        <div className="mb-6">
          <EpisodeSelector watched={watched} onChange={setWatched} />
        </div>

        <div className="mb-6">
          <PreviouslyOn watched={watched} />
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="flex flex-col gap-6">
            <FamilyTree watched={watched} onSelect={handleSelect} selectedId={selectedId} />
            <RivalryGraph watched={watched} onSelect={handleSelect} />
          </div>

          <div className="flex flex-col gap-6">
            <Panel>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHeading
                  glyph="👤"
                  title="Character Cards"
                  subtitle={`${cards.length} of ${introduced.length} shown`}
                />
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={[
                        "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                        filter === f.key
                          ? "bg-amber-400/20 text-amber-100"
                          : "bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08]",
                        f.key !== "all" && filter !== f.key
                          ? TEAMS[f.key as Team].text
                          : "",
                      ].join(" ")}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {cards.map((c) => (
                  <CharacterCard
                    key={c.id}
                    character={c}
                    watched={watched}
                    onSelect={handleSelect}
                    selectedId={selectedId}
                  />
                ))}
              </div>
            </Panel>

            <DragonGuide watched={watched} />
            <EpisodeNotes watched={watched} />
          </div>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-4 text-center text-[11px] text-neutral-600">
          A fan-made “CliffsNotes” dashboard · Season {1} · Built with UIGen. Character and story
          details belong to their respective creators.
        </footer>
      </div>
    </div>
  );
}
