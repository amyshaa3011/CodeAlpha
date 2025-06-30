document.addEventListener("DOMContentLoaded", () => {
  // Page detection
  const isSignupPage = document.getElementById("signup-name") !== null;
  const isLoginPage = document.getElementById("login-email") !== null;

  // Shared: Host/Join elements (for login page)
  const meetingOptions = document.getElementById("meeting-options");
  const meetingCodeInput = document.getElementById("meeting-code");
  const loginSection = document.getElementById("login-section");

  // ========== SIGNUP ==========
  if (isSignupPage) {
    document.querySelector("button[onclick='register()']").addEventListener("click", () => {
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirm = document.getElementById("signup-confirm").value;

      if (!email.endsWith("@gmail.com")) {
        alert("Only Gmail addresses allowed.");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("dconnect_user", JSON.stringify(user));
      alert("Sign up successful! Redirecting to login...");
      window.location.href = "dconnect-signin.html";
    });
  }

  // ========== LOGIN ==========
  if (isLoginPage) {
    document.querySelector("button[onclick='login()']").addEventListener("click", () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      const user = JSON.parse(localStorage.getItem("dconnect_user"));

      if (!user || user.email !== email || user.password !== password) {
        alert("Invalid email or password.");
        return;
      }

      loginSection.style.display = "none";
      meetingOptions.style.display = "block";
    });

    // Host Meeting
    document.querySelector("button[onclick='hostMeeting()']").addEventListener("click", () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem("dconnect_room_code", code);
      alert("Your meeting code: " + code);
      window.location.href = "dconnect.html?room=" + code;
    });

    // Join Meeting
    document.querySelector("button[onclick='joinMeeting()']").addEventListener("click", () => {
      const enteredCode = meetingCodeInput.value.trim().toUpperCase();
      const storedCode = localStorage.getItem("dconnect_room_code");

      if (enteredCode === storedCode) {
        window.location.href = "dconnect.html?room=" + enteredCode;
      } else {
        alert("Invalid meeting code.");
      }
    });

    // Logout (optional)
    const logoutBtn = document.querySelector(".logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }
});
