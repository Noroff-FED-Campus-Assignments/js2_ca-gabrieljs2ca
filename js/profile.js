import { url } from "./parameter.mjs";

const profileDOM = document.querySelector(".userInformation");
const navbarDOM = document.querySelector(".navbar");
const bearerToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("userName");

const options = {
  headers: {
    Authorization: "bearer" + " " + bearerToken,
  },
};

const userResponse = await fetch(url + "/social/profiles/" + username, options);
const userInfo = await userResponse.json();
console.log(userInfo);

async function createHeading() {
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
}
createHeading();

async function createProfile() {
  if ((userInfo.avatar === null) & (userInfo.banner === null)) {
    profileDOM.innerHTML += `<div class="card text-bg-dark w-75 mx-auto">
    <img src="../img/whitebackground.jpg" class="card-img" style="height: 300px" alt="..." />
    <div class="card-img-overlay d-flex align-items-end">
      <img class="bi pe-none me-2 rounded-circle p-2" width="128" height="128" src="../img/usericon.png" />
      <div class="mb-4">
        <h5 class="card-title">${userInfo.name}</h5>
      </div>
    </div>
  </div>`;
  } else {
    profileDOM.innerHTML += `<div class="card text-bg-dark w-75 mx-auto">
    <img src="${userInfo.banner}"> class="card-img" style="height: 300px" alt="..." />
    <div class="card-img-overlay d-flex align-items-end">
      <img class="bi pe-none me-2 rounded-circle p-2" width="128" height="128" src="${userInfo.avatar}" />
      <div class="mb-4">
        <h5 class="card-title">${userInfo.username}</h5>
      </div>
    </div>
  </div>`;
  }
}
createProfile();
