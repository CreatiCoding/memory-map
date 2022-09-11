import { useState } from "react";
import { Learning, useLearning } from "../hooks/useLearning";
import { useRouter } from "next/router";

export function CardInput({ category }: Pick<Learning, "category">) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { add } = useLearning(category);
  const router = useRouter();

  const onSubmit = () => {
    add({ title, contents, tags: [] });
    router.reload();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <textarea
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
}
