import { Learning, useLearning } from "../hooks/useLearning";
import { Card } from "./Card";
import { CardInput } from "./CardInput";

export function CardList({
  category,
  pageNo = 1,
  pageSize = 5,
  sortType = "asc",
}: {
  category: Learning["category"];
  pageNo?: number;
  pageSize?: number;
  sortType?: "asc" | "desc";
}) {
  const { getList } = useLearning(category);
  const { data } = getList({ pageNo, pageSize, sortType });

  return (
    <div>
      <CardInput category={category} />
      {data.map((x, index) => (
        <Card.Summary key={`card-${index}`} {...x} />
      ))}
    </div>
  );
}
