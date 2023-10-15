import { editPost } from "./edit.mjs";
import { deletePost } from "./deletePost.mjs";

const API_BASE_URL = "https://api.noroff.dev";

async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

function createPostHTML(post) {
  const container = document.querySelector(".container");

  // Create a Bootstrap card div
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a card title element
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-header");
  cardTitle.innerText = post.title;

  // Create a card body div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Append the card title to the card body
  cardBody.appendChild(cardTitle);

  // Append the card body to the card
  card.appendChild(cardBody);

  // Append the card to the container
  container.appendChild(card);

  // Check if imgData is not null
  if (post.media) {
    const imgData = post.media;
    const img = document.createElement("img");
    img.src = imgData;
    cardBody.append(img);
  }

  // Create a card title element
  const bodyText = document.createElement("h5");
  bodyText.classList.add("card-text");
  bodyText.innerText = post.body;
  cardBody.append(bodyText);

  const postCreated = document.createElement("h6");
  postCreated.classList.add("card-text");
  postCreated.innerText = post.created;
  cardBody.append(postCreated);

  const cardId = document.createElement("h5");
  cardId.classList.add("card-text");
  cardId.innerText = post.id;
  cardBody.append(cardId);
}

function createPostsHTML(json) {
  for (let i = 0; i < json.length; i++) {
    const post = json[i];
    createPostHTML(post);
  }
}

/**
 * @description  Handle user profile by fetching and displaying posts for the logged-in user.
 *
 *
 * @function profileHandler
 *
 * @example
 * // Handle user profile by calling the function
 * profileHandler();
 */

async function profileHandler() {
  // Retrieve the user's identity (username or user ID) from local storage
  const user = localStorage.getItem("user");

  if (!user) {
    console.error("User identity not found in local storage.");
    return;
  }

  // Fetch the posts for the user
  const url = `${API_BASE_URL}/api/v1/social/profiles/${user}/posts`;
  const json = await fetchWithToken(url);

  if (json) {
    createPostsHTML(json);
  } else {
    console.error("Error fetching user posts.");
  }

  // Set the user's name on the profile
  const profileName = document.querySelector("h2");
  profileName.innerText = user;
}

profileHandler();
editPost();
deletePost();
