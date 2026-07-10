import { EPISODE_NOTES, episodeMeta } from "@/lib/hotd/data";
import { Panel, SectionHeading } from "./shared";

export function EpisodeNotes({ watched }: { watched: number }) {
  // Most recent episode first, only up to what's been watched.
  const notes = EPISODE_NOTES.filter((n) => n.episode <= watched).reverse();

  return (
    <Panel>
      <SectionHeading
        glyph="📖"
        title="Episode Cliff Notes"
        subtitle="An hour-long recap in a few lines"
      />

      <div className="flex flex-col gap-4">
        {notes.map((n) => {
          const m = episodeMeta(n.episode);
          return (
          <details
            key={n.episode}
            open={n.episode === watched}
            className="group rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
              <span className="flex h-7 shrink-0 items-center justify-center gap-0.5 rounded-full bg-amber-400/15 px-2 font-mono text-[11px] font-semibold text-amber-200">
                S{m.season}·E{m.episode}
              </span>
              <span className="flex-1 text-sm font-medium text-neutral-100">
                {m.title}
              </span>
              <span className="text-neutral-500 transition-transform group-open:rotate-90">
                ›
              </span>
            </summary>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 text-sm">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                  What changed
                </p>
                <ul className="flex list-disc flex-col gap-1 pl-4 text-neutral-300 marker:text-neutral-600">
                  {n.whatChanged.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              {n.deaths.length > 0 && (
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                    Important deaths
                  </p>
                  <ul className="flex flex-col gap-1 text-neutral-300">
                    {n.deaths.map((d, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden>⚰️</span>
                        <span>
                          <span className="font-medium text-neutral-100">{d.name}</span>
                          <span className="text-neutral-400"> — {d.how}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-lg border border-amber-400/15 bg-amber-400/[0.05] p-2.5">
                <p className="mb-0.5 font-mono text-[10px] uppercase tracking-wide text-amber-300/80">
                  Why it matters
                </p>
                <p className="text-neutral-200">{n.whyItMatters}</p>
              </div>
            </div>
          </details>
          );
        })}
      </div>
    </Panel>
  );
}
