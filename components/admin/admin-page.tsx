"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import { useMenuStore } from "@/lib/store";
import type { MenuItem } from "@/lib/types";
import { QrGenerator } from "./qr-generator";
import { ItemForm } from "./item-form";
import { ItemsList } from "./items-list";
import { ThemeToggle } from "../theme-toggle";

export function AdminPage() {
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const reset = useMenuStore((s) => s.resetToDefaults);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-8">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <Link
            href="/"
            className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Menü Görünümüne Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-lg shadow-brand-500/40">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-strong)]">
                Yönetim Paneli
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Menünüzü yönetin, QR kodunuzu özelleştirin
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Tüm menü fabrika ayarlarına döndürülecek. Eklediğiniz ürünler silinecek. Emin misiniz?"
                )
              ) {
                reset();
                setEditing(null);
              }
            }}
            className="flex items-center gap-1.5 rounded-full border border-brand-200/50 bg-white/60 px-4 py-2 text-xs font-bold text-[var(--text-soft)] backdrop-blur transition hover:border-brand-400 hover:text-brand-700 dark:border-brand-800/40 dark:bg-slate-900/40"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Menüyü Sıfırla
          </button>
        </div>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <QrGenerator />

        <div className="space-y-6">
          <ItemForm editing={editing} onDone={() => setEditing(null)} />
          <ItemsList onEdit={setEditing} />
        </div>
      </div>
    </div>
  );
}
