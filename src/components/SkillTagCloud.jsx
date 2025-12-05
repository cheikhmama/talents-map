import { useMemo } from "react";
import useTalentStore from "../hooks/useTalentStore";

function normalizeSkillName(name) {
  if (!name) return "";
  return String(name).trim();
}

export default function SkillTagCloud({ talents: propsTalents } = {}) {
  const store = useTalentStore();
  const talents = propsTalents ?? store.talents ?? [];

  const { skillCounts, minCount, maxCount } = useMemo(() => {
    const map = new Map();
    const displayMap = new Map();

    talents.forEach((t) => {
      const rawSkills = t.skills || [];
      rawSkills.forEach((s) => {
        const name = normalizeSkillName(
          typeof s === "string" ? s : s?.name
        );
        if (!name) return;
        const key = name.toLowerCase();
        displayMap.set(key, name);
        map.set(key, (map.get(key) || 0) + 1);
      });
    });

    let min = Infinity;
    let max = -Infinity;
    const entries = [];
    for (const [key, count] of map.entries()) {
      min = Math.min(min, count);
      max = Math.max(max, count);
      entries.push({ key, name: displayMap.get(key) || key, count });
    }

    if (entries.length === 0) {
      min = 0;
      max = 0;
    }

    return { skillCounts: entries, minCount: min, maxCount: max };
  }, [talents]);

  const minSize = 14;
  const maxSize = 32;

  function sizeForCount(count) {
    if (minCount === maxCount) return `${(minSize + maxSize) / 2}px`;
    const ratio = (count - minCount) / (maxCount - minCount);
    const size = Math.round(minSize + ratio * (maxSize - minSize));
    return `${size}px`;
  }

  return (
    <div className="py-4">
      {skillCounts.length === 0 ? (
        <div className="text-sm text-zinc-500">
          Aucune compétence trouvée.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          {skillCounts.map((s) => (
            <span
              key={s.key}
              title={`${s.name} — ${s.count}`}
              className="inline-block px-2 py-1 rounded-md bg-zinc-100 text-zinc-800 hover:scale-110 hover:shadow cursor-pointer select-none"
              style={{ fontSize: sizeForCount(s.count) }}
            >
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
