/**
 * Creates a new post on the website.
 *
 *
 * @function createNewPost
 * @throws {Error} If an error occurs during the post creation process.
 *
 * @example
 * // In this example, it assumes you have an HTML form with an ID "postForm" and input fields for the title, body, and media. It also shows how to attach the function to a "Submit" button so that when the button is clicked, it calls createNewPost.
 * const postForm = document.getElementById("postForm");
 * postForm.addEventListener("submit", (event) => {
 *   event.preventDefault();
 *   createNewPost();
 * });
 * 
 * {
  "id": 0,
  "title": "string",
  "body": "string",
  "tags": ["string"],
  "media": "https://url.com/image.jpg",
  "created": "2022-09-04T16:21:02.042Z",
  }

 */
async function createNewPost() {
  const API_BASE_URL = "https://api.noroff.dev";

  try {
    // Get the form element by its ID
    const formElement = document.getElementById("postForm");

    // Prevent the default form submission
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get the form data
      const formData = new FormData(event.target);

      // Destructure form data into separate variables
      const { title, body, media } = Object.fromEntries(formData);

      // Get the token from local storage
      const token = localStorage.getItem("accessToken");

      const requestBody = {
        title,
        body,
        media,
      };

      // Define the request options
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/api/v1/social/posts`,
        requestOptions
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Post created successfully.");
      } else {
        console.error("Failed to create a post.");
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export { createNewPost };
