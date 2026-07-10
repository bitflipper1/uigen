import {
  DRAGONS,
  Dragon,
  charById,
  currentRiderId,
  effectiveTeam,
} from "@/lib/hotd/data";
import { Panel, SectionHeading, TeamBadge } from "./shared";

function riderName(d: Dragon, watched: number): { name: string; team: ReturnType<typeof effectiveTeam> | null } {
  const rid = currentRiderId(d, watched);
  if (!rid) return { name: "Riderless", team: null };
  const c = charById(rid);
  if (!c) return { name: "Unknown", team: null };
  return { name: c.name, team: effectiveTeam(c, watched) };
}

export function DragonGuide({ watched }: { watched: number }) {
  // Only show dragons that have appeared (have a rider entry) by this episode,
  // plus keep them ordered by size/importance as authored.
  const visible = DRAGONS.filter((d) =>
    d.riderHistory.some((r) => r.fromEpisode <= watched)
  );

  return (
    <Panel>
      <SectionHeading glyph="🐉" title="Dragon Guide" subtitle="Riders and their mounts" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-wide text-neutral-500">
              <th className="pb-2 pr-4 font-normal">Dragon</th>
              <th className="pb-2 pr-4 font-normal">Rider</th>
              <th className="pb-2 pr-4 font-normal">Team</th>
              <th className="pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((d) => {
              const dead = d.deathEpisode !== undefined && d.deathEpisode <= watched;
              const { name, team } = riderName(d, watched);
              return (
                <tr key={d.id} className="border-t border-white/10 align-top">
                  <td className="py-2.5 pr-4">
                    <span className={dead ? "text-neutral-500 line-through" : "font-medium text-neutral-100"}>
                      {d.name}
                    </span>
                    {d.notes && (
                      <span className="block text-[11px] text-neutral-500">{d.notes}</span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4 text-neutral-200">{name}</td>
                  <td className="py-2.5 pr-4">
                    {team ? <TeamBadge team={team} /> : <span className="text-neutral-600">—</span>}
                  </td>
                  <td className="py-2.5">
                    {dead ? (
                      <span className="text-neutral-400">⚰️ Slain</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-400" /> Alive
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
