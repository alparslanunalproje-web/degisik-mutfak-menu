export type Category = "starters" | "mains" | "desserts" | "drinks";

export type DietTag = "chef" | "veggie" | "vegan" | "spicy";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  tags: DietTag[];
  allergens: string[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  starters: "Sıra Dışı Girişler",
  mains: "Sınırları Zorlayanlar",
  desserts: "Tatlı Kaçamaklar",
  drinks: "Sıra Dışı Yudumlar",
};

export const CATEGORY_SHORT: Record<Category, string> = {
  starters: "Girişler",
  mains: "Ana Yemekler",
  desserts: "Tatlılar",
  drinks: "İçecekler",
};

export const TAG_META: Record<
  DietTag,
  { label: string; emoji: string; badgeClass: string }
> = {
  chef: {
    label: "Şefin Seçimi",
    emoji: "⭐",
    badgeClass: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
  veggie: {
    label: "Vejetaryen",
    emoji: "🌱",
    badgeClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  vegan: {
    label: "Vegan",
    emoji: "🍀",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  spicy: {
    label: "Acılı",
    emoji: "🌶️",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  },
};

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop";
