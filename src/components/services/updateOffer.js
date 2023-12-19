import { baseURL } from "./Api";

export default async function updateOffer(tokenString, play_hours, offer_id) {
  return fetch(`${baseURL}/v1/log_play_hours`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
    body: JSON.stringify({
      offer: {
        play_hours: play_hours,
        offer_id: offer_id,
      },
    }),
  });
}
