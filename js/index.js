import { url } from "./parameter.mjs";
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("inputPassword");
const buttonDOM = document.getElementById("submit");

async function registerUser(e) {
  e.preventDefault();
  try {
    const response = await fetch(url + "/social/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

buttonDOM.addEventListener("click", registerUser);
