import { FAMILY_TREE, TreeNode, charById, hasAppeared } from "@/lib/hotd/data";
import { Panel, Portrait, SectionHeading } from "./shared";

function Person({
  id,
  watched,
  onSelect,
  selectedId,
  muted,
}: {
  id: string;
  watched: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
  muted?: boolean;
}) {
  const c = charById(id);
  if (!c) return null;
  const known = hasAppeared(c, watched);
  return (
    <button
      onClick={() => onSelect(id)}
      className={[
        "flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors",
        selectedId === id
          ? "border-amber-400/60 bg-amber-400/10"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]",
        muted ? "opacity-70" : "",
      ].join(" ")}
    >
      <Portrait character={c} watched={watched} size="sm" />
      <span className="text-xs font-medium leading-tight text-neutral-100">
        {known ? c.name.split(" ")[0] : "???"}
        <span className="block text-[10px] text-neutral-500">
          {known ? c.house : "not yet met"}
        </span>
      </span>
    </button>
  );
}

function Branch({
  node,
  watched,
  onSelect,
  selectedId,
}: {
  node: TreeNode;
  watched: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const spouseShown =
    node.spouseId !== undefined && watched >= (node.spouseFromEpisode ?? 1);

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Person id={node.id} watched={watched} onSelect={onSelect} selectedId={selectedId} />
        {spouseShown && (
          <>
            <span className="text-neutral-600">×</span>
            <Person
              id={node.spouseId!}
              watched={watched}
              onSelect={onSelect}
              selectedId={selectedId}
              muted
            />
          </>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="ml-4 flex flex-col gap-1.5 border-l border-dashed border-white/15 pl-4">
          {node.children.map((child) => (
            <Person
              key={child.id}
              id={child.id}
              watched={watched}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FamilyTree({
  watched,
  onSelect,
  selectedId,
}: {
  watched: number;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  return (
    <Panel>
      <SectionHeading glyph="🏰" title="Family Tree" subtitle="The line of King Viserys I" />

      <div className="flex flex-col gap-3">
        {/* King */}
        <Person
          id={FAMILY_TREE.id}
          watched={watched}
          onSelect={onSelect}
          selectedId={selectedId}
        />

        {/* Two branches: Rhaenyra's line and Alicent's line */}
        <div className="ml-4 flex flex-col gap-4 border-l border-white/15 pl-4">
          {FAMILY_TREE.children?.map((child) => (
            <Branch
              key={child.id}
              node={child}
              watched={watched}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/10 pt-4 text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-600" /> Team Black
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-600" /> Team Green
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-500" /> Unaligned
        </span>
        <span className="flex items-center gap-1.5">⚰️ Deceased</span>
        <span className="flex items-center gap-1.5">🐉 Dragonrider</span>
      </div>
    </Panel>
  );
}
