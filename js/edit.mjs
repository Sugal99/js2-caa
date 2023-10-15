/**
 * Edits an existing post on the website.
 * @function editPost
 * @throws {Error} If there is an issue with updating the post, it logs an error message.
 *
 * @description This function allows users to edit a post by providing the post ID, title, body, and media. It displays an edit form when a button is clicked, and upon submission, it sends a PUT request to the API to update the post.

 * @example
 * // Example usage:
 * // Assume you have an HTML button with an ID 'showEditFormButton' and a form with an ID 'editPostForm'.
 * // You can call editPost to set up the form and handle post editing like this:
 * const showEditFormButton = document.getElementById("showEditFormButton");
 * editPost();
{
  "id": 0,
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "media": "https://url.com/image.jpg",
  "created": "2022-09-04T16:21:02.042Z",
  }


 * 
 */

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
    const { postId, title, body, media } = Object.fromEntries(
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
          body: JSON.stringify({ title, body, media }),
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
