import type { NextApiRequest, NextApiResponse } from "next";
import { Learning } from "../models/learning";
import { getLearningList } from "./remotes/memory";
import { validateString } from "./utils/validate";

type Data = Learning[];
type Error = { message: string };

export const LearningApi = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const { username } = req.query;

  if (!validateString(username)) {
    return res.status(400).json(validateString.message(username));
  }

  return res.status(200).json(await getLearningList(username));
};
