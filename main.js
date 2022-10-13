import { url } from "./parameter.mjs";

const allPosts = document.querySelector(".posts");
const bearerToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("username");
const searchBar = document.getElementById("searchBar");

const options = {
  headers: {
    Authorization: "bearer" + " " + bearerToken,
  },
};

const response = await fetch(url + "/social/posts", options);
const data = await response.json();
const posts = data.map((post) => {
  if (!(post.media === "")) {
    return (allPosts.innerHTML += ` <div class="card mb-5 text-white">
        <div class="card-body">
        <div class="d-flex">
        <h5 class="card-title"><a href="detailedpost.html?id=${post.id}">${post.title}</a></h5>
        </div>
        <p class="card-text">${post.body}</p>
        </div>
        <img src="${post.media}" class="card-img-bottom p-3 rounded-5" alt="..." />
        
        </div>`);
  } else {
    console.log(post.media, "post  body");
  }
});
console.log(data);

// function filterPosts(posts) {
//   return post.filter((post) => post.toLowerCase().includes(keyword.toLowerCase()));
// }

const createTitle = document.getElementById("title");
const createBody = document.getElementById("bodyText");
const createImage = document.getElementById("bildeURL");
const createButton = document.getElementById("createPost");

async function handleSubmit(event) {
  console.log(createTitle.value, createBody.value);
  event.preventDefault();
  try {
    const postUpload = await fetch(url + "/social/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: "bearer" + " " + bearerToken,
      },
      body: JSON.stringify({
        title: createTitle.value, // Required
        body: createBody.value, // Required
        media: createImage.value, // Optional
      }),
    });
    const response = await postUpload.json();
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

createButton.addEventListener("click", handleSubmit);
