// ============================================================
// 1. FIREBASE IMPORTS & CONFIG (Realtime Database)
// ============================================================
import { initializeApp } from "firebase/app";
import { 
    getDatabase, 
    ref, 
    set, 
    get, 
    push, 
    update, 
    onValue,
    remove,
    child 
} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCK62nNEdeCfUMisnXRg71Qvdfq2r1xaYw",
    authDomain: "greenbasket-c2ca3.firebaseapp.com",
    databaseURL: "https://greenbasket-c2ca3-default-rtdb.firebaseio.com",
    projectId: "greenbasket-c2ca3",
    storageBucket: "greenbasket-c2ca3.firebasestorage.app",
    messagingSenderId: "1035751811446",
    appId: "1:1035751811446:web:01b218266c7165c60c7257"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log('✅ Firebase Realtime Database initialized');

// ============================================================
// 2. SEED DATA (Mock data for Realtime Database)
// ============================================================
const SEED_PRODUCTS = [
    {
        id: 'p1',
        name: 'Basmati Rice',
        category: 'Grains',
        price: 120,
        quantity: 50,
        location: 'Chitwan, Nepal',
        harvestDate: '2026-05-18',
        imageEmoji: '🍚',
        description: 'Premium quality Basmati rice with rich aroma and great taste. Grown naturally in fertile land.',
        riceType: 'Basmati',
        harvestYear: '2024',
        available: 50
    },
    {
        id: 'p2',
        name: 'Local Tomato',
        category: 'Vegetables',
        price: 80,
        quantity: 30,
        location: 'Kathmandu',
        harvestDate: '2026-06-19',
        imageEmoji: '🍅',
        description: 'Fresh organic tomatoes grown in the hills of Kathmandu. Perfect for salads and cooking.',
        riceType: null,
        harvestYear: null,
        available: 30
    },
    {
        id: 'p3',
        name: 'Fresh Cauliflower',
        category: 'Vegetables',
        price: 90,
        quantity: 25,
        location: 'Pokhara, Kaski',
        harvestDate: '2026-06-19',
        imageEmoji: '🥦',
        description: 'Crisp and fresh cauliflower harvested from the farms of Pokhara.',
        riceType: null,
        harvestYear: null,
        available: 25
    },
    {
        id: 'p4',
        name: 'Red Apple',
        category: 'Fruits',
        price: 150,
        quantity: 40,
        location: 'Juliet, Mustang',
        harvestDate: '2026-06-16',
        imageEmoji: '🍎',
        description: 'Sweet and juicy red apples from the highlands of Mustang.',
        riceType: null,
        harvestYear: null,
        available: 40
    },
    {
        id: 'p5',
        name: 'Local Rice (Medium)',
        category: 'Grains',
        price: 110,
        quantity: 60,
        location: 'Chitwan',
        harvestDate: '2026-06-11',
        imageEmoji: '🌾',
        description: 'Medium-grain local rice, perfect for daily meals. Grown in Chitwan.',
        riceType: 'Local Rice',
        harvestYear: '2024',
        available: 60
    },
    {
        id: 'p6',
        name: 'Fresh Carrot',
        category: 'Vegetables',
        price: 70,
        quantity: 45,
        location: 'Bhaktapur',
        harvestDate: '2026-06-20',
        imageEmoji: '🥕',
        description: 'Crunchy and sweet carrots from Bhaktapur farms.',
        riceType: null,
        harvestYear: null,
        available: 45
    }
];

const SEED_ORDERS = [
    {
        id: 'o1',
        productName: 'Basmati Rice',
        productId: 'p1',
        quantity: 5,
        price: 120,
        totalPrice: 600,
        date: 'May 25, 2025',
        time: '10:30 AM',
        status: 'Pending',
        imageEmoji: '🍚'
    },
    {
        id: 'o2',
        productName: 'Fresh Cauliflower',
        productId: 'p3',
        quantity: 3,
        price: 90,
        totalPrice: 270,
        date: 'May 24, 2025',
        time: '03:15 PM',
        status: 'Accepted',
        imageEmoji: '🥦'
    },
    {
        id: 'o3',
        productName: 'Local Tomato',
        productId: 'p2',
        quantity: 2,
        price: 80,
        totalPrice: 160,
        date: 'May 20, 2025',
        time: '11:20 AM',
        status: 'Completed',
        imageEmoji: '🍅'
    }
];

const SEED_REQUESTS = [
    {
        id: 'r1',
        productName: 'Local Tomato',
        productId: 'p2',
        customerPrice: 80,
        yourPrice: 80,
        date: 'May 25, 2025',
        status: 'Pending'
    },
    {
        id: 'r2',
        productName: 'Basmati Rice',
        productId: 'p1',
        customerPrice: 100,
        yourPrice: 120,
        date: 'May 24, 2025',
        status: 'Accepted'
    },
    {
        id: 'r3',
        productName: 'Red Apple',
        productId: 'p4',
        customerPrice: 120,
        yourPrice: 150,
        date: 'May 22, 2025',
        status: 'Rejected'
    }
];

// ============================================================
// 3. GLOBAL STATE
// ============================================================
let allProducts = [];
let allOrders = [];
let allRequests = [];
let rtdbConnected = false;

let currentScreen = 'home';
let selectedProductId = null;
let listingFilter = 'all';
let orderFilter = 'all';
let requestFilter = 'all';
let homeFilter = 'all';
let homeSearchTerm = '';
let listingSearchTerm = '';
let detailQty = 1;

// ============================================================
// 4. DOM REFS
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screenContainer = $('#screenContainer');
const homeProductsEl = $('#homeProducts');
const listingProductsEl = $('#listingProducts');
const detailContentEl = $('#detailContent');
const orderListEl = $('#orderList');
const requestListEl = $('#requestList');
const homeSearchInput = $('#homeSearch');
const listingSearchInput = $('#listingSearch');
const orderBadge = $('#orderBadge');
const requestBadge = $('#requestBadge');
const toastEl = $('#toast');
const totalOrdersEl = $('#totalOrders');
const totalRequestsEl = $('#totalRequests');
const firebaseStatusEl = $('#firebaseStatus');

let toastTimer = null;

// ============================================================
// 5. TOAST
// ============================================================
function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// ============================================================
// 6. NAVIGATION
// ============================================================
window.navigateTo = function(screen, data) {
    if (screen === 'detail' && data) {
        selectedProductId = data;
        renderDetail(selectedProductId);
    }

    $$('.screen').forEach(el => el.classList.remove('active'));

    const targetMap = {
        home: 'screen-home',
        categories: 'screen-categories',
        detail: 'screen-detail',
        orders: 'screen-orders',
        saved: 'screen-saved',
        profile: 'screen-profile'
    };
    const targetId = targetMap[screen];
    if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.classList.add('active');
    }

    $$('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === screen);
    });

    currentScreen = screen;
    screenContainer.scrollTop = 0;

    if (screen === 'home') renderHome();
    if (screen === 'categories') renderListing();
    if (screen === 'orders') renderOrders();
    if (screen === 'saved') renderRequests();
    if (screen === 'profile') updateProfileStats();

    updateBadges();
};

// ============================================================
// 7. REALTIME DATABASE HELPERS
// ============================================================
function updateRtdbStatus(connected, message = '') {
    rtdbConnected = connected;
    if (firebaseStatusEl) {
        if (connected) {
            firebaseStatusEl.className = 'firebase-status connected';
            firebaseStatusEl.textContent = '✅ RTDB Connected' + (message ? ' • ' + message : '');
        } else {
            firebaseStatusEl.className = 'firebase-status disconnected';
            firebaseStatusEl.textContent = '⚠️ Using Local Data' + (message ? ' • ' + message : '');
        }
    }
}

// -------- Seed Realtime Database --------
async function seedRealtimeDatabase() {
    try {
        console.log('🌱 Seeding Realtime Database...');

        // Check if products exist
        const productsSnap = await get(ref(db, 'products'));
        if (!productsSnap.exists()) {
            const productData = {};
            SEED_PRODUCTS.forEach(p => {
                productData[p.id] = p;
            });
            await set(ref(db, 'products'), productData);
            console.log('✅ Seeded products to RTDB');
        } else {
            console.log('✅ Products already exist in RTDB');
        }

        // Check if orders exist
        const ordersSnap = await get(ref(db, 'orders'));
        if (!ordersSnap.exists()) {
            const orderData = {};
            SEED_ORDERS.forEach(o => {
                orderData[o.id] = o;
            });
            await set(ref(db, 'orders'), orderData);
            console.log('✅ Seeded orders to RTDB');
        } else {
            console.log('✅ Orders already exist in RTDB');
        }

        // Check if priceRequests exist
        const requestsSnap = await get(ref(db, 'priceRequests'));
        if (!requestsSnap.exists()) {
            const requestData = {};
            SEED_REQUESTS.forEach(r => {
                requestData[r.id] = r;
            });
            await set(ref(db, 'priceRequests'), requestData);
            console.log('✅ Seeded price requests to RTDB');
        } else {
            console.log('✅ Price requests already exist in RTDB');
        }

        updateRtdbStatus(true, 'Data synced');
        return true;
    } catch (error) {
        console.error('❌ RTDB seeding error:', error);
        updateRtdbStatus(false, error.message);
        return false;
    }
}

// -------- Fetch data from RTDB --------
async function fetchProducts() {
    try {
        const snap = await get(ref(db, 'products'));
        if (snap.exists()) {
            const data = snap.val();
            const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            console.log(`📦 Loaded ${list.length} products from RTDB`);
            updateRtdbStatus(true, 'Products loaded');
            return list;
        }
        // If empty, seed then try again
        await seedRealtimeDatabase();
        const snap2 = await get(ref(db, 'products'));
        if (snap2.exists()) {
            const data = snap2.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        return SEED_PRODUCTS;
    } catch (error) {
        console.warn('⚠️ RTDB fetch failed, using mock data:', error);
        updateRtdbStatus(false, 'Using local data');
        return SEED_PRODUCTS;
    }
}

async function fetchOrders() {
    try {
        const snap = await get(ref(db, 'orders'));
        if (snap.exists()) {
            const data = snap.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        await seedRealtimeDatabase();
        const snap2 = await get(ref(db, 'orders'));
        if (snap2.exists()) {
            const data = snap2.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        return SEED_ORDERS;
    } catch (error) {
        console.warn('⚠️ RTDB fetch failed, using mock data:', error);
        return SEED_ORDERS;
    }
}

async function fetchRequests() {
    try {
        const snap = await get(ref(db, 'priceRequests'));
        if (snap.exists()) {
            const data = snap.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        await seedRealtimeDatabase();
        const snap2 = await get(ref(db, 'priceRequests'));
        if (snap2.exists()) {
            const data = snap2.val();
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        return SEED_REQUESTS;
    } catch (error) {
        console.warn('⚠️ RTDB fetch failed, using mock data:', error);
        return SEED_REQUESTS;
    }
}

// -------- Save order to RTDB --------
async function saveOrderToRTDB(order) {
    try {
        // Generate a new unique key
        const newOrderRef = push(ref(db, 'orders'));
        await set(newOrderRef, order);
        const newId = newOrderRef.key;
        return { ...order, id: newId };
    } catch (error) {
        console.error('❌ Failed to save order to RTDB:', error);
        return null;
    }
}

// -------- Update product availability --------
async function updateProductAvailability(productId, newAvailable) {
    try {
        await update(ref(db, `products/${productId}`), {
            available: newAvailable,
            quantity: newAvailable
        });
        return true;
    } catch (error) {
        console.error('❌ Failed to update product:', error);
        return false;
    }
}

// -------- Update request status --------
async function updateRequestStatus(requestId, newStatus) {
    try {
        await update(ref(db, `priceRequests/${requestId}`), { status: newStatus });
        return true;
    } catch (error) {
        console.error('❌ Failed to update request:', error);
        return false;
    }
}

// ============================================================
// 8. RENDER: HOME
// ============================================================
function renderHome() {
    let filtered = [...allProducts];
    if (homeFilter !== 'all') {
        filtered = filtered.filter(p => p.category === homeFilter);
    }
    if (homeSearchTerm.trim()) {
        const term = homeSearchTerm.trim().toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
    }
    filtered = filtered.slice(0, 4);

    if (filtered.length === 0) {
        homeProductsEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No products found</p>
            </div>
        `;
        return;
    }

    homeProductsEl.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="navigateTo('detail','${p.id}')">
            <div class="product-img">
                ${p.imageEmoji || '🌿'}
                <span class="tag">FRESH</span>
            </div>
            <div class="product-body">
                <div class="name">${p.name}</div>
                <div class="price">Rs. ${p.price} / kg</div>
                <div class="meta"><i class="fas fa-map-marker-alt"></i> ${p.location || 'Nepal'}</div>
            </div>
        </div>
    `).join('');
}

window.filterHomeProducts = function(cat) {
    homeFilter = cat;
    document.querySelectorAll('#homeCategories .chip').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === cat);
    });
    renderHome();
};

homeSearchInput.addEventListener('input', (e) => {
    homeSearchTerm = e.target.value;
    renderHome();
});

// ============================================================
// 9. RENDER: LISTING
// ============================================================
function renderListing() {
    let filtered = [...allProducts];
    if (listingFilter !== 'all') {
        filtered = filtered.filter(p => p.category === listingFilter);
    }
    if (listingSearchTerm.trim()) {
        const term = listingSearchTerm.trim().toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
    }

    if (filtered.length === 0) {
        listingProductsEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>No products in this category</p>
            </div>
        `;
        return;
    }

    listingProductsEl.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="navigateTo('detail','${p.id}')">
            <div class="product-img">
                ${p.imageEmoji || '🌿'}
                <span class="tag">${p.category}</span>
            </div>
            <div class="product-body">
                <div class="name">${p.name}</div>
                <div class="price">Rs. ${p.price} / kg</div>
                <div class="meta"><i class="fas fa-map-marker-alt"></i> ${p.location || 'Nepal'} · Harvested: ${p.harvestDate || 'N/A'}</div>
            </div>
        </div>
    `).join('');
}

window.filterListing = function(cat) {
    listingFilter = cat;
    document.querySelectorAll('#listingFilters .tab').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === cat);
    });
    renderListing();
};

listingSearchInput.addEventListener('input', (e) => {
    listingSearchTerm = e.target.value;
    renderListing();
});

// ============================================================
// 10. RENDER: DETAIL
// ============================================================
async function renderDetail(productId) {
    let product = allProducts.find(p => p.id === productId);
    if (!product) {
        try {
            const snap = await get(ref(db, `products/${productId}`));
            if (snap.exists()) {
                product = { id: productId, ...snap.val() };
            }
        } catch (e) {}
    }
    if (!product) {
        product = SEED_PRODUCTS.find(p => p.id === productId);
    }
    if (!product) {
        detailContentEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Product not found</p>
                <button class="btn-primary" style="margin-top:16px;max-width:200px;margin-left:auto;margin-right:auto;" onclick="navigateTo('categories')">Go Back</button>
            </div>
        `;
        return;
    }

    detailQty = 1;
    const isRice = product.category === 'Grains';

    detailContentEl.innerHTML = `
        <div class="detail-image">${product.imageEmoji || '🌿'}</div>
        <div class="detail-title">${product.name}</div>
        <div class="detail-price">Rs. ${product.price} / kg</div>
        <div class="detail-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${product.location || 'Nepal'}</span>
            <span><i class="fas fa-calendar-alt"></i> Harvested: ${product.harvestDate || 'N/A'}</span>
        </div>

        <div class="detail-about">
            <h4>About this product</h4>
            <p>${product.description || 'Fresh produce from local farms.'}</p>
            ${isRice ? `
                <div class="info-row"><span class="label">Rice Type</span><span class="value">${product.riceType || 'N/A'}</span></div>
                <div class="info-row"><span class="label">Harvest Year</span><span class="value">${product.harvestYear || 'N/A'}</span></div>
            ` : ''}
            <div class="info-row"><span class="label">Available</span><span class="value">${product.available || product.quantity || 0} kg</span></div>
        </div>

        <div class="quantity-row">
            <label>Quantity (kg)</label>
            <div class="qty-control">
                <button onclick="changeQty(-1)">−</button>
                <span id="detailQtyDisplay">1</span>
                <button onclick="changeQty(1)">+</button>
            </div>
            <span class="bulk-label">Bulk Order (5+ kg)</span>
        </div>

        <button class="btn-primary" onclick="placeOrder('${product.id}')">
            <i class="fas fa-shopping-bag"></i> Place Order
        </button>
    `;
}

window.changeQty = function(delta) {
    detailQty = Math.max(1, detailQty + delta);
    const display = document.getElementById('detailQtyDisplay');
    if (display) display.textContent = detailQty;
};

window.placeOrder = async function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        showToast('Product not found');
        return;
    }
    if (detailQty > (product.available || product.quantity || 0)) {
        showToast(`Only ${product.available || product.quantity} kg available`);
        return;
    }

    const newOrder = {
        productName: product.name,
        productId: product.id,
        quantity: detailQty,
        price: product.price,
        totalPrice: product.price * detailQty,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        status: 'Pending',
        imageEmoji: product.imageEmoji || '🌿'
    };

    // Save to RTDB
    const savedOrder = await saveOrderToRTDB(newOrder);
    if (savedOrder) {
        // Update product availability in RTDB
        const newAvail = (product.available || product.quantity) - detailQty;
        await updateProductAvailability(productId, newAvail);
        product.available = newAvail;
        product.quantity = newAvail;
        allOrders.push(savedOrder);
        showToast(`✅ Order placed! ${detailQty} kg ${product.name}`);
    } else {
        // Fallback: save locally
        const mockOrder = { ...newOrder, id: 'o' + Date.now() };
        allOrders.push(mockOrder);
        showToast(`⚠️ Order saved locally (RTDB error)`);
    }

    renderOrders();
    updateBadges();
    updateProfileStats();
    navigateTo('orders');
};

// ============================================================
// 11. RENDER: ORDERS
// ============================================================
function renderOrders() {
    let filtered = [...allOrders];
    if (orderFilter !== 'all') {
        filtered = filtered.filter(o => o.status === orderFilter);
    }
    filtered.sort((a, b) => (a.date > b.date ? -1 : 1));

    if (filtered.length === 0) {
        orderListEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No orders found</p>
            </div>
        `;
        return;
    }

    orderListEl.innerHTML = filtered.map(o => `
        <div class="order-card">
            <div class="order-icon">${o.imageEmoji || '📦'}</div>
            <div class="order-info">
                <div class="name">${o.productName}</div>
                <div class="sub">
                    <span>${o.quantity} kg × Rs. ${o.price}</span>
                    <span>${o.date} · ${o.time}</span>
                </div>
            </div>
            <div class="order-right">
                <div class="total">Rs. ${o.totalPrice}</div>
                <span class="status ${o.status.toLowerCase()}">${o.status}</span>
            </div>
        </div>
    `).join('');
}

window.filterOrders = function(status) {
    orderFilter = status;
    document.querySelectorAll('#orderFilters .tab').forEach(el => {
        el.classList.toggle('active', el.dataset.status === status);
    });
    renderOrders();
};

// ============================================================
// 12. RENDER: SAVED (PRICE REQUESTS)
// ============================================================
function renderRequests() {
    let filtered = [...allRequests];
    if (requestFilter !== 'all') {
        filtered = filtered.filter(r => r.status === requestFilter);
    }
    filtered.sort((a, b) => (a.date > b.date ? -1 : 1));

    if (filtered.length === 0) {
        requestListEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-handshake"></i>
                <p>No price requests</p>
            </div>
        `;
        return;
    }

    requestListEl.innerHTML = filtered.map(r => `
        <div class="request-card" data-id="${r.id}">
            <div class="req-header">
                <span class="name">${r.productName}</span>
                <span class="status-badge status ${r.status.toLowerCase()}">${r.status}</span>
            </div>
            <div class="req-body">
                <div class="prices">
                    Customer Price: <strong>Rs. ${r.customerPrice}</strong> / kg &nbsp;·&nbsp;
                    Your Price: <strong>Rs. ${r.yourPrice}</strong> / kg
                </div>
                <div class="date">${r.date}</div>
            </div>
            ${r.status === 'Pending' ? `
                <div class="req-actions">
                    <button class="btn-small accept" onclick="handleRequest('${r.id}','accept')">✓ Accept</button>
                    <button class="btn-small reject" onclick="handleRequest('${r.id}','reject')">✕ Reject</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

window.filterRequests = function(status) {
    requestFilter = status;
    document.querySelectorAll('#requestFilters .tab').forEach(el => {
        el.classList.toggle('active', el.dataset.status === status);
    });
    renderRequests();
};

window.handleRequest = async function(requestId, action) {
    const newStatus = action === 'accept' ? 'Accepted' : 'Rejected';
    
    // Update in RTDB
    const success = await updateRequestStatus(requestId, newStatus);
    if (success) {
        const req = allRequests.find(r => r.id === requestId);
        if (req) {
            req.status = newStatus;
        }
        showToast(`✅ Request ${newStatus}`);
    } else {
        // Fallback: update locally
        const req = allRequests.find(r => r.id === requestId);
        if (req) {
            req.status = newStatus;
            showToast(`⚠️ Updated locally (RTDB error)`);
        } else {
            showToast('❌ Failed to update request');
            return;
        }
    }

    renderRequests();
    updateBadges();
    updateProfileStats();
};

// ============================================================
// 13. BADGES
// ============================================================
function updateBadges() {
    const pendingOrders = allOrders.filter(o => o.status === 'Pending');
    if (pendingOrders.length > 0) {
        orderBadge.style.display = 'flex';
        orderBadge.textContent = pendingOrders.length;
    } else {
        orderBadge.style.display = 'none';
    }

    const pendingReqs = allRequests.filter(r => r.status === 'Pending');
    if (pendingReqs.length > 0) {
        requestBadge.style.display = 'flex';
        requestBadge.textContent = pendingReqs.length;
    } else {
        requestBadge.style.display = 'none';
    }
}

// ============================================================
// 14. PROFILE STATS
// ============================================================
function updateProfileStats() {
    if (totalOrdersEl) {
        totalOrdersEl.textContent = allOrders.length;
    }
    if (totalRequestsEl) {
        totalRequestsEl.textContent = allRequests.length;
    }
}

// ============================================================
// 15. STATUS BAR TIME
// ============================================================
function updateStatusTime() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('statusTime').textContent = `${h}:${m}`;
}
updateStatusTime();
setInterval(updateStatusTime, 30000);

// ============================================================
// 16. INIT
// ============================================================
async function init() {
    console.log('🌿 Initializing GreenBasket with Realtime Database...');
    
    // Seed RTDB if needed
    await seedRealtimeDatabase();
    
    // Load data
    allProducts = await fetchProducts();
    allOrders = await fetchOrders();
    allRequests = await fetchRequests();

    // Render all screens
    renderHome();
    renderListing();
    renderOrders();
    renderRequests();
    updateBadges();
    updateProfileStats();

    if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        if (allProducts.find(p => p.id === id)) {
            navigateTo('detail', id);
        }
    }

    console.log(`✅ GreenBasket ready! ${allProducts.length} products, ${allOrders.length} orders, ${allRequests.length} requests`);
    console.log(`📊 RTDB status: ${rtdbConnected ? 'Connected' : 'Using local data'}`);
    
    if (!rtdbConnected) {
        showToast('⚠️ Using local data - RTDB not available');
    } else {
        showToast('✅ Connected to Realtime Database');
    }
}

window.navigateTo = navigateTo;
window.showToast = showToast;
window.seedRealtimeDatabase = seedRealtimeDatabase;

init();

// ============================================================
// 17. KEYBOARD SHORTCUT
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentScreen === 'detail') navigateTo('categories');
        else if (currentScreen !== 'home') navigateTo('home');
    }
});

console.log('✅ App initialized with RTDB');