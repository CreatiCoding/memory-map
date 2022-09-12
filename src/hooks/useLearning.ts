import { reverseYYYYMMddHHmmss, yyyyMMddHHmmss } from "../utils/date";

const LEARNING_CATEGORY = {
  "english-world": {
    name: "영단어",
    value: "english-world",
  },
  "coding-architecture": {
    name: "코드 설계",
    value: "coding-architecture",
  },
} as const;

export const LEARNING_CATEGORY_NAMES = Object.keys(LEARNING_CATEGORY);

interface LearningCategory {
  name: keyof typeof LEARNING_CATEGORY;
  value: typeof LEARNING_CATEGORY[LearningCategory["name"]];
}

interface Tag {
  name: string;
  url: string;
}

export interface Learning {
  category: LearningCategory["name"];
  no: number;
  title: string;
  contents: string;
  viewCount: number;
  tags: Tag[];
  createdAt: string;
}

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
        viewCount: 0,
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
