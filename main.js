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
  return (allPosts.innerHTML += ` <div class="card mb-5 text-white">
        <div class="card-body">
        <div class="d-flex">
        <h5 class="card-title"><a href="detailedpost.html?id=${post.id}">${post.title}</a></h5>
        </div>
        <p class="card-text">${post.body}</p>
        </div>
        <img src="${post.media}" class="card-img-bottom p-3 rounded-5" alt="..." />
        
        </div>`);
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
    const postUpload = await fetch(url + "/social/posts", options, {
      method: "POST",
      body: JSON.stringify({
        title: createTitle.toString(), // Required
        body: createBody.toString(), // Required
        media: createImage.toString(), // Optional
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await postUpload.json();
  } catch (e) {
    console.log(e);
  }
}

createButton.addEventListener("click", handleSubmit);
