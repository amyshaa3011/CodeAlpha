let cart = [];

// Load cart from localStorage
function loadCart() {
  cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartIcon();
  renderCart();
}

// Update cart icon count
function updateCartIcon() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = cart.length;
  }
}

// Render cart items and total
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  if (!cartItemsContainer || !cartTotalContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalContainer.innerText = cart.length ? `Total: ₹${total.toFixed(2)}` : "Your cart is empty.";
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartIcon();
  renderCart();
}

// Add item to cart
function addToCart(name, price, img) {
  const product = { name, price, img };
  cart.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartIcon();
}

// On DOM loaded, bind checkout logic
document.addEventListener("DOMContentLoaded", function () {
  loadCart();

  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
      const confirmPay = confirm(`Your total is ₹${total.toFixed(2)}. Proceed to payment?`);

      if (confirmPay) {
        alert("Redirecting to payment gateway... (Simulation)");

        // Clear cart
        cart = [];
        localStorage.removeItem("cartItems");
        updateCartIcon();
        renderCart();
      }
    });
  }
});
