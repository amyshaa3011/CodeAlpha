document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");
  const togglePassword = document.getElementById("show-password");
  const errorBox = document.getElementById("error-message");

  // ✅ Show/hide password toggle
  if (togglePassword) {
    togglePassword.addEventListener("change", function () {
      const type = this.checked ? "text" : "password";
      if (passwordInput) passwordInput.type = type;
      if (confirmInput) confirmInput.type = type;
    });
  }

  // ✅ Show "Account Created" alert only once on Sign In page
  if (localStorage.getItem("accountCreated") === "true") {
    alert("Account created successfully! Please sign in to continue.");
    localStorage.removeItem("accountCreated");
  }

  // ✅ Form Submit Handler
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.textContent = "";

      const email = emailInput?.value.trim();
      const password = passwordInput?.value;
      const confirmPassword = confirmInput?.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

      // Gmail-specific email format validation
      if (!emailRegex.test(email)) {
        errorBox.textContent = "Please enter a valid Gmail address (e.g., yourname@gmail.com).";
        return;
      }

      // Password length check
      if (password.length < 6) {
        errorBox.textContent = "Password must be at least 6 characters.";
        return;
      }

      // ✅ Sign Up Page Logic
      if (confirmInput) {
        if (password !== confirmPassword) {
          errorBox.textContent = "Passwords do not match.";
          return;
        }

        // ✅ Save credentials to localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("accountCreated", "true");

        // Redirect to Sign In page
        window.location.href = "d'hub-signin.html";
      }

      // ✅ Sign In Page Logic
      else {
        const savedEmail = localStorage.getItem("userEmail");
        const savedPassword = localStorage.getItem("userPassword");

        if (email === savedEmail && password === savedPassword) {
          // ✅ Successful login
          window.location.href = "d'hub.html";
        } else {
          errorBox.textContent = "Invalid email or password.";
        }
      }
    });
  }
});
