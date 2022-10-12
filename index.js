const registerAPI = "https://nf-api.onrender.com/api/v1/social/auth/register";

const requestNewUser = {
  method: "POST",
  body: JSON.stringify({
    name: "${user.name}",
    email: "${user.email}",
    password: "${user.password}",
  }),
};

fetch(registerAPI, requestNewUser)
  .then((response) => response.json())
  .then((json) => console.log(json));
