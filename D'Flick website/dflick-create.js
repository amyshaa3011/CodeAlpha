document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");

  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const imageFile = document.getElementById("postImage").files[0];
    const caption = document.getElementById("caption").value;

    const reader = new FileReader();
    reader.onload = function () {
      const post = {
        image: reader.result,
        caption: caption,
        time: new Date().toLocaleString()
      };

      let posts = JSON.parse(localStorage.getItem("dflick_posts")) || [];
      posts.unshift(post);
      localStorage.setItem("dflick_posts", JSON.stringify(posts));

      alert("Post uploaded successfully!");
      uploadForm.reset();
    };
    reader.readAsDataURL(imageFile);
  });

  // Dark Mode Toggle
  document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
