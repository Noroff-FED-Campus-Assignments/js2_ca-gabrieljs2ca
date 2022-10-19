import { url } from "./parameter.mjs";

const email = document.getElementById("#email");
const password = document.getElementById("#inputPassword");
const domBtnSubmit = document.getElementById("#submit");

domBtnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  (async () => {
    try {
      const response = await fetch(url + "/social/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const { name, accessToken } = await response.json();
      localStorage.setItem("userName", name);
      localStorage.setItem("accessToken", accessToken);
      console.log(name, accessToken);
    } catch (e) {
      console.log(e);
    }
  })();
});
