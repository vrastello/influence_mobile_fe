import { baseURL } from "./Api";

export default async function getAdminOffers(tokenString) {
  return fetch(`${baseURL}/v1/admin_offers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
  });
}
