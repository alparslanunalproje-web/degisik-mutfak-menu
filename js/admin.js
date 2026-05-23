// Copy of default items for reset functionality
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

let menuItems = [];
let qrGenerator = null;

// DOM Elements
const qrUrlInput = document.getElementById("qr-url");
const qrColorDarkInput = document.getElementById("qr-color-dark");
const qrColorLightInput = document.getElementById("qr-color-light");
const qrColorDarkLbl = document.getElementById("qr-color-dark-lbl");
const qrColorLightLbl = document.getElementById("qr-color-light-lbl");
const qrBox = document.getElementById("qrcode-box");
const btnDownloadQr = document.getElementById("btn-download-qr");

const menuItemForm = document.getElementById("menu-item-form");
const editItemIdInput = document.getElementById("edit-item-id");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemCategorySelect = document.getElementById("item-category");
const itemDescTextarea = document.getElementById("item-desc");
const itemImageInput = document.getElementById("item-image");
const itemAllergensInput = document.getElementById("item-allergens");
const tagChefCheckbox = document.getElementById("tag-chef");
const tagVeggieCheckbox = document.getElementById("tag-veggie");
const tagVeganCheckbox = document.getElementById("tag-vegan");
const tagSpicyCheckbox = document.getElementById("tag-spicy");

const formCardTitle = document.getElementById("form-card-title");
const btnSubmitForm = document.getElementById("btn-submit-form");
const btnCancelEdit = document.getElementById("btn-cancel-edit");
const adminItemsListEl = document.getElementById("admin-items-list");
const itemsCountEl = document.getElementById("items-count");
const btnResetDefaults = document.getElementById("btn-reset-defaults");

// Initialize Data & Handlers
function initAdmin() {
    // 1. Set default URL for QR Code based on current page URL
    const currentURL = window.location.href;
    let menuURL = currentURL.replace("admin.html", "index.html");
    
    // Default to the production Vercel URL for professional shareable QR codes
    if (currentURL.includes("localhost") || currentURL.includes("127.0.0.1") || currentURL.startsWith("file:")) {
        menuURL = "https://degisik-mutfak-menu.vercel.app/";
    } else {
        menuURL = currentURL.replace("admin.html", "");
    }
    qrUrlInput.value = menuURL;

    // 2. Initialise QR Code Generator
    updateQRCode();

    // 3. Load Menu Items from localStorage
    loadMenuItems();

    // 4. Bind events
    qrUrlInput.addEventListener("input", updateQRCode);
    qrColorDarkInput.addEventListener("input", (e) => {
        qrColorDarkLbl.textContent = e.target.value;
        updateQRCode();
    });
    qrColorLightInput.addEventListener("input", (e) => {
        qrColorLightLbl.textContent = e.target.value;
        updateQRCode();
    });
    btnDownloadQr.addEventListener("click", downloadQRCode);
    menuItemForm.addEventListener("submit", handleFormSubmit);
    btnCancelEdit.addEventListener("click", resetForm);
    btnResetDefaults.addEventListener("click", handleResetMenu);
}

// Update the generated QR Code SVG/Canvas
function updateQRCode() {
    qrBox.innerHTML = ""; // Clear old QR Code
    
    const textVal = qrUrlInput.value.trim() || window.location.href;
    const colorDark = qrColorDarkInput.value;
    const colorLight = qrColorLightInput.value;

    try {
        qrGenerator = new QRCode(qrBox, {
            text: textVal,
            width: 256,
            height: 256,
            colorDark: colorDark,
            colorLight: colorLight,
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (err) {
        console.error("Error generating QR code", err);
    }
}

// Download Generated QR code as PNG image
function downloadQRCode() {
    // Attempt to find canvas or image element created inside qrBox
    const canvas = qrBox.querySelector("canvas");
    const img = qrBox.querySelector("img");
    
    let imageSrc = "";
    
    if (canvas) {
        imageSrc = canvas.toDataURL("image/png");
    } else if (img && img.src) {
        imageSrc = img.src;
    }

    if (!imageSrc) {
        alert("Karekod görseli oluşturulamadı. Lütfen sayfayı yenileyin.");
        return;
    }

    // Trigger local download link
    const downloadLink = document.createElement("a");
    downloadLink.href = imageSrc;
    downloadLink.download = `degisik-mutfak-karekod.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// CRUD: Load and render existing menu items in the admin panel
function loadMenuItems() {
    const savedMenu = localStorage.getItem("degisik_mutfak_menu");
    if (savedMenu) {
        try {
            menuItems = JSON.parse(savedMenu);
        } catch (e) {
            menuItems = [...defaultMenuItems];
            saveMenuToStorage();
        }
    } else {
        menuItems = [...defaultMenuItems];
        saveMenuToStorage();
    }
    renderAdminItemsList();
}

function saveMenuToStorage() {
    localStorage.setItem("degisik_mutfak_menu", JSON.stringify(menuItems));
}

function renderAdminItemsList() {
    adminItemsListEl.innerHTML = "";
    itemsCountEl.textContent = menuItems.length;

    if (menuItems.length === 0) {
        adminItemsListEl.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px;">
                Henüz menüye hiç ürün eklenmemiş. Formu kullanarak ekleyebilirsiniz.
            </div>
        `;
        return;
    }

    // Sort items by category so it's clean
    const sortedItems = [...menuItems].sort((a, b) => a.category.localeCompare(b.category));

    sortedItems.forEach(item => {
        const row = document.createElement("div");
        row.className = "admin-item-row";

        const categoryLabels = {
            starters: "Girişler",
            mains: "Ana Yemekler",
            desserts: "Tatlılar",
            drinks: "İçecekler"
        };

        row.innerHTML = `
            <div class="admin-item-info">
                <img class="admin-item-thumb" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&auto=format&fit=crop';">
                <div class="admin-item-text">
                    <h4>${item.name}</h4>
                    <p>${categoryLabels[item.category] || item.category} — <strong>${item.price} ₺</strong></p>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-icon" onclick="editItem('${item.id}')" title="Düzenle">
                    ✏️
                </button>
                <button class="btn-icon delete" onclick="deleteItem('${item.id}')" title="Sil">
                    🗑️
                </button>
            </div>
        `;
        adminItemsListEl.appendChild(row);
    });
}

// Add/Update Form Handler
function handleFormSubmit(e) {
    e.preventDefault();

    const id = editItemIdInput.value;
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const category = itemCategorySelect.value;
    const description = itemDescTextarea.value.trim();
    
    // Set default fallback images if empty
    let image = itemImageInput.value.trim();
    if (!image) {
        if (category === "starters") image = "assets/salad.png";
        else if (category === "desserts") image = "assets/dessert.png";
        else if (category === "drinks") image = "assets/drink.png";
        else image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop";
    }

    // Process Tags
    const tags = [];
    if (tagChefCheckbox.checked) tags.push("chef");
    if (tagVeggieCheckbox.checked) tags.push("veggie");
    if (tagVeganCheckbox.checked) tags.push("vegan");
    if (tagSpicyCheckbox.checked) tags.push("spicy");

    // Process Allergens
    const allergensText = itemAllergensInput.value.trim();
    const allergens = allergensText 
        ? allergensText.split(",").map(a => a.trim()).filter(a => a !== "")
        : [];

    if (id) {
        // Edit Mode: Update existing
        const index = menuItems.findIndex(item => item.id === id);
        if (index !== -1) {
            menuItems[index] = { id, name, price, category, description, image, tags, allergens };
        }
    } else {
        // Add Mode: Insert new item
        const newId = Date.now().toString(); // simple unique ID
        menuItems.push({ id: newId, name, price, category, description, image, tags, allergens });
    }

    saveMenuToStorage();
    renderAdminItemsList();
    resetForm();
}

// Load item into Form for editing
window.editItem = function(id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    editItemIdInput.value = item.id;
    itemNameInput.value = item.name;
    itemPriceInput.value = item.price;
    itemCategorySelect.value = item.category;
    itemDescTextarea.value = item.description;
    
    // Skip setting default images in URL to avoid clunky strings
    if (item.image && !item.image.startsWith("assets/") && !item.image.startsWith("https://images.unsplash.com")) {
        itemImageInput.value = item.image;
    } else {
        itemImageInput.value = "";
    }

    // Load Checkboxes
    tagChefCheckbox.checked = item.tags ? item.tags.includes("chef") : false;
    tagVeggieCheckbox.checked = item.tags ? item.tags.includes("veggie") : false;
    tagVeganCheckbox.checked = item.tags ? item.tags.includes("vegan") : false;
    tagSpicyCheckbox.checked = item.tags ? item.tags.includes("spicy") : false;

    // Load Allergens
    itemAllergensInput.value = item.allergens ? item.allergens.join(", ") : "";

    // Toggle button display state
    formCardTitle.innerHTML = `<span style="font-size: 20px;">✏️</span> Ürünü Düzenle`;
    btnSubmitForm.textContent = "Değişiklikleri Kaydet";
    btnCancelEdit.style.display = "inline-flex";
    
    // Scroll to form smoothly
    menuItemForm.scrollIntoView({ behavior: 'smooth' });
};

// Delete item
window.deleteItem = function(id) {
    if (confirm("Bu ürünü menüden silmek istediğinize emin misiniz?")) {
        menuItems = menuItems.filter(item => item.id !== id);
        saveMenuToStorage();
        renderAdminItemsList();
        if (editItemIdInput.value === id) {
            resetForm();
        }
    }
};

// Reset Form to initial add state
function resetForm() {
    menuItemForm.reset();
    editItemIdInput.value = "";
    formCardTitle.innerHTML = `<span style="font-size: 20px;">🥗</span> Yeni Ürün Ekle`;
    btnSubmitForm.textContent = "Ürünü Menüye Ekle";
    btnCancelEdit.style.display = "none";
}

// Reset entire menu database to defaults
function handleResetMenu() {
    if (confirm("Tüm menü içeriğini fabrika ayarlarına sıfırlamak istiyor musunuz? Eklediğiniz yeni ürünler silinecektir.")) {
        menuItems = [...defaultMenuItems];
        saveMenuToStorage();
        renderAdminItemsList();
        resetForm();
    }
}

// Run on boot
window.addEventListener("DOMContentLoaded", initAdmin);
