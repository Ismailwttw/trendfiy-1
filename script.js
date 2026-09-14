const products = [
  { id: 1, name: "Classic Hoodie", cat: "men", categoryName: "Men's Collection", price: 34.99, oldPrice: 49.99, badge: "New", badgeClass: "new", rating: "4.8", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
  { id: 2, name: "Premium Polo Shirt", cat: "men", categoryName: "Men's Collection", price: 24.99, oldPrice: 39.99, badge: "Best Seller", badgeClass: "bestseller", rating: "4.7", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500" },
  { id: 3, name: "Slim Fit Jeans", cat: "men", categoryName: "Jeans & Pants", price: 32.99, oldPrice: 54.99, badge: "Hot", badgeClass: "hot", rating: "4.6", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { id: 4, name: "Casual Sneakers", cat: "accessories", categoryName: "Shoes", price: 45.99, oldPrice: 69.99, badge: "Sale", badgeClass: "sale", rating: "4.8", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }
];

let cart = [];

function renderProducts(items) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = items.map(item => `
    <div class="product-card">
      <span class="badge ${item.badgeClass}">${item.badge}</span>
      <div class="wishlist"><i class="fa-regular fa-heart"></i></div>
      <img src="${item.image}" alt="${item.name}">
      <div class="product-details">
        <h4>${item.name}</h4>
        <p class="product-cat">${item.categoryName}</p>
        <div class="price-box">
          <span class="price">$${item.price}</span>
          <span class="old-price">$${item.oldPrice}</span>
        </div>
        <div class="stars">
          <i class="fa-solid fa-star"></i> (${item.rating})
        </div>
        <button class="add-btn" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function filterProducts(category) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.cat === category);
    renderProducts(filtered);
  }
}

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("active");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if(cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "$0.00";
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>
      <span style="color:red; cursor:pointer;" onclick="removeFromCart(${index})">&times;</span>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

renderProducts(products);
