const baseURL = "http://localhost:3002/api";

function getUrl(id, role) {
  console.log(`param: ${id}`);
  console.log(`typeof param: ${typeof Number(id)}`);
  if (!role && !id) {
    return `${baseURL}/v1/offers/`;
  } else if (!role) {
    return `${baseURL}/v1/offers/${id}/`;
  } else {
    return `${baseURL}/v1/offers/?role=${role}`;
  }
}

export default async function getOffers(
  tokenString,
  roleString = null,
  id = null
) {
  console.log(`token: ${tokenString}`);
  let url = getUrl(id, roleString);
  return fetch(url, {
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
