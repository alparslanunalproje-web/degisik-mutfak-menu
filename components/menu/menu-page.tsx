"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Sparkles } from "lucide-react";
import { useMenuStore } from "@/lib/store";
import type { Category, DietTag, MenuItem } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { MenuCard } from "./menu-card";
import { MenuFilters } from "./menu-filters";
import { ProductSheet } from "./product-sheet";
import { ThemeToggle } from "../theme-toggle";

export function MenuPage() {
  const items = useMenuStore((s) => s.items);
  const hydrated = useMenuStore((s) => s.hydrated);

  const [category, setCategory] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<DietTag>>(new Set());
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const toggleTag = (tag: DietTag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (q) {
        const hay = `${item.name} ${item.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      for (const t of activeTags) {
        if (!item.tags.includes(t)) return false;
      }
      return true;
    });
  }, [items, category, search, activeTags]);

  const grouped = useMemo(() => {
    const cats: Category[] =
      category === "all"
        ? ["starters", "mains", "desserts", "drinks"]
        : [category];
    return cats
      .map((c) => ({ cat: c, items: filtered.filter((i) => i.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, category]);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col pb-20">
      <header className="sticky top-0 z-30 px-5 pb-3 pt-5 backdrop-blur-xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent" />

        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-2 ring-brand-500/40 shadow-lg shadow-brand-500/20">
              <Image
                src="/assets/logo.png"
                alt="Değişik Mutfak"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="brand-text font-display text-2xl font-extrabold leading-none tracking-tight">
                Değişik Mutfak
              </h1>
              <p className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <Sparkles className="h-2.5 w-2.5 text-gold-500" />
                Premium Lezzet Deneyimi
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin"
              aria-label="Yönetim paneli"
              className="flex h-10 w-10 items-center justify-center rounded-full glass-strong transition-transform hover:scale-110 active:scale-95"
            >
              <Settings2 className="h-[18px] w-[18px] text-[var(--text-soft)]" />
            </Link>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-2 mt-1"
      >
        <MenuFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          activeTags={activeTags}
          toggleTag={toggleTag}
        />
      </motion.div>

      <main className="flex-1 px-5 pt-3">
        {!hydrated ? (
          <SkeletonList />
        ) : grouped.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {grouped.map((group) => (
                <motion.section
                  key={group.cat}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-brand-400 to-brand-700" />
                    <h2 className="font-display text-lg font-bold text-[var(--text-strong)]">
                      {CATEGORY_LABELS[group.cat]}
                    </h2>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {group.items.map((item, i) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        index={i}
                        onSelect={setSelected}
                      />
                    ))}
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <footer className="mt-12 px-5 pb-6 pt-8 text-center">
        <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Değişik Mutfak · Premium QR Menü
        </p>
        <p className="mt-1 text-[10px] text-[var(--text-muted)]">
          Tüm hakları saklıdır
        </p>
      </footer>

      <ProductSheet item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex h-32 overflow-hidden rounded-2xl glass"
          aria-hidden
        >
          <div className="h-full w-32 animate-shimmer bg-brand-100/50 dark:bg-brand-900/30" />
          <div className="flex flex-1 flex-col justify-center gap-2 p-4">
            <div className="h-4 w-2/3 animate-shimmer rounded bg-brand-100/50 dark:bg-brand-900/30" />
            <div className="h-3 w-full animate-shimmer rounded bg-brand-100/50 dark:bg-brand-900/30" />
            <div className="h-3 w-1/2 animate-shimmer rounded bg-brand-100/50 dark:bg-brand-900/30" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 flex flex-col items-center text-center"
    >
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full glass animate-float">
        <span className="text-3xl">🔍</span>
      </div>
      <h3 className="font-display text-lg font-bold text-[var(--text-strong)]">
        Aradığınız lezzet bulunamadı
      </h3>
      <p className="mt-1 max-w-xs text-sm text-[var(--text-muted)]">
        Filtreleri sıfırlamayı veya farklı bir arama yapmayı deneyin.
      </p>
    </motion.div>
  );
}
