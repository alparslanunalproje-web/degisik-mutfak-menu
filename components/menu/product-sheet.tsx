"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { TAG_META, FALLBACK_IMAGE } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  item: MenuItem | null;
  onClose: () => void;
};

export function ProductSheet({ item, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handler);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:rounded-3xl"
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            <div className="relative h-64 w-full overflow-hidden bg-brand-50 dark:bg-brand-900/30">
              <Image
                src={item.image || FALLBACK_IMAGE}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

              <button
                onClick={onClose}
                aria-label="Kapat"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg backdrop-blur-md transition-transform hover:scale-110 active:scale-95 dark:bg-slate-800/95 dark:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${TAG_META[tag].badgeClass}`}
                  >
                    {TAG_META[tag].emoji} {TAG_META[tag].label}
                  </span>
                ))}
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[var(--text-strong)]">
                  {item.name}
                </h2>
                <span className="shrink-0 font-display text-2xl font-extrabold text-brand-600 dark:text-brand-300">
                  {formatPrice(item.price)}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">
                {item.description}
              </p>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent dark:via-brand-700/40" />

              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Alerjenler / Hassasiyetler
                </div>
                {item.allergens.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {item.allergens.map((a) => (
                      <span
                        key={a}
                        className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    ✓ Temiz / Bilinen alerjen içermez
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
