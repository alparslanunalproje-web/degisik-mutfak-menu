"use client";

import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Category, DietTag } from "@/lib/types";
import { CATEGORY_LABELS, TAG_META } from "@/lib/types";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: Category | "all";
  setCategory: (c: Category | "all") => void;
  activeTags: Set<DietTag>;
  toggleTag: (t: DietTag) => void;
};

const CATS: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "Tümü" },
  { key: "starters", label: CATEGORY_LABELS.starters },
  { key: "mains", label: CATEGORY_LABELS.mains },
  { key: "desserts", label: CATEGORY_LABELS.desserts },
  { key: "drinks", label: CATEGORY_LABELS.drinks },
];

const TAG_ORDER: DietTag[] = ["chef", "veggie", "vegan", "spicy"];

export function MenuFilters({
  search,
  setSearch,
  category,
  setCategory,
  activeTags,
  toggleTag,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="relative px-5">
        <Search className="pointer-events-none absolute left-9 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Menüde ara… (örn. salata, somon)"
          className="h-12 w-full rounded-2xl glass-strong pl-11 pr-10 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:ring-focus"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Aramayı temizle"
            className="absolute right-8 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-brand-200 dark:bg-brand-800/40 dark:text-brand-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="hide-scrollbar flex gap-2 overflow-x-auto pl-5 pr-5">
        {CATS.map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "text-white"
                  : "text-[var(--text-soft)] hover:text-[var(--text-strong)]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-cat"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 shadow-[0_8px_24px_-8px_rgb(2_132_199_/_0.6)]"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
              <span className={active ? "relative z-10" : "relative z-10"}>
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5 px-5">
        {TAG_ORDER.map((tag) => {
          const active = activeTags.has(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                active
                  ? "bg-brand-500 text-white shadow-md"
                  : "glass text-[var(--text-muted)] hover:text-[var(--text-strong)]"
              }`}
            >
              <span>{TAG_META[tag].emoji}</span>
              {TAG_META[tag].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
