import { url } from "./parameter.mjs";

const navbarDOM = document.querySelector(".navbar");
const allPosts = document.querySelector(".posts");
const bearerToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("userName");
const searchBar = document.getElementById("searchBar");

const options = {
  headers: {
    Authorization: "bearer" + " " + bearerToken,
  },
};

// henter brukerinformasjonen til den som er logget inn.

const userResponse = await fetch(url + "/social/profiles/" + username, options);
const userInfo = await userResponse.json();
if (userInfo.avatar === null) {
  navbarDOM.innerHTML += `<a href="#" class="nav-link">
    ${username}
    <img class="bi pe-none me-2 rounded-circle" width="48" height="48" src="../img/usericon.png" />
    </a>`;
} else {
  userInfo.innerHTML += `<a href="profile.html${username}" class="nav-link">${username}
    <img class="bi pe-none me-2 rounded-circle" width="48" height="48" src="${userInfo.avatar}" />
    </a>`;
}

// lager posts på nettsiden

const response = await fetch(url + "/social/posts", options);
const data = await response.json();
for (const post of data) {
  if (!(post.media === "" || post.media === null)) {
    allPosts.innerHTML += ` <div class="card mb-5 text-white">
        <div class="card-body">
        <div class="d-flex">
        <h5 class="card-title"><a href="detailedpost.html?id=${post.id}">${post.title}</a></h5>
        </div>
        <p class="card-text">${post.body}</p>
        </div>
        <img src="${post.media}" class="card-img-bottom p-3 rounded-5" alt="..." />
        
        </div>`;
  } else {
    console.log("no image");
  }
}

// Lager en ny post og legger den ut.

const createTitle = document.getElementById("title");
const createBody = document.getElementById("bodyText");
const createImage = document.getElementById("bildeURL");
const createButtonDOM = document.getElementById("createPost");

async function handleSubmit(event) {
  console.log(createTitle.value, createBody.value);
  event.preventDefault();
  try {
    const postUserToApi = await fetch(url + "/social/posts", {
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
    const response = await postUserToApi.json();
    console.log(response);
    window.location.reload(false);
  } catch (e) {
    console.log(e);
  }
}

createButtonDOM.addEventListener("click", handleSubmit);
