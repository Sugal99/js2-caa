const API_BASE_URL = "https://api.noroff.dev";

async function registerUser(url, data) {
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
    return json;
  } catch (error) {
    console.log(error);
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting

  // Get values from form fields
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  // Create the user object
  const user = {
    name,
    email,
    password,
  };

  // Register the user
  registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
}

// Attach the handleSubmit function to the form's submit event
const formID = document.getElementById("formID");
formID.addEventListener("submit", handleSubmit);
