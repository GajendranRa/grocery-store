const products = [
  { id: 1, name: "Fresh Apples", price: 120, emoji: "🍎", category: "fruits" },
  { id: 2, name: "Bananas", price: 40, emoji: "🍌", category: "fruits" },
  { id: 3, name: "Mangoes", price: 200, emoji: "🥭", category: "fruits" },
  { id: 4, name: "Broccoli", price: 80, emoji: "🥦", category: "vegetables" },
  { id: 5, name: "Carrots", price: 50, emoji: "🥕", category: "vegetables" },
  { id: 6, name: "Tomatoes", price: 60, emoji: "🍅", category: "vegetables" },
  { id: 7, name: "Milk (1L)", price: 65, emoji: "🥛", category: "dairy" },
  { id: 8, name: "Paneer", price: 150, emoji: "🧀", category: "dairy" },
  { id: 9, name: "Curd", price: 45, emoji: "🍶", category: "dairy" },
  { id: 10, name: "Whole Wheat Bread", price: 55, emoji: "🍞", category: "bakery" },
  { id: 11, name: "Croissant", price: 40, emoji: "🥐", category: "bakery" },
  { id: 12, name: "Baguette", price: 70, emoji: "🥖", category: "bakery" },
];

let cart = [];
let currentFilter = "all";

function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <div class="price">₹${p.price}</div>
      <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function filterProducts(category) {
  currentFilter = category;
  renderProducts(category);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = total;
  const itemsDiv = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  } else {
    itemsDiv.innerHTML = cart.map(c => `
      <div class="cart-item">
        <span>${c.emoji} ${c.name} x${c.qty}</span>
        <span>₹${c.price * c.qty}</span>
        <button class="remove-btn" onclick="removeFromCart(${c.id})">🗑</button>
      </div>
    `).join("");
  }
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

function checkout() {
  if (cart.length === 0) { alert("Your cart is empty!"); return; }
  alert("✅ Order placed successfully! Thank you for shopping at FreshMart.");
  cart = [];
  updateCart();
  toggleCart();
}

renderProducts();