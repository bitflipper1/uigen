import {
  Character,
  charById,
  dragonById,
  effectiveTeam,
  isDead,
  lastSeen,
} from "@/lib/hotd/data";
import { Portrait, TeamBadge } from "./shared";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <span className="text-neutral-200">{children}</span>
    </div>
  );
}

export function CharacterCard({
  character,
  watched,
  onSelect,
  selectedId,
}: {
  character: Character;
  watched: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const team = effectiveTeam(character, watched);
  const dead = isDead(character, watched);
  const seen = lastSeen(character, watched);
  const dragon = character.dragonId ? dragonById(character.dragonId) : undefined;
  const active = selectedId === character.id;
  // Only show relationships that have come to pass by the watched episode.
  const relationships = character.relationships.filter(
    (r) => (r.fromEpisode ?? 1) <= watched
  );

  return (
    <div
      id={`char-${character.id}`}
      className={[
        "flex flex-col gap-3 rounded-2xl border bg-neutral-900/60 p-4 transition-colors",
        active ? "border-amber-400/60 ring-1 ring-amber-400/30" : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <Portrait character={character} watched={watched} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-neutral-50">{character.name}</h3>
          <p className="text-[11px] text-neutral-500">House {character.house}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <TeamBadge team={team} />
            {dead && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-neutral-400">
                ⚰️ Deceased
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Row label="Claim">{character.claim}</Row>
        {dragon && (
          <Row label="Dragon">
            🐉 {dragon.name}
          </Row>
        )}
        <Row label="Goal">{character.goal}</Row>
      </div>

      {relationships.length > 0 && (
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
            Relationships
          </span>
          <div className="mt-1 flex flex-col gap-0.5">
            {relationships.map((r) => {
              const other = charById(r.toId);
              if (!other) return null;
              return (
                <button
                  key={r.toId + r.label}
                  onClick={() => onSelect(r.toId)}
                  className="text-left text-xs text-neutral-300 hover:text-amber-200"
                >
                  <span className="text-neutral-500">{r.label} </span>
                  <span className="underline decoration-white/20 underline-offset-2">
                    {other.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
          Last seen
        </span>
        <p className="mt-0.5 text-xs leading-relaxed text-neutral-300">
          {dead && character.deathNote
            ? character.deathNote
            : seen
              ? seen.note
              : "Not yet introduced at this point in the season."}
        </p>
      </div>
    </div>
  );
}
