const API_BASE_URL = "https://api.noroff.dev";
const showDeleteFormButton = document.getElementById("showDeleteFormButton");
const deletePostForm = document.getElementById("deletePost");

showDeleteFormButton.addEventListener("click", () => {
  deletePostForm.style.display =
    deletePostForm.style.display === "none" ? "block" : "none";
});

deletePostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const postId = formData.get("postId");

  if (!postId) {
    console.error("Post ID is missing.");
    return;
  }

  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/social/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      console.log("Post deleted successfully.");
      alert("Post deleted successfully.");
    } else {
      console.error("Failed to delete the post.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
