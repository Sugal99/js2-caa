/**
 * Deletes a post on the website.
 * @function deletePost
 * @throws {Error} If there is an issue with deleting the post, it logs an error message.

 *
 * @description This function allows users to delete a post by providing the post ID. It displays a form when a button is clicked, and upon submission, it sends a DELETE request to the API to delete the post.

 * @example
 * // Example usage:
 * // Assume you have an HTML button with an ID 'showDeleteFormButton' and a form with an ID 'deletePost'.
 * // You can call deletePost to set up the form and handle post deletion like this:
 * const showDeleteFormButton = document.getElementById("showDeleteFormButton");
 * deletePost();
 * 
const response = await fetch(
        `${API_BASE_URL}/api/v1/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 */

async function deletePost() {
  const API_BASE_URL = "https://api.noroff.dev";
  const showDeleteFormButton = document.getElementById("showDeleteFormButton");
  const deletePostForm = document.getElementById("deletePost");

  showDeleteFormButton.addEventListener("click", () => {
    deletePostForm.style.display =
      deletePostForm.style.display === "none" ? "block" : "none";
  });

  deletePostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Destructure the formData object to get the postId
    const formData = new FormData(event.target);
    const { postId } = Object.fromEntries(formData);

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
}

export { deletePost };
