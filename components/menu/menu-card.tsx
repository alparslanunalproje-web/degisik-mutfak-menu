"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { TAG_META, FALLBACK_IMAGE } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  item: MenuItem;
  index: number;
  onSelect: (item: MenuItem) => void;
};

export function MenuCard({ item, index, onSelect }: Props) {
  const isChef = item.tags.includes("chef");

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full overflow-hidden rounded-2xl glass text-left transition-shadow hover:shadow-[0_24px_64px_-16px_rgb(2_132_199_/_0.25)]"
    >
      {isChef && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          <Sparkles className="h-3 w-3" />
          Şef
        </div>
      )}

      <div className="flex">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden bg-brand-50 dark:bg-brand-900/30 sm:h-36 sm:w-36">
          <Image
            src={item.image || FALLBACK_IMAGE}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 128px, 144px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-[15px] font-bold leading-tight text-[var(--text-strong)]">
                {item.name}
              </h3>
              <span className="shrink-0 font-display text-base font-extrabold text-brand-600 dark:text-brand-300">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
              {item.description}
            </p>
          </div>

          {item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags
                .filter((t) => t !== "chef")
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${TAG_META[tag].badgeClass}`}
                  >
                    {TAG_META[tag].label}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
