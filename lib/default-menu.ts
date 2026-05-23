import type { MenuItem } from "./types";

export const DEFAULT_MENU: MenuItem[] = [
  {
    id: "starter-1",
    name: "Değişik Avokado & Çiçek Salatası",
    category: "starters",
    price: 240,
    description:
      "Özel yetiştirilmiş taze yeşillikler, ince turp dilimleri, avokado yatağı ve yenilebilir mavi kantaron çiçekleri ile sunulan hafif ama çarpıcı bir başlangıç.",
    image: "/assets/salad.png",
    tags: ["veggie", "vegan", "chef"],
    allergens: ["Glutensiz", "Narenciye"],
  },
  {
    id: "starter-2",
    name: "Köz Domatesli Çıtır Bruschetta",
    category: "starters",
    price: 180,
    description:
      "Fırınlanmış sarımsak ve zeytinyağı ile çıtırdatılmış ekşi mayalı ekmek üzerinde marine fesleğenli konfi domatesler.",
    image:
      "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=800&auto=format&fit=crop",
    tags: ["veggie"],
    allergens: ["Gluten"],
  },
  {
    id: "main-1",
    name: "Kömür Ateşinde Trüflü Somon",
    category: "mains",
    price: 420,
    description:
      "Özel marinasyonlu somon fileto, yabani kuşkonmaz, fırınlanmış bebek patatesler ve siyah trüf mantarı yağı eşliğinde.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop",
    tags: ["chef"],
    allergens: ["Balık"],
  },
  {
    id: "main-2",
    name: "Fesleğenli Ev Yapımı Gnocchi",
    category: "mains",
    price: 320,
    description:
      "Taze patates hamurundan gnocchi, ev yapımı cevizli fesleğen pesto sosu, konfi kiraz domatesler ve parmesan rendesi.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop",
    tags: ["veggie"],
    allergens: ["Gluten", "Kuruyemiş", "Süt Ürünü"],
  },
  {
    id: "dessert-1",
    name: "Kırık Cheesecake Rüyası",
    category: "desserts",
    price: 210,
    description:
      "Parçalanmış yaban mersinli taze cheesecake dolgusu, tereyağlı çıtır bisküvi kırıntıları, beyaz çikolata sarmalları ve taze yaban mersinleri.",
    image: "/assets/dessert.png",
    tags: ["veggie", "chef"],
    allergens: ["Süt Ürünü", "Gluten"],
  },
  {
    id: "dessert-2",
    name: "Limon Bahçesi Sufle",
    category: "desserts",
    price: 190,
    description:
      "Fırından taze çıkan beyaz çikolatalı ve limon kabuklu sufle, yanında vanilyalı dondurma ile.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop",
    tags: ["veggie"],
    allergens: ["Süt Ürünü", "Gluten", "Yumurta"],
  },
  {
    id: "drink-1",
    name: "Mavi Işık Kokteyli",
    category: "drinks",
    price: 160,
    description:
      "Mavi curaçao, taze sıkılmış misket limonu suyu, nane yaprakları ve sodanın buzla birleşen ferahlatıcı dansı (Alkol içermez).",
    image: "/assets/drink.png",
    tags: ["veggie", "vegan"],
    allergens: [],
  },
  {
    id: "drink-2",
    name: "Orman Meyveleri Limonatası",
    category: "drinks",
    price: 120,
    description:
      "Geleneksel ev yapımı limonatamızın taze ahududu ve böğürtlen püresi ile harmanlanmış sıra dışı versiyonu.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop",
    tags: ["veggie", "vegan"],
    allergens: [],
  },
];
