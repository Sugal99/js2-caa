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
 * @description Handle searching and displaying posts based on user input and URL parameters.
 * @function search
 * @example
 * // Get references to HTML elements
 * const container = document.querySelector(".container");
 * const searchInput = document.getElementById("test");
 * const params = new URLSearchParams(window.location.search);
 * const postId = params.get("id");
 *
 * // Execute the search function
 * search();
 */

async function search() {
  const container = document.querySelector(".container");
  const searchInput = document.getElementById("test");
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  let json = await fetchWithToken(API_BASE_URL + "/api/v1/social/posts");

  function updatePosts() {
    const searchQuery = searchInput.value.toLowerCase().trim(); // Trim whitespace
    container.innerHTML = "";

    json
      .filter((post) => post.title.toLowerCase().includes(searchQuery))
      .forEach((post) => createPostHTML(post));
  }

  searchInput.addEventListener("input", updatePosts);

  if (postId) {
    // If there's an ID in the URL, fetch and display only that post
    const post = json.find((post) => post.id === postId);
    if (post) {
      container.innerHTML = "";
      createPostHTML(post);
    }
  } else {
    // If no ID in the URL, initially create posts HTML without filtering
    json.forEach((post) => createPostHTML(post));
  }
}

export { search };
