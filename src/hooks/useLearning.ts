export const LEARNING_CATEGORY = {
  "english-world": {
    name: "영단어",
    value: "english-world",
  },
  "coding-architecture": {
    name: "코드 설계",
    value: "coding-architecture",
  },
} as const;

interface LearningCategory {
  name: keyof typeof LEARNING_CATEGORY;
  value: typeof LEARNING_CATEGORY[LearningCategory["name"]];
}

interface Learning<T extends LearningCategory["name"]> {
  category: T;
  no: number;
  title: string;
  contents: string;
  viewCount: number;
  createdAt: Date;
}

// TODO: 라이브러리로 빼기
export function useLearning<T extends LearningCategory["name"]>(category: T) {
  const getList = () =>
    JSON.parse(
      localStorage.getItem(`learning-${category}`) ?? "[]"
    ) as Learning<T>[];

  const setList = (list: Learning<T>[]) =>
    localStorage.setItem(`learning-${category}`, JSON.stringify(list));

  return {
    getDetail: (learningNo: number) => {
      return getList()[learningNo];
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
      const list = getList();
      const sortedList =
        sortType === "asc"
          ? list
          : list.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      const pagedList = sortedList.slice(
        (pageNo - 1) * pageSize,
        pageNo * pageSize
      );

      return {
        data: pagedList,
        totalCount: list.length,
      } as const;
    },
    add: ({ title, contents }: Pick<Learning<T>, "title" | "contents">) => {
      const list = getList();

      list.push({
        no: list.length + 1,
        category,
        title,
        contents,
        createdAt: new Date(),
        viewCount: 0,
      });

      return setList(list);
    },
    modify: ({
      no,
      title,
      contents,
    }: Pick<Learning<T>, "no" | "title" | "contents">) => {
      const list = getList();
      const learning = list.find((x) => x.no === no);

      if (learning == null) {
        throw new Error("수정하려는 배움이 없습니다.");
      }

      learning.title = title;
      learning.contents = contents;

      return setList(list);
    },
    remove: ({ no }: Pick<Learning<T>, "no">) => {
      return setList(getList().filter((x) => x.no !== no));
    },
  };
}
