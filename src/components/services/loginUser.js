import { baseURL } from "./Api";

export default async function loginUser(credentials) {
  return fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}
