import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "./remotes/user";
import { isValidUser } from "./services/user";

type Data = string[];
type Error = { message: string };

interface LoginUserApiRequest extends NextApiRequest {
  body: {
    username: string;
    secretKey: string;
  };
}

export const LoginUserApi = async (
  req: LoginUserApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const { username, secretKey } = {
    ...req.query,
    ...req.body,
  };

  if (req.method === "GET") {
    return res.status(400).json({
      message: "GET is not allowed",
    });
  }

  const { code, message, status } = await isValidUser({ username, secretKey });

  switch (code) {
    case "Wrong":
    case "Valid": {
      return res.status(status).json({ message });
    }
  }

  // [CREATE] NOTE: username이 목록에 없는 경우 생성한다.
  await createUser({ username, secretKey });

  return res.status(200).json({
    message: "회원가입을 축하합니다.",
  });
};
