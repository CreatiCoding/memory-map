import type { NextApiRequest, NextApiResponse } from "next";
import { Learning } from "../models/learning";
import { createLearning } from "./remotes/memory";
import { isValidUser } from "./services/user";
import { validateString } from "./utils/validate";

type Data = string[];
type Error = { message: string };

interface CreateLearningApiRequest extends NextApiRequest {
  body: Pick<Learning, "title" | "contents">;
}

export const CreateLearningApi = async (
  req: CreateLearningApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const username = req.headers["x-user-username"];
  const secretKey = req.headers["x-user-secretkey"];
  const { title, contents } = { ...req.query, ...req.body };

  if (!validateString(username) || !validateString(secretKey)) {
    return res.status(400).json({
      message: JSON.stringify({ username, secretKey }, null, 2),
    });
  }

  if (!validateString(title) || !validateString(contents)) {
    return res.status(400).json({
      message: JSON.stringify({ title, contents }, null, 2),
    });
  }

  if (req.method === "GET") {
    return res.status(400).json({
      message: "GET is not allowed",
    });
  }

  const { code, message, status } = await isValidUser({ username, secretKey });

  switch (code) {
    case "Wrong":
    case "NotFound": {
      return res.status(status).json({ message });
    }
  }

  await createLearning({ username, title, contents });

  return res.status(200).json({
    message: "정상적으로 추가되었습니다.",
  });
};
