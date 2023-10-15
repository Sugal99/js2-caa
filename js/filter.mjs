const API_BASE_URL = "https://api.noroff.dev";
/**
 * @description Fetch data from a given URL with an authorization token.
 *
 *
 * @function fetchWithToken
 * @param {string} url - The URL to fetch data from.
 * @throws {Error} If an error occurs during the post creation process.
 * @example
 * // Fetch data from a specific URL
 * const data = await fetchWithToken("https://example.com/api/data");
 * if (data) {
 *   console.log("Data fetched successfully:", data);
 * } else {
 *   console.error("Failed to fetch data.");
 * }
 */

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

/**
 * @description Create and append an HTML card element to display a post's details.
 *
 * @function createPostHTML
 * @param {Object} post - The post object containing title, media, body, created, and id.
 *
 * @example
 * // Create and display a post card
 * const samplePost = {
 *   title: "Sample Title",
 *   media: "sample-image.jpg",
 *   body: "This is the post body text.",
 *   created: "2023-10-03",
 *   id: 123,
 * };
 * createPostHTML(samplePost);
 */

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
 * Filter and display posts based on a specified date.
 *
 * @function filter
 * @description
 * This function filters and displays posts based on a specified date using a dropdown menu.
 *
 *
 *
 *
 */

async function filter() {
  const container = document.querySelector(".container");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  let isFiltering = false;
  let json = await fetchWithToken(API_BASE_URL + "/api/v1/social/posts");

  function createPostsHTML(posts) {
    container.innerHTML = "";
    for (const { title, media, body, created, id } of posts) {
      createPostHTML({ title, media, body, created, id });
    }
  }

  /**
   *
   *
   * @description When activated, this function filters and displays older posts created on or after a specific date.
   *
   * @function toggleFilter
   * @example
   * // Activate the filter to display older posts.
   * toggleFilter();
   */

  function toggleFilter() {
    if (!isFiltering) {
      isFiltering = true;
      filterButton.innerText = "Go Back To New Posts";

      // Reverse the posts only when filtering is active
      createPostsHTML(
        json
          .filter(
            (post) =>
              new Date(post.created).getTime() >=
              new Date("2023-09-22").getTime()
          )
          .reverse()
      );
    }
  }

  // Add event listeners to the dropdown items
  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
  for (const item of dropdownItems) {
    item.addEventListener("click", () => {
      const filterValue = item.getAttribute("data-filter");

      if (filterValue === "all") {
        // Show all posts without clearing the container
        createPostsHTML(json);
      } else if (filterValue === "filter") {
        // Toggle filtering when "Filter" is selected
        toggleFilter();
      } else {
      }
    });
  }

  const filterButton = document.getElementById("button");
  filterButton.addEventListener("click", () => {
    if (isFiltering) {
      isFiltering = false;
      filterButton.innerText = "Filter";

      createPostsHTML(json);
    }
  });
}

export { filter };
