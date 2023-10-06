async function editPost() {
  const API_BASE_URL = "https://api.noroff.dev";
  const showEditFormButton = document.getElementById("showEditFormButton");
  const editPostForm = document.getElementById("editPostForm");

  showEditFormButton.addEventListener("click", () => {
    editPostForm.style.display =
      editPostForm.style.display === "none" ? "block" : "none";
  });

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Destructure the formData object to get the postId
    const { postId, title, body } = Object.fromEntries(
      new FormData(event.target)
    );

    if (!postId) {
      console.error("Post ID is missing.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/social/posts/${postId}`,
        {
          method: "PUT",
          body: JSON.stringify({ title, body }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Post updated successfully.");
      } else {
        console.error("Failed to update the post.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
}

export { editPost };
