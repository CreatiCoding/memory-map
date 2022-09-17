import * as z from "zod";
import { ZodLiteral, Scalars } from "zod";

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
    ZodLiteral<keyof typeof LEARNING_CATEGORY>,
    ZodLiteral<keyof typeof LEARNING_CATEGORY>,
    ...ZodLiteral<keyof typeof LEARNING_CATEGORY>[]
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

export interface LearningCategory
  extends z.infer<typeof learningCategoryType> {}

const tagType = z.object({
  name: z.string(),
  url: z.string(),
});

const learningType = z.object({
  category: learningCategoryNameType,
  no: z.number(),
  title: z.string(),
  contents: z.string(),
  tags: z.array(tagType),
  createdAt: z.string(),
});

export const learningArrayType = z.array(learningType);

export interface Learning extends z.infer<typeof learningType> {}
