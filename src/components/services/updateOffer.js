import { baseURL } from "./Api";

export default async function updateOffer(
  tokenString,
  play_hours,
  offer_detail_id
) {
  console.log(`token: ${tokenString}`);
  return fetch(`${baseURL}/v1/log_play_hours`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
    body: JSON.stringify({
      offer_detail: {
        play_hours: play_hours,
        offer_detail_id: offer_detail_id,
      },
    }),
  });
}
