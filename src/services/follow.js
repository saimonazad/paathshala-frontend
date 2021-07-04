export async function followHandler(values) {
  mutate(followCheckUrl, values, false);
  await httpClient
    .post(`${process.env.BACKEND_URL}/users/follow/`, {
      followed: `${pname}`,
    })
    .then((res) => res.data);
  trigger(followCheckUrl);
}
//delete follw
export async function unfollowHandler(values) {
  const deletefollowUrl = `${process.env.BACKEND_URL}/users/follow/${values.id}`;
  mutate(followCheckUrl, values, false);
  await httpClient.delete(deletefollowUrl).then((res) => res.data);
  trigger(followCheckUrl);
}
