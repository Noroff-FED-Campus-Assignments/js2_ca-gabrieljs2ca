import { url } from "./parameter.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const bearerToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("userName");
const id = parameter.get("id");
const detailedPost = document.querySelector(".post");
const options = {
  headers: {
    Authorization: "bearer" + " " + bearerToken,
  },
};

const response = await fetch(url + `/social/posts/${id}?_author=true&_comments=true&_reactions=true`, options);
const data = await response.json();
const postAuthor = data.author;
const detailed = ((post) => {
  return (detailedPost.innerHTML += `<div class="card mb-5 text-white">
  <div class="card-body">
  <div class="d-flex">
  <h5 class="card-title">${data.title}</h5>
  </div>
  <p class="card-text">${data.body}</p>
  </div>
  <img src="${data.media}" class="card-img-bottom p-3 rounded-5" alt="..." />
  
  </div>`);
})();

const buttonModiferDOM = document.getElementById("modifiers");
console.log(buttonModiferDOM);
if (postAuthor.name === username) {
  buttonModiferDOM.innerHTML += `<button class="" id="delete">delete</button>
    <button class="" id="edit">edit</button>`;
} else {
  console.log("this is not your post");
}

const deletebuttonDOM = document.getElementById("delete");
async function deletePost(e) {
  e.preventDefault();
  fetch(url + `/social/posts/${id}`, options, {
    method: "DELETE",
    headers: { "content-type": "application/json charset=UTF-8" },
  });
}
console.log(deletebuttonDOM);
deletebuttonDOM.addEventListener("click", deletePost);
