import { useEffect, useState } from "react";
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
  const { getList, remove } = useLearning(category);
  const [learnings, setLearnings] = useState<Learning[]>([]);

  useEffect(() => {
    setLearnings(getList({ pageNo, pageSize, sortType }).data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, pageSize, sortType]);

  return (
    <section>
      <CardInput category={category} />
      {learnings.map((x, index) => (
        <Card.Summary key={`card-${index}`} {...x} remove={remove} />
      ))}
    </section>
  );
}
