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

const user = {
  name: "test12344_account_a",
  email: "test12344-account-a@noroff.no",
  password: "my-password-1322134",
};

registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
