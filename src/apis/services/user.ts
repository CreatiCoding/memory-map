import { User } from "../../models/user";
import { getUserMeta, getUsernames } from "../remotes/memory";

type Result = "Valid" | "Wrong" | "NotFound";

interface IsValidUserResult {
  code: Result;
  status: 200 | 400;
  message: string;
}

export async function isValidUser({
  username,
  secretKey,
}: User): Promise<IsValidUserResult> {
  const usernames = await getUsernames();

  if (usernames.includes(username)) {
    const meta = await getUserMeta(username);

    if (meta.secretKey === secretKey) {
      return {
        code: "Valid",
        status: 200,
        message: "로그인 성공하였습니다.",
      };
    }

    return {
      code: "Wrong",
      status: 400,
      message: [
        `"${username}" 님에게 부여된 secretKey와 일치하지 않습니다.`,
        `username을 확인해주시거나 secretKey가 바뀌지는 않았는지 확인해주세요.`,
      ].join("\n"),
    };
  }

  return {
    code: "NotFound",
    status: 400,
    message: [
      "존재하지 않는 username 입니다.",
      `username을 확인해주시거나 새로 가입해주세요.`,
    ].join("\n"),
  };
}
