document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // SIGN UP FUNCTIONALITY
  if (signupForm) {
    const profileInput = document.getElementById("profilePic");

    // Optional: Image preview before upload
    profileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          let previewImg = document.getElementById("previewImg");
          if (!previewImg) {
            previewImg = document.createElement("img");
            previewImg.id = "previewImg";
            previewImg.style.width = "80px";
            previewImg.style.marginTop = "10px";
            signupForm.appendChild(previewImg);
          }
          previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const profilePic = profileInput.files[0];

      // Gmail-only check
      if (!email.endsWith("@gmail.com")) {
        alert("Only Gmail addresses are allowed.");
        return;
      }

      // Password length check
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      // Check if account with same email already exists
      const existingUser = JSON.parse(localStorage.getItem("dflick_user"));
      if (existingUser && existingUser.email === email) {
        alert("This Gmail is already registered.");
        return;
      }

      // Convert image to base64 and save user
      const reader = new FileReader();
      reader.onload = function () {
        const profilePicData = reader.result;

        const user = {
          name,
          email,
          password,
          profilePic: profilePicData,
        };

        localStorage.setItem("dflick_user", JSON.stringify(user));
        alert("Account created successfully!");
        window.location.href = "dflick-signin.html";
      };

      reader.readAsDataURL(profilePic);
    });
  }

  // LOGIN FUNCTIONALITY
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      const savedUser = JSON.parse(localStorage.getItem("dflick_user"));

      if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
        alert("Invalid email or password.");
        return;
      }

      alert("Login successful!");
      window.location.href = "dflick.html";
    });
  }
});
