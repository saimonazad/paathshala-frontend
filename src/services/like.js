import { mutate, trigger } from "swr";
import { httpClient } from "../../authentication/auth-methods/jwt-auth/config";

export function likeCheckUrl(id) {
  return `${process.env.BACKEND_URL}/newsfeed/likes/?post_id=${id}`;
}

//follow a user
export async function likeHandler(values, url, id) {
  mutate(url, values, false);
  await httpClient
    .post(`${process.env.BACKEND_URL}/newsfeed/likes/?post_id=${id}`)
    .then((res) => res.data);
  trigger(url);
}
//unfollow a user
export async function unlikeHandler(values, url) {
  const deletefollowUrl = `${process.env.BACKEND_URL}/users/follow/${values.id}`;
  mutate(url, values, false);
  await httpClient.delete(deletefollowUrl).then((res) => res.data);
  trigger(url);
}
