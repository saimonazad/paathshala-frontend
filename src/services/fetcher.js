import { httpClient } from "../../authentication/auth-methods/jwt-auth/config";

export const fetcher = (url) => httpClient.get(url).then((res) => res.data);
