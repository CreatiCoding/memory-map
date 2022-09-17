import { Learning } from "../models/learning";
import localStorage from "../utils/localStorage";
import { get, post } from "./http";

export async function fetchLearning(username: string, no: number) {
  const { data } = await get<Learning[]>(`/api/learning/${username}`);

  return data.find((x) => x.no === Number(no));
}

export async function fetchLearningList(username: string) {
  const { data } = await get<Learning[]>(`/api/learning/${username}`);

  return data;
}

export async function createLearning({
  title,
  contents,
}: Pick<Learning, "title" | "contents">) {
  const user = localStorage.get<{ username: string; secretKey: string }>(
    "user"
  );

  if (user == null) {
    throw new Error("로그인을 먼저 해주세요!");
  }

  const { data } = await post<
    Pick<Learning, "title" | "contents">,
    { message: string }
  >(
    `/api/learning/${user.username}/create`,
    {
      title,
      contents,
    },
    {
      headers: {
        ["x-user-username"]: user?.username as string,
        ["x-user-secretkey"]: user?.secretKey as string,
      },
    }
  );

  return data;
}
