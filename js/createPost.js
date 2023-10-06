const API_BASE_URL = "https://api.noroff.dev";

document
  .getElementById("postForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);

    // Convert FormData to JSON object
    // Spent quite some time on this, i figured i had to convert the formData to JSON,
    // had not idea it was this simple though.
    const jsonObject = Object.fromEntries(formData);

    const token = localStorage.getItem("accessToken");

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(jsonObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
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
        // You can handle errors here
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // You can handle network errors here
    }
  });
