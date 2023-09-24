const API_BASE_URL2 = "https://api.noroff.dev";

async function fetchToken(url, method = "GET") {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchToken = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchToken);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting
  fetchToken(postsUrl2);
}

const postsUrl2 = `${API_BASE_URL2}/api/v1/social/posts`;

const formID3 = document.getElementById("formID");
formID3.addEventListener("submit", handleSubmit);
