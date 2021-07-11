import { httpClient } from "../../authentication/auth-methods/jwt-auth/config";

export const fetcher = (url) => httpClient.get(url).then((res) => res.data);

export const deletion = (url) => httpClient.delete(url).then((res) => res.data);

export const addition = (url, data) =>
  httpClient.post(url, data).then((res) => res.data);
