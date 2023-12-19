import { baseURL } from "./Api";

export default async function showOffer(tokenString, id) {
  console.log(`token: ${tokenString}`);
  console.log(`id: ${id}`);
  return fetch(`${baseURL}/v1/offers/${id}}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
  });
}
