import { baseURL } from "./Api";

export default async function createUser(user_params) {
  return fetch(`${baseURL}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_params),
  }).then((data) => data.json());
}
