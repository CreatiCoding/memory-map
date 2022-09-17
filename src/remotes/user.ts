import { post } from "./http";

interface Params {
  username: string;
  secretKey: string;
}

export async function login({ username, secretKey }: Params) {
  const { data } = await post<Params, { message: string }>(`/api/user/login`, {
    username,
    secretKey,
  });

  return data.message;
}
