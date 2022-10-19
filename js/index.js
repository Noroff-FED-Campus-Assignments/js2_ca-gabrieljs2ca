import { url } from "./parameter.mjs";
const email = document.getElementById("#email");
const username = document.getElementById("#username");
const password = document.getElementById("#inputPassword");
const button = document.getElementById("#submit");

async function registerUser() {
  try {
    const response = await fetch(url + "/social/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Gabriel",
        email: "GabZou91103@stud.noroff.no",
        password: "testpassword",
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
registerUser(username, email, password);
