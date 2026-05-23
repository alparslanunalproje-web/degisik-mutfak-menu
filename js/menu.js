// Default menu items configuration
const defaultMenuItems = [
    {
        id: "starter-1",
        name: "Değişik Avokado & Çiçek Salatası",
        category: "starters",
        price: 240,
        description: "Özel yetiştirilmiş taze yeşillikler, ince turp dilimleri, avokado yatağı ve yenilebilir mavi kantaron çiçekleri ile sunulan hafif ama çarpıcı bir başlangıç.",
        image: "assets/salad.png",
        tags: ["veggie", "vegan", "chef"],
        allergens: ["Glutensiz", "Narenciye"]
    },
    {
        id: "starter-2",
        name: "Köz Domatesli Çıtır Bruschetta",
        category: "starters",
        price: 180,
        description: "Fırınlanmış sarımsak ve zeytinyağı ile çıtırdatılmış ekşi mayalı ekmek üzerinde marine fesleğenli konfi domatesler.",
        image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop",
        tags: ["veggie"],
        allergens: ["Gluten"]
    },
    {
        id: "main-1",
        name: "Kömür Ateşinde Trüflü Somon",
        category: "mains",
        price: 420,
        description: "Özel marinasyonlu somon fileto, yabani kuşkonmaz, fırınlanmış bebek patatesler ve siyah trüf mantarı yağı eşliğinde.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop",
        tags: ["chef"],
        allergens: ["Balık"]
    },
    {
        id: "main-2",
        name: "Fesleğenli Ev Yapımı Gnocchi",
        category: "mains",
        price: 320,
        description: "Taze patates hamurundan gnocchi, ev yapımı cevizli fesleğen pesto sosu, konfi kiraz domatesler ve parmesan rendesi.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop",
        tags: ["veggie"],
        allergens: ["Gluten", "Kuruyemiş", "Süt Ürünü"]
    },
    {
        id: "dessert-1",
        name: "Kırık Cheesecake Rüyası",
        category: "desserts",
        price: 210,
        description: "Parçalanmış yaban mersinli taze cheesecake dolgusu, tereyağlı çıtır bisküvi kırıntıları, beyaz çikolata sarmalları ve taze yaban mersinleri.",
        image: "assets/dessert.png",
        tags: ["veggie", "chef"],
        allergens: ["Süt Ürünü", "Gluten"]
    },
    {
        id: "dessert-2",
        name: "Limon Bahçesi Sufle",
        category: "desserts",
        price: 190,
        description: "Fırından taze çıkan beyaz çikolatalı ve limon kabuklu sufle, yanında vanilyalı dondurma ile.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop",
        tags: ["veggie"],
        allergens: ["Süt Ürünü", "Gluten", "Yumurta"]
    },
    {
        id: "drink-1",
        name: "Mavi Işık Kokteyli",
        category: "drinks",
        price: 160,
        description: "Mavi curaçao, taze sıkılmış misket limonu suyu, nane yaprakları ve sodanın buzla birleşen ferahlatıcı dansı (Alkol içermez).",
        image: "assets/drink.png",
        tags: ["veggie", "vegan"],
        allergens: ["Yok"]
    },
    {
        id: "drink-2",
        name: "Orman Meyveleri Limonatası",
        category: "drinks",
        price: 120,
        description: "Geleneksel ev yapımı limonatamızın taze ahududu ve böğürtlen püresi ile harmanlanmış sıra dışı versiyonu.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop",
        tags: ["veggie", "vegan"],
        allergens: ["Yok"]
    }
];

// Initialize and state variables
let menuItems = [];
let currentCategory = "all";
let currentSearchQuery = "";
let activeFilters = {
    chef: false,
    veggie: false,
    vegan: false,
    spicy: false
};

// Map categories to user-friendly titles
const categoryTitles = {
    starters: "Sıra Dışı Girişler",
    mains: "Sınırları Zorlayanlar",
    desserts: "Tatlı Kaçamaklar",
    drinks: "Sıra Dışı Yudumlar"
};

// Elements DOM
const menuListEl = document.getElementById("menu-list");
const categoryPills = document.querySelectorAll(".category-pill");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");

// Modal Elements
const productModal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalBadges = document.getElementById("modal-badges");
const modalDescription = document.getElementById("modal-description");
const modalAllergens = document.getElementById("modal-allergens");

// Load menu from localStorage or default
function initMenu() {
    const savedMenu = localStorage.getItem("degisik_mutfak_menu");
    if (savedMenu) {
        try {
            menuItems = JSON.parse(savedMenu);
        } catch (e) {
            console.error("Local storage menu parse error, loading defaults", e);
            menuItems = [...defaultMenuItems];
            localStorage.setItem("degisik_mutfak_menu", JSON.stringify(menuItems));
        }
    } else {
        menuItems = [...defaultMenuItems];
        localStorage.setItem("degisik_mutfak_menu", JSON.stringify(menuItems));
    }
    renderMenu();
}

// Renders the menu items according to selected filters, search, and category
function renderMenu() {
    menuListEl.innerHTML = "";

    // Group items by category to render section-by-section
    const filteredItems = menuItems.filter(item => {
        // Category check
        if (currentCategory !== "all" && item.category !== currentCategory) {
            return false;
        }

        // Search check
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            const matchesName = item.name.toLowerCase().includes(query);
            const matchesDesc = item.description.toLowerCase().includes(query);
            if (!matchesName && !matchesDesc) {
                return false;
            }
        }

        // Active tags check
        for (const [filterKey, active] of Object.entries(activeFilters)) {
            if (active && (!item.tags || !item.tags.includes(filterKey))) {
                return false;
            }
        }

        return true;
    });

    if (filteredItems.length === 0) {
        menuListEl.innerHTML = `
            <div class="empty-state fade-in-el">
                <div class="empty-state-icon">🔍</div>
                <h3>Aradığınız kriterlere uygun lezzet bulamadık</h3>
                <p style="font-size: 13px; margin-top: 6px;">Lütfen filtreleri sıfırlamayı veya farklı bir arama yapmayı deneyin.</p>
            </div>
        `;
        return;
    }

    // Determine which categories are present in the filtered set
    const categoriesToRender = currentCategory === "all" 
        ? ["starters", "mains", "desserts", "drinks"]
        : [currentCategory];

    categoriesToRender.forEach((cat, index) => {
        const catItems = filteredItems.filter(item => item.category === cat);
        if (catItems.length === 0) return;

        // Create Section Title
        const sectionTitle = document.createElement("h2");
        sectionTitle.className = "category-section-title fade-in-el";
        sectionTitle.style.animationDelay = `${index * 0.05}s`;
        sectionTitle.textContent = categoryTitles[cat] || cat;
        menuListEl.appendChild(sectionTitle);

        // Render each card in this category
        catItems.forEach((item, itemIdx) => {
            const card = document.createElement("div");
            card.className = "menu-item-card fade-in-el";
            card.style.animationDelay = `${(index * 0.05) + (itemIdx * 0.03)}s`;
            card.onclick = () => openProductDetails(item);

            // Generate Badges HTML
            let badgesHtml = "";
            if (item.tags) {
                item.tags.forEach(tag => {
                    const labelMap = { veggie: "Vejetaryen", vegan: "Vegan", spicy: "Acılı", chef: "Spesiyal" };
                    if (labelMap[tag]) {
                        badgesHtml += `<span class="badge badge-${tag}">${labelMap[tag]}</span>`;
                    }
                });
            }

            card.innerHTML = `
                <div class="menu-item-img-container">
                    <img class="menu-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop';">
                </div>
                <div class="menu-item-details">
                    <div>
                        <div class="menu-item-header">
                            <h3 class="menu-item-name">${item.name}</h3>
                            <span class="menu-item-price">${item.price} ₺</span>
                        </div>
                        <p class="menu-item-desc">${item.description}</p>
                    </div>
                    <div class="menu-item-badges">
                        ${badgesHtml}
                    </div>
                </div>
            `;
            menuListEl.appendChild(card);
        });
    });
}

// Opens the Bottom Sheet Modal with detailed product view
function openProductDetails(item) {
    modalTitle.textContent = item.name;
    modalPrice.textContent = `${item.price} ₺`;
    modalDescription.textContent = item.description;
    modalImage.src = item.image;
    modalImage.onerror = () => {
        modalImage.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop';
    };

    // Badges in Modal
    modalBadges.innerHTML = "";
    if (item.tags) {
        item.tags.forEach(tag => {
            const labelMap = { veggie: "🌱 Vejetaryen", vegan: "🍀 Vegan", spicy: "🌶️ Acılı", chef: "⭐ Şefin Seçimi" };
            if (labelMap[tag]) {
                const badgeSpan = document.createElement("span");
                badgeSpan.className = `badge badge-${tag}`;
                badgeSpan.style.fontSize = "11px";
                badgeSpan.style.padding = "4px 8px";
                badgeSpan.textContent = labelMap[tag];
                modalBadges.appendChild(badgeSpan);
            }
        });
    }

    // Allergens in Modal
    modalAllergens.innerHTML = "";
    if (item.allergens && item.allergens.length > 0 && item.allergens[0] !== "Yok") {
        item.allergens.forEach(allergen => {
            const tag = document.createElement("span");
            tag.className = "allergen-tag";
            tag.textContent = allergen;
            modalAllergens.appendChild(tag);
        });
    } else {
        const tag = document.createElement("span");
        tag.className = "allergen-tag";
        tag.textContent = "Temiz / Bilinen Alerjen İçermez";
        modalAllergens.appendChild(tag);
    }

    productModal.classList.add("active");
}

function closeProductDetails() {
    productModal.classList.remove("active");
}

// Setup Event Listeners
categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
        categoryPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentCategory = pill.getAttribute("data-category");
        renderMenu();
    });
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filterType = btn.getAttribute("data-filter");
        activeFilters[filterType] = !activeFilters[filterType];
        btn.classList.toggle("active", activeFilters[filterType]);
        renderMenu();
    });
});

searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    renderMenu();
});

modalClose.addEventListener("click", closeProductDetails);
productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
        closeProductDetails();
    }
});

// Close modal on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProductDetails();
    }
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", initMenu);

// Listen to local storage changes (if modified in admin panel in another tab)
window.addEventListener("storage", (e) => {
    if (e.key === "degisik_mutfak_menu") {
        initMenu();
    }
});
