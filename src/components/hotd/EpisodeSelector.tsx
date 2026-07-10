import { EPISODE_COUNT, EPISODE_TITLES, SEASON } from "@/lib/hotd/data";

export function EpisodeSelector({
  watched,
  onChange,
}: {
  watched: number;
  onChange: (ep: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4 backdrop-blur">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
            Spoiler-safe up to
          </span>
          <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-xs font-semibold text-amber-200">
            S{SEASON} · E{watched}
          </span>
        </div>
        <span className="text-xs text-neutral-400">
          “{EPISODE_TITLES[watched - 1]}”
        </span>
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

      <div className="mt-2 flex justify-between gap-1">
        {Array.from({ length: EPISODE_COUNT }, (_, i) => i + 1).map((ep) => (
          <button
            key={ep}
            onClick={() => onChange(ep)}
            className={[
              "flex size-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors",
              ep <= watched
                ? "bg-amber-400/20 text-amber-100"
                : "bg-white/[0.03] text-neutral-600 hover:bg-white/[0.08]",
            ].join(" ")}
            title={`Episode ${ep}: ${EPISODE_TITLES[ep - 1]}`}
          >
            {ep}
          </button>
        ))}
      </div>

      <p className="mt-2 text-[11px] text-neutral-500">
        Drag to how far you&apos;ve watched — deaths, allegiances, and recaps stay hidden beyond
        this point.
      </p>
    </div>
  );
}
