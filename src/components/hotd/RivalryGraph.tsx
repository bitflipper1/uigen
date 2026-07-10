import { RIVALRIES, charById } from "@/lib/hotd/data";
import { Panel, SectionHeading } from "./shared";

export function RivalryGraph({
  watched,
  onSelect,
}: {
  watched: number;
  onSelect: (id: string) => void;
}) {
  const visible = RIVALRIES.filter((r) => r.knownFrom <= watched);

  return (
    <Panel>
      <SectionHeading
        glyph="⚔️"
        title="Who Hates Whom"
        subtitle="Grudges and alliances, as revealed so far"
      />

      {visible.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No open grudges yet — the court is still all smiles.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((r) => {
            const from = charById(r.fromId);
            const to = charById(r.toId);
            if (!from || !to) return null;
            const hostile = r.kind === "hostile";
            return (
              <li
                key={r.fromId + r.label + r.toId}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <button
                  onClick={() => onSelect(from.id)}
                  className="font-medium text-neutral-100 hover:text-amber-200"
                >
                  {from.name.split(" ")[0]}
                </button>
                <span
                  className={[
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                    hostile
                      ? "bg-red-500/15 text-red-300"
                      : "bg-emerald-500/15 text-emerald-300",
                  ].join(" ")}
                >
                  {hostile ? "↓" : "→"} {r.label}
                </span>
                <button
                  onClick={() => onSelect(to.id)}
                  className="font-medium text-neutral-100 hover:text-amber-200"
                >
                  {to.name.split(" ")[0]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
