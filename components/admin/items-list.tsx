"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, List } from "lucide-react";
import { useMenuStore } from "@/lib/store";
import type { MenuItem } from "@/lib/types";
import { CATEGORY_SHORT, FALLBACK_IMAGE } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  onEdit: (item: MenuItem) => void;
};

export function ItemsList({ onEdit }: Props) {
  const items = useMenuStore((s) => s.items);
  const removeItem = useMenuStore((s) => s.removeItem);

  const sorted = [...items].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="overflow-hidden rounded-3xl glass-strong p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-purple-700 text-white shadow-lg shadow-indigo-500/30">
            <List className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--text-strong)]">
              Mevcut Menü
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {items.length} ürün listelendi
            </p>
          </div>
        </div>
      </div>

      <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {sorted.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--text-muted)]">
              Henüz ürün yok. Formu kullanarak ekleyin.
            </p>
          )}
          {sorted.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 rounded-2xl border border-brand-100/40 bg-white/60 p-3 backdrop-blur transition hover:border-brand-300 hover:bg-white dark:border-brand-800/30 dark:bg-slate-900/40 dark:hover:bg-slate-900/70"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-brand-50 dark:bg-brand-900/30">
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-bold text-[var(--text-strong)]">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {CATEGORY_SHORT[item.category]} ·{" "}
                  <span className="font-bold text-brand-600 dark:text-brand-300">
                    {formatPrice(item.price)}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  aria-label={`${item.name} düzenle`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-100/60 bg-white text-[var(--text-muted)] transition hover:border-brand-400 hover:text-brand-600 dark:border-brand-800/40 dark:bg-slate-900/60"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`"${item.name}" silinsin mi?`)) removeItem(item.id);
                  }}
                  aria-label={`${item.name} sil`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100/60 bg-white text-red-500 transition hover:border-red-400 hover:bg-red-50 dark:border-red-900/40 dark:bg-slate-900/60 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
