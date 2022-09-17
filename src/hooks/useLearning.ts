import * as z from "zod";
import { Primitive, Scalars, ZodLiteral } from "zod";
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

const learningCategoryNameType = z.union(
  Object.keys(LEARNING_CATEGORY).map((x) => z.literal(x)) as unknown as [
    ZodLiteral<Primitive>,
    ZodLiteral<Primitive>,
    ...ZodLiteral<Primitive>[]
  ]
);

const learningCategoryValueType = z.union(
  Object.values(LEARNING_CATEGORY).map((x) =>
    z.object({
      name: z.literal(x.name),
      value: z.literal(x.value),
    })
  ) as unknown as [
    ZodLiteral<Scalars>,
    ZodLiteral<Scalars>,
    ...ZodLiteral<Scalars>[]
  ]
);

const learningCategoryType = z.object({
  name: learningCategoryNameType,
  value: learningCategoryValueType,
});

interface LearningCategory extends z.infer<typeof learningCategoryType> {}

const tagType = z.object({
  name: z.string(),
  url: z.string(),
});

const learningType = z.object({
  category: learningCategoryNameType,
  no: z.number(),
  title: z.string(),
  contents: z.string(),
  viewCount: z.number(),
  tags: z.array(tagType),
  createdAt: z.string(),
});

export const learningArrayType = z.array(learningType);

export interface Learning extends z.infer<typeof learningType> {}

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
      viewCount,
    }: Pick<Learning, "no" | "title" | "contents" | "viewCount">) => {
      const list = getList(category);
      const learning = list.find((x) => x.no === no);

      if (learning == null) {
        throw new Error("수정하려는 배움이 없습니다.");
      }

      learning.title = title;
      learning.contents = contents;
      learning.viewCount = viewCount;

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
