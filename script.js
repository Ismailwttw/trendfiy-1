// Sample Products Data
const products = [
  { id: 1, name: "Casual Streetwear Hoodie", price: 49.99, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500" },
  { id: 2, name: "Classic Denim Jacket", price: 69.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=500" },
  { id: 3, name: "Minimalist Sneakers", price: 89.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500" },
  { id: 4, name: "Urban Cargo Pants", price: 54.99, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500" }
];

let cart = [];

// Load products onto the page
function loadProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

// Toggle Cart Drawer
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("active");
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cartTotal");

  cartCount.innerText = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
    cartTotal.innerText = "$0.00";
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <span style="color:red; cursor:pointer;" onclick="removeFromCart(${index})">&times;</span>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Initialize on page load
loadProducts();
