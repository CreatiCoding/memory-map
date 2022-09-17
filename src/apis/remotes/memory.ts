import { Learning, learningArrayType } from "../../models/learning";
import { User, userType } from "../../models/user";
import { yyyyMMddHHmmss } from "../../utils/date";
import { githubStorage } from "../utils/githubStorage";
import { memorized } from "../utils/memorized";
import { getUserLearningKey, getUserMetaKey } from "./key";

export const getLearningList = memorized(
  async (username: string) => {
    const key = getUserLearningKey(username);

    // 없으면 빈 배열 반환
    if (!(await githubStorage.exists(key))) {
      return [] as Learning[];
    }

    // 있으면 파싱해서 반환
    return learningArrayType.parse(JSON.parse(await githubStorage.get(key)));
  },
  { ttl: 10 * 60 * 1000 }
);

export const getUsernames = memorized(
  async () => {
    return githubStorage.getList("main");
  },
  { ttl: 24 * 60 * 60 * 1000 }
);

export const getUserMeta = memorized(
  async (username: string) => {
    return userType.parse(
      JSON.parse(await githubStorage.get(getUserMetaKey(username)))
    );
  },
  { ttl: 24 * 60 * 60 * 1000 }
);

interface CreateLearningOptions {
  username: User["username"];
  title: Learning["title"];
  contents: Learning["contents"];
}

export const createLearning = async ({
  username,
  title,
  contents,
}: CreateLearningOptions) => {
  const key = getUserLearningKey(username);

  // 없으면 빈 배열 생성해서 파일 추가
  if (!(await githubStorage.exists(key))) {
    await githubStorage.create(key, JSON.stringify([], null, 2));
  }

  const learningList = await getLearningList(username);

  const no =
    learningList[learningList.length - 1] != null
      ? learningList[learningList.length - 1].no + 1
      : 1;

  learningList.push({
    title,
    contents,
    category: "coding-architecture",
    createdAt: yyyyMMddHHmmss(new Date()),
    no,
    tags: [],
  });

  return await githubStorage.update(key, JSON.stringify(learningList, null, 2));
};
