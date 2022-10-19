import { url } from "./parameter.mjs";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const bearerToken = localStorage.getItem("accessToken");
const id = parameter.get("id");
const detailedPost = document.querySelector(".post");
const options = {
  headers: {
    Authorization: "bearer" + " " + bearerToken,
  },
};

const response = await fetch(url + `/social/posts/${id}`, options);
const data = await response.json();
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

console.log;
