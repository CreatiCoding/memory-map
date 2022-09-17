import { githubStorage } from "../utils/githubStorage";
import { memorized } from "../utils/memorized";

const getUserLearningKey = (username: string) =>
  `main/${username}/learning.json`;

export const getLearningFromStorage = memorized(async (username: string) => {
  return githubStorage.get(getUserLearningKey(username));
});
