import { useRouter } from "next/router";
import { Learning } from "../hooks/useLearning";

interface Props extends Learning {
  // eslint-disable-next-line no-unused-vars
  remove: (learning: { no: Learning["no"] }) => void;
}

function Summary({
  no,
  title,
  viewCount,
  createdAt,
  remove,
}: Pick<Props, "no" | "title" | "viewCount" | "createdAt" | "remove">) {
  const router = useRouter();

  return (
    <div>
      <span>{no}</span>
      <span>{title}</span>
      <span>{createdAt.toString()}</span>
      <span>{viewCount}</span>
      <button
        onClick={() => {
          remove({ no });
          router.reload();
        }}
      >
        del
      </button>
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
