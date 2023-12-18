const baseURL = "http://localhost:3002/api";

export default async function getOffers(tokenString, roleString = null) {
  console.log(`token: ${tokenString}`);
  return fetch(`${baseURL}/v1/offers/?role=${roleString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
  }).then((data) => data.json());
}

export async function createUser(user_params) {
  return fetch(`${baseURL}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_params),
  }).then((data) => data.json());
}
