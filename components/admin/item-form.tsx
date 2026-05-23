"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Save } from "lucide-react";
import { useMenuStore } from "@/lib/store";
import type { Category, DietTag, MenuItem } from "@/lib/types";
import { CATEGORY_LABELS, TAG_META } from "@/lib/types";

type Props = {
  editing: MenuItem | null;
  onDone: () => void;
};

const EMPTY = {
  name: "",
  price: 0,
  category: "starters" as Category,
  description: "",
  image: "",
  tags: [] as DietTag[],
  allergens: "",
};

const CAT_KEYS: Category[] = ["starters", "mains", "desserts", "drinks"];
const TAG_KEYS: DietTag[] = ["chef", "veggie", "vegan", "spicy"];

export function ItemForm({ editing, onDone }: Props) {
  const addItem = useMenuStore((s) => s.addItem);
  const updateItem = useMenuStore((s) => s.updateItem);

  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        price: editing.price,
        category: editing.category,
        description: editing.description,
        image:
          editing.image.startsWith("/assets/") &&
          editing.image.match(/(salad|dessert|drink|logo)\.png$/)
            ? ""
            : editing.image,
        tags: editing.tags,
        allergens: editing.allergens.join(", "),
      });
    } else {
      setForm(EMPTY);
    }
  }, [editing]);

  const toggleTag = (tag: DietTag) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    let image = form.image.trim();
    if (!image) {
      const fallback: Record<Category, string> = {
        starters: "/assets/salad.png",
        desserts: "/assets/dessert.png",
        drinks: "/assets/drink.png",
        mains:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
      };
      image = fallback[form.category];
    }

    const allergens = form.allergens
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const payload = {
      name: form.name.trim(),
      price: Number(form.price) || 0,
      category: form.category,
      description: form.description.trim(),
      image,
      tags: form.tags,
      allergens,
    };

    if (editing) updateItem(editing.id, payload);
    else addItem(payload);
    setForm(EMPTY);
    onDone();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl glass-strong p-6"
    >
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
          {editing ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--text-strong)]">
            {editing ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {editing ? "Değişiklikleri kaydedin" : "Menünüze yeni lezzet ekleyin"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Ürün Adı" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Örn. Akdeniz Bahçesi Salatası"
            className="form-input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Fiyat (₺)" required>
            <input
              type="number"
              required
              min={0}
              value={form.price || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: Number(e.target.value) }))
              }
              placeholder="180"
              className="form-input"
            />
          </Field>
          <Field label="Kategori" required>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as Category,
                }))
              }
              className="form-input"
            >
              {CAT_KEYS.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Açıklama" required>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="İçerik, pişirilme tarzı veya lezzet notları…"
            className="form-input resize-none"
          />
        </Field>

        <Field label="Görsel URL veya /assets/...">
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="Boş bırakılırsa varsayılan görsel atanır"
            className="form-input"
          />
        </Field>

        <Field label="Diyet Etiketleri">
          <div className="flex flex-wrap gap-2">
            {TAG_KEYS.map((tag) => {
              const active = form.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200"
                      : "border-brand-100/60 bg-white/50 text-[var(--text-soft)] hover:border-brand-300 dark:border-brand-800/40 dark:bg-slate-900/40"
                  }`}
                >
                  <span>{TAG_META[tag].emoji}</span>
                  {TAG_META[tag].label}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Alerjenler (virgülle ayırın)">
          <input
            type="text"
            value={form.allergens}
            onChange={(e) =>
              setForm((f) => ({ ...f, allergens: e.target.value }))
            }
            placeholder="Gluten, Süt Ürünü, Kuruyemiş"
            className="form-input"
          />
        </Field>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {editing ? "Değişiklikleri Kaydet" : "Ürünü Menüye Ekle"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-1 rounded-xl bg-brand-50 px-4 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200"
          >
            <X className="h-4 w-4" />
            İptal
          </button>
        )}
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgb(186 230 253 / 0.4);
          background: rgb(255 255 255 / 0.7);
          font-size: 14px;
          color: var(--text-strong);
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }
        :global(.dark .form-input) {
          background: rgb(15 23 42 / 0.6);
          border-color: rgb(7 89 133 / 0.4);
        }
        :global(.form-input:focus) {
          border-color: var(--color-brand-500);
          box-shadow: 0 0 0 3px hsl(199 89% 48% / 0.15);
        }
      `}</style>
    </motion.form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[var(--text-strong)]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
