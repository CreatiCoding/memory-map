import { Learning } from "../models/learning";
import { margin } from "../utils/css";
import { Card } from "./Card";
import { CardInput } from "./CardInput";

export function CardList({
  useInput = false,
  list,
  goDetail,
}: {
  pageNo?: number;
  pageSize?: number;
  sortType?: "asc" | "desc";
  useInput?: boolean;
  list: Learning[];
  // eslint-disable-next-line no-unused-vars
  goDetail: (no: number) => void;
}) {
  return (
    <section>
      {useInput ? <CardInput width={500} css={margin.y(30)} /> : null}

      <ul>
        {list.map((x, index) => (
          <Card.Summary key={`card-${index}`} {...x} goDetail={goDetail} />
        ))}
      </ul>
    </section>
  );
}
