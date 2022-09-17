import { LearningCategory, Learning } from "../models/learning";
import { reverseYYYYMMddHHmmss, yyyyMMddHHmmss } from "../utils/date";

function getList(category: LearningCategory["name"]) {
  if (typeof window === "undefined") return [];
  return JSON.parse(
    localStorage.getItem(`learning-${category}`) ?? "[]"
  ) as Learning[];
}

function setList({
  list,
  category,
}: {
  list: Learning[];
  category: LearningCategory["name"];
}) {
  if (typeof window === "undefined") return;

  return localStorage.setItem(`learning-${category}`, JSON.stringify(list));
}

// TODO: 라이브러리로 빼기
export function useLearning(category: LearningCategory["name"]) {
  return {
    getDetail: ({ no }: Pick<Learning, "no">) => {
      return getList(category).find((x) => x.no === no);
    },

    getList: ({
      pageNo = 1,
      pageSize = 5,
      sortType = "asc",
    }: {
      pageNo?: number;
      pageSize?: number;
      sortType?: "asc" | "desc";
    } = {}) => {
      const list = getList(category);
      const sortedList =
        sortType === "asc"
          ? list
          : list.sort(
              (a, b) =>
                reverseYYYYMMddHHmmss(a.createdAt).getTime() -
                reverseYYYYMMddHHmmss(b.createdAt).getTime()
            );

      const pagedList = sortedList.slice(
        (pageNo - 1) * pageSize,
        pageNo * pageSize
      );

      return {
        data: pagedList,
        totalCount: list.length,
      } as const;
    },

    add: ({
      title,
      contents,
      tags,
    }: Pick<Learning, "title" | "contents" | "tags">) => {
      const list = getList(category);

      list.push({
        no: list.length + 1,
        category,
        title,
        contents,
        createdAt: yyyyMMddHHmmss(new Date()),
        tags,
      });

      return setList({ list, category });
    },

    modify: ({
      no,
      title,
      contents,
    }: Pick<Learning, "no" | "title" | "contents">) => {
      const list = getList(category);
      const learning = list.find((x) => x.no === no);

      if (learning == null) {
        throw new Error("수정하려는 배움이 없습니다.");
      }

      learning.title = title;
      learning.contents = contents;

      return setList({ list, category });
    },

    remove: ({ no }: Pick<Learning, "no">) => {
      return setList({
        list: getList(category).filter((x) => x.no !== no),
        category,
      });
    },
  } as const;
}
