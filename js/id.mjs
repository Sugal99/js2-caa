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
 * @description Display posts based on a specific post ID or all posts if no ID is provided.
 *
 *
 * @function displayPostByID
 * @param {string} [id] - The ID of the post to display. If not provided, all posts are displayed.
 *
 * @example
 * // Display a specific post by ID
 * displayPostByID("123");
 *
 *
 */

export async function displayPostByID() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  let isFiltering = false;

  if (postId) {
    // Fetch the post by ID
    const json = await fetchWithToken(
      API_BASE_URL + `/api/v1/social/posts/${postId}`
    );

    if (json) {
      // Clear the container only if the filter is not active
      if (!isFiltering) {
        const container = document.querySelector(".container");
        container.innerHTML = "";
      }

      // Destructure the json object
      const { title, media, body, created, id } = json;

      createPostHTML({ title, media, body, created, id });
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  } else {
    // No ID provided, fetch and display all posts
    const json = await fetchWithToken(API_BASE_URL + "/api/v1/social/posts");

    if (json) {
      // Clear the container only if the filter is not active
      if (!isFiltering) {
        const container = document.querySelector(".container");
        container.innerHTML = "";
      }

      json.forEach((post) => {
        const { title, media, body, created, id } = post;
        createPostHTML({ title, media, body, created, id });
      });
    } else {
      console.log("Failed to fetch posts.");
    }
  }
}

displayPostByID();
