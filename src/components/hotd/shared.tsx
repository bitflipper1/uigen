import { cn } from "@/lib/utils";
import { Character, TEAMS, Team, effectiveTeam, isDead } from "@/lib/hotd/data";

/** A round portrait chip with the character's initials, team ring, and status. */
export function Portrait({
  character,
  watched,
  size = "md",
}: {
  character: Character;
  watched: number;
  size?: "sm" | "md" | "lg";
}) {
  const team = effectiveTeam(character, watched);
  const dead = isDead(character, watched);
  const dims =
    size === "lg"
      ? "size-12 text-base"
      : size === "sm"
        ? "size-8 text-[11px]"
        : "size-10 text-sm";

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold ring-2",
          dims,
          TEAMS[team].dot,
          TEAMS[team].ring,
          "text-white",
          dead && "opacity-60 grayscale"
        )}
      >
        {character.initials}
      </div>
      {dead && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[9px] ring-2 ring-neutral-800"
          title="Deceased"
        >
          ⚰️
        </span>
      )}
      {character.dragonId && !dead && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[9px] ring-2 ring-neutral-800"
          title="Dragonrider"
        >
          🐉
        </span>
      )}
    </div>
  );
}

/** Small pill showing a team label with its color dot. */
export function TeamBadge({ team, className }: { team: Team; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium",
        TEAMS[team].text,
        className
      )}
    >
      <span className={cn("size-2 rounded-full", TEAMS[team].dot)} />
      {TEAMS[team].label}
    </span>
  );
}

/** Section heading with an emoji glyph and a title. */
export function SectionHeading({
  glyph,
  title,
  subtitle,
}: {
  glyph: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="text-2xl leading-none" aria-hidden>
        {glyph}
      </span>
      <div>
        <h2 className="font-mono text-lg font-semibold tracking-tight text-amber-100">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
      </div>
    </div>
  );
}

/** A framed panel used for each dashboard section. */
export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-neutral-900/60 p-5 shadow-xl backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}
