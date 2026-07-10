import { episodeMeta } from "@/lib/hotd/data";
import { Panel, SectionHeading } from "./shared";

// A five-minute "state of play" snapshot for the most recent episode watched.
// Keyed by episode; the UI picks the latest snapshot <= watched.
interface Snapshot {
  youAreHere: string;
  blackControls: string;
  greenControls: string;
  daemon: string;
  conflicts: string[];
}

const SNAPSHOTS: Record<number, Snapshot> = {
  1: {
    youAreHere: "Viserys reigns; he has just named Rhaenyra his heir over his brother Daemon.",
    blackControls: "Rhaenyra holds the title of heir — but little real power of her own.",
    greenControls: "The Hightowers hold the King's ear through Otto, the Hand.",
    daemon: "Sulking away from court after being passed over for the succession.",
    conflicts: [
      "Can a female heir actually hold the throne when the King dies?",
      "Daemon vs. Otto Hightower for the King's favor.",
      "The realm's lords quietly doubt Rhaenyra.",
    ],
  },
  3: {
    youAreHere: "Viserys has remarried and reaffirmed Rhaenyra, but the court is uneasy.",
    blackControls: "Rhaenyra, still heir; Daemon now a war hero of the Stepstones.",
    greenControls: "Alicent, the new Queen, and her father Otto shape the King's council.",
    daemon: "Victorious in the Stepstones and styling himself King of the Narrow Sea.",
    conflicts: [
      "Pressure on Viserys to disinherit Rhaenyra for his trueborn son.",
      "The Velaryons feel snubbed by the crown.",
      "Rhaenyra and Alicent's friendship is cooling fast.",
    ],
  },
  5: {
    youAreHere: "Rhaenyra has wed Laenor Velaryon; Alicent has openly broken with her.",
    blackControls: "Rhaenyra, now allied by marriage to the wealthy Velaryons.",
    greenControls: "Alicent, the Hightowers, and now Ser Criston Cole.",
    daemon: "Widowed and restless, orbiting back toward Rhaenyra.",
    conflicts: [
      "Alicent vs. Rhaenyra — the friendship is now a rivalry.",
      "Criston Cole's shame turns him into a Green partisan.",
      "Whose blood will sit the throne after Viserys.",
    ],
  },
  7: {
    youAreHere:
      "A decade on: two rival broods of children, and the great dragon Vhagar now answers to a Green.",
    blackControls: "Rhaenyra and Daemon (now married), their sons, and the Velaryon fleet.",
    greenControls: "Alicent, her three children, Otto, Criston, and Vhagar via Aemond.",
    daemon: "Married to Rhaenyra and fully committed to her claim.",
    conflicts: [
      "The parentage of Rhaenyra's sons undermines their claim.",
      "Aemond's lost eye — a wound both families will not forget.",
      "Vhagar in Green hands tilts any future war.",
    ],
  },
  8: {
    youAreHere: "Viserys is dead. Both sides believe the throne is theirs.",
    blackControls: "Rhaenyra's faction on Dragonstone, backed by the Velaryons.",
    greenControls: "The Red Keep, the small council, and the City Watch.",
    daemon: "At Rhaenyra's side, itching to strike first.",
    conflicts: [
      "Two claimants, one throne, and no King to keep the peace.",
      "Alicent believes Viserys changed his mind on his deathbed.",
      "Whoever moves first controls King's Landing.",
    ],
  },
  9: {
    youAreHere: "The Greens have crowned Aegon II in secret. Rhaenyra does not yet know.",
    blackControls: "Dragonstone, the Velaryon fleet, and most of the realm's dragons.",
    greenControls: "King's Landing, the Iron Throne, and King Aegon II.",
    daemon: "Preparing Dragonstone's defenses, unaware of the coronation.",
    conflicts: [
      "A usurpation is now fact — there are two monarchs.",
      "Rhaenys spared the Greens; will she regret it?",
      "Which great houses will each side win to their cause?",
    ],
  },
  10: {
    youAreHere:
      "Rhaenyra is crowned Queen at Dragonstone — and her son Lucerys has been killed. War is here.",
    blackControls: "Dragonstone, the largest dragons, and the Velaryon and (soon) northern support.",
    greenControls: "The capital, the Iron Throne, and Vhagar.",
    daemon: "Consort to Queen Rhaenyra, hungry for vengeance on Aemond.",
    conflicts: [
      "The Dance of the Dragons has begun — no peace is possible now.",
      "Aemond killed Lucerys; the Blacks will demand blood.",
      "Which side can rally more dragons and swords first.",
    ],
  },
  11: {
    youAreHere:
      "A son for a son: Blood and Cheese have murdered Aegon's heir, and the war turns savage.",
    blackControls: "Dragonstone, most of the dragons, and now pledges from the North and the Vale.",
    greenControls: "King's Landing and the Iron Throne — but a court baying for revenge.",
    daemon: "Estranged from Rhaenyra after ordering the murder that horrified her.",
    conflicts: [
      "Rhaenyra is blamed for a child-killing she never sanctioned.",
      "Aegon wants to answer with fire; his council wants patience.",
      "Both sides scramble to win the great houses to their banners.",
    ],
  },
  14: {
    youAreHere:
      "Rook's Rest: the first great dragon-battle has cost the Blacks Rhaenys — and burned King Aegon.",
    blackControls: "Dragonstone and the fleet, but now down a dragon and its finest rider.",
    greenControls: "The capital and the field at Rook's Rest — at a terrible price.",
    daemon: "Adrift at Harrenhal, lost in visions while the war rages without him.",
    conflicts: [
      "Aemond burned his own brother — who truly rules the Greens now?",
      "Rhaenyra has lost Rhaenys and is outmatched in dragons.",
      "Grief and paranoia harden both queens against any peace.",
    ],
  },
  15: {
    youAreHere:
      "Aemond rules as regent over a comatose Aegon, while Rhaenyra gambles on lowborn dragonriders.",
    blackControls: "Dragonstone — and a heretical plan to claim wild dragons with common blood.",
    greenControls: "King's Landing, ruled by fear under Prince Regent Aemond.",
    daemon: "Bound by the witch Alys Rivers's visions at Harrenhal.",
    conflicts: [
      "Aemond's cruelty is alienating his own allies.",
      "Can smallfolk 'dragonseeds' really tame the wild dragons?",
      "The Blacks must close the dragon gap or lose the war.",
    ],
  },
  17: {
    youAreHere:
      "The Red Sowing: at great cost, the Blacks have claimed Vermithor and Silverwing for new riders.",
    blackControls: "Dragonstone and now four more dragons than a month ago.",
    greenControls: "The capital and Vhagar — still deadly, but no longer unmatched.",
    daemon: "Slowly waking to his duty as Harrenhal's garrison swells.",
    conflicts: [
      "Two more giant dragons now fly for Rhaenyra.",
      "Lowborn riders unsettle lords on both sides of the war.",
      "The balance of dragons has swung — the Greens must respond.",
    ],
  },
  18: {
    youAreHere:
      "Armies and dragons mass on every side; Daemon has knelt, and Alicent comes to sue for peace.",
    blackControls: "Dragonstone, the fleet, the North and Vale, and a growing dragon host.",
    greenControls: "King's Landing and the throne — but a fracturing, frightened court.",
    daemon: "Reconciled at last, he has bent the knee to Queen Rhaenyra.",
    conflicts: [
      "Full-scale war is one spark from igniting across the realm.",
      "Can Alicent's surrender offer stop the coming slaughter?",
      "With the Greens split, does Aemond answer to anyone now?",
    ],
  },
};

function snapshotFor(watched: number): { snap: Snapshot; episode: number } {
  const keys = Object.keys(SNAPSHOTS)
    .map(Number)
    .filter((e) => e <= watched)
    .sort((a, b) => a - b);
  const ep = keys.length ? keys[keys.length - 1] : 1;
  return { snap: SNAPSHOTS[ep], episode: ep };
}

export function PreviouslyOn({ watched }: { watched: number }) {
  const { snap, episode } = snapshotFor(watched);
  const m = episodeMeta(episode);

  return (
    <Panel className="border-amber-400/20 bg-gradient-to-b from-amber-950/20 to-neutral-900/60">
      <SectionHeading
        glyph="🧠"
        title="Previously On… in Five Minutes"
        subtitle={`Refreshed as of S${m.season} · E${m.episode}: “${m.title}”`}
      />

      <div className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3">
        <p className="font-mono text-[10px] uppercase tracking-wide text-amber-300/80">
          You are here
        </p>
        <p className="mt-1 text-sm text-neutral-100">{snap.youAreHere}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
            <span className="size-2 rounded-full bg-neutral-900 ring-1 ring-neutral-600" />
            Blacks control
          </p>
          <p className="text-xs leading-relaxed text-neutral-400">{snap.blackControls}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
            <span className="size-2 rounded-full bg-emerald-600" />
            Greens control
          </p>
          <p className="text-xs leading-relaxed text-neutral-400">{snap.greenControls}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-1 text-xs font-semibold text-neutral-200">Daemon is…</p>
          <p className="text-xs leading-relaxed text-neutral-400">{snap.daemon}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
          The three biggest unresolved conflicts
        </p>
        <ol className="flex flex-col gap-1.5">
          {snap.conflicts.map((c, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-neutral-300">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[11px] text-amber-200">
                {i + 1}
              </span>
              {c}
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}
