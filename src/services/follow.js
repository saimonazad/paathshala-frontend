import { mutate, trigger } from "swr";
import { httpClient } from "../../authentication/auth-methods/jwt-auth/config";

export function followCheckUrl(username) {
  return `${process.env.BACKEND_URL}/users/follow_check/?username=${username}`;
}

export const fetchFollowingUrl = `/users/follow/`;

//follow a user
export async function followHandler(values, url, username) {
  mutate(url, values, false);
  await httpClient
    .post(`${process.env.BACKEND_URL}/users/follow/`, {
      followed: `${username}`,
    })
    .then((res) => res.data);
  trigger(url);
}
//unfollow a user
export async function unfollowHandler(values, url) {
  const deletefollowUrl = `${process.env.BACKEND_URL}/users/follow/${values.id}`;
  mutate(url, values, false);
  await httpClient.delete(deletefollowUrl).then((res) => res.data);
  trigger(url);
}
