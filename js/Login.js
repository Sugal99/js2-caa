const API_BASE_URL = "https://api.noroff.dev";

async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (json.accessToken) {
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("user", json.name); // Store the user's name
      window.location.href = "/feedcopy.html"; // Redirect after successful login
    } else {
      console.log("Login failed. Handle the error as needed.");
    }

    return json;
  } catch (error) {
    console.log(error);
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting

  // Get values from form fields
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const userToLogin = {
    email,
    password,
  };

  loginUser(loginUrl, userToLogin);
}

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

const formID2 = document.getElementById("formID");
formID2.addEventListener("submit", handleSubmit);
