import { Learning } from "../hooks/useLearning";

type Props = Learning;

function Summary({
  no,
  title,
  viewCount,
  createdAt,
}: Pick<Props, "no" | "title" | "viewCount" | "createdAt">) {
  return (
    <div>
      <span>{no}</span>
      <span>{title}</span>
      <span>{createdAt.toString()}</span>
      <span>{viewCount}</span>
    </div>
  );
}

function Detail({
  category,
  contents,
  createdAt,
  no,
  tags,
  title,
  viewCount,
}: Props) {
  return (
    <div>
      <span>{no}</span>
      <span>{category}</span>
      <span>{title}</span>
      <span>{contents}</span>
      <span>{tags.join(",")}</span>
      <span>{createdAt.toISOString()}</span>
      <span>{viewCount}</span>
    </div>
  );
}

export const Card = {
  Summary,
  Detail,
};
