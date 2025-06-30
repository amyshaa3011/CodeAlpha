// e-commerce_planB.js

$(document).ready(function () {
  // Smooth scroll
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

let cart = [];

function addToCart(name, price, img) {
  const product = { name, price, img };
  cart.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartIcon();
}

function updateCartIcon() {
  const count = cart.length;
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = count;
  }
}

// Load cart from localStorage
window.onload = function () {
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart = savedCart;
  updateCartIcon();
};
