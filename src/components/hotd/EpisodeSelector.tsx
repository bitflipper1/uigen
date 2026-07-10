import { EPISODE_COUNT, SEASONS, episodeMeta } from "@/lib/hotd/data";

export function EpisodeSelector({
  watched,
  onChange,
}: {
  watched: number;
  onChange: (ep: number) => void;
}) {
  const meta = episodeMeta(watched);

  // Global index of the first episode of each season (S1 -> 1, S2 -> 11, ...).
  const seasonBase: number[] = [];
  SEASONS.reduce((acc, s, i) => {
    seasonBase[i] = acc + 1;
    return acc + s.titles.length;
  }, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4 backdrop-blur">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
            Spoiler-safe up to
          </span>
          <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-xs font-semibold text-amber-200">
            S{meta.season} · E{meta.episode}
          </span>
        </div>
        <span className="text-xs text-neutral-400">“{meta.title}”</span>
      </div>

      <input
        type="range"
        min={1}
        max={EPISODE_COUNT}
        value={watched}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Episodes watched"
        className="mt-3 w-full accent-amber-400"
      />

      <div className="mt-3 flex flex-col gap-2">
        {SEASONS.map((s, si) => (
          <div key={s.season} className="flex items-center gap-2">
            <span className="w-7 shrink-0 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
              S{s.season}
            </span>
            <div className="flex flex-wrap gap-1">
              {s.titles.map((title, i) => {
                const ep = seasonBase[si] + i;
                return (
                  <button
                    key={ep}
                    onClick={() => onChange(ep)}
                    className={[
                      "flex size-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors",
                      ep === watched
                        ? "bg-amber-400/40 text-amber-50 ring-1 ring-amber-300"
                        : ep < watched
                          ? "bg-amber-400/15 text-amber-100"
                          : "bg-white/[0.03] text-neutral-600 hover:bg-white/[0.08]",
                    ].join(" ")}
                    title={`S${s.season} E${i + 1}: ${title}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[11px] text-neutral-500">
        Drag to how far you&apos;ve watched — deaths, allegiances, and recaps stay hidden beyond
        this point.
      </p>
    </div>
  );
}
