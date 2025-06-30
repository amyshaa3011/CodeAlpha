document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("dflick_user"));
  const feedContainer = document.getElementById("feedContainer");

  // Restore dark mode if previously enabled
  const savedMode = localStorage.getItem("dflick_dark_mode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Dark mode toggle
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const mode = document.body.classList.contains("dark-mode") ? "enabled" : "disabled";
      localStorage.setItem("dflick_dark_mode", mode);
    });
  }

  // Load and display all posts with user info
  const posts = JSON.parse(localStorage.getItem("dflick_posts")) || [];

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const profilePic = post.user?.profilePic || "https://via.placeholder.com/35";
    const userName = post.user?.name || "Unknown User";

    postDiv.innerHTML = `
      <div class="post-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <img src="${profilePic}" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-primary);" alt="Profile">
        <strong>${userName}</strong>
      </div>
      <img src="${post.image}" alt="Post Image" />
      <p>${post.caption || ''}</p>
      <small>${post.time}</small>
      <div class="post-actions">
        <button class="like-btn"><i class='bx bx-heart'></i> Like</button>
        <button class="comment-btn"><i class='bx bx-comment'></i> Comment</button>
      </div>
    `;

    if (feedContainer) {
      feedContainer.appendChild(postDiv);
    }
  });

  // ---- Post Upload Handling (for dflick-create.html only) ---- //
  const form = document.getElementById("uploadForm");
  const postImage = document.getElementById("postImage");
  const captionInput = document.getElementById("caption");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!user) {
        alert("User not found. Please log in again.");
        return;
      }

      const file = postImage.files[0];
      const reader = new FileReader();

      reader.onload = function () {
        const imageData = reader.result;
        const caption = captionInput.value.trim();

        const post = {
          image: imageData,
          caption: caption,
          time: new Date().toLocaleString(),
          user: {
            name: user.name,
            profilePic: user.profilePic
          }
        };

        const posts = JSON.parse(localStorage.getItem("dflick_posts")) || [];
        posts.unshift(post); // Add to top
        localStorage.setItem("dflick_posts", JSON.stringify(posts));

        alert("Post created!");
        form.reset();
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image.");
      }
    });
  }
});
