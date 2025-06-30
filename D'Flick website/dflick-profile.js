document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("dflick_user")) || {};
  const profilePic = document.getElementById("profilePic");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");

  const bioText = document.getElementById("bioText");
  const bioInput = document.getElementById("bioInput");
  const saveBtn = document.getElementById("saveBioBtn");
  const editBtn = document.getElementById("editBioBtn");

  if (user) {
    if (profilePic) profilePic.src = user.profilePic || "";
    if (userName) userName.textContent = user.name || "";
    if (userEmail) userEmail.textContent = user.email || "";

    if (user.bio) {
      bioText.textContent = user.bio;
      bioText.style.display = "block";
      bioInput.style.display = "none";
      saveBtn.style.display = "none";
      editBtn.style.display = "inline-block";
    } else {
      bioInput.style.display = "block";
      saveBtn.style.display = "inline-block";
      editBtn.style.display = "none";
    }
  }

  saveBtn.addEventListener("click", () => {
    const newBio = bioInput.value.trim();
    if (newBio) {
      user.bio = newBio;
      localStorage.setItem("dflick_user", JSON.stringify(user));
      bioText.textContent = newBio;
      bioText.style.display = "block";
      bioInput.style.display = "none";
      saveBtn.style.display = "none";
      editBtn.style.display = "inline-block";
    }
  });

  editBtn.addEventListener("click", () => {
    bioInput.value = user.bio || "";
    bioText.style.display = "none";
    bioInput.style.display = "block";
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
  });

  // Render posts with delete option
  const userPostsContainer = document.getElementById("userPostsContainer");
  let posts = JSON.parse(localStorage.getItem("dflick_posts")) || [];

  function renderUserPosts() {
    userPostsContainer.innerHTML = "";

    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <img src="${post.image}" alt="Post" />
        <p>${post.caption || ''}</p>
        <small>${post.time}</small>
        <button class="delete-post-btn" data-index="${index}">Delete</button>
      `;
      userPostsContainer.appendChild(div);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-post-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        posts.splice(index, 1);
        localStorage.setItem("dflick_posts", JSON.stringify(posts));
        renderUserPosts();
      });
    });
  }

  renderUserPosts();

  // Dark Mode
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});
