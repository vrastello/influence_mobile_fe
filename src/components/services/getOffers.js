import { baseURL } from "./Api";

export default async function getOffers(tokenString) {
  return fetch(`${baseURL}/v1/offers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
  });
}
