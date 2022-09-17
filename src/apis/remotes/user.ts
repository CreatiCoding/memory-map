import { User } from "../../models/user";
import { githubStorage } from "../utils/githubStorage";
import { getUserMetaKey } from "./key";

export const createUser = async ({ username, secretKey }: User) => {
  return githubStorage.create(
    getUserMetaKey(username),
    JSON.stringify({ username, secretKey }, null, 2)
  );
};
