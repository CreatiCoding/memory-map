import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Learning } from "../hooks/useLearning";
import { Button } from "./Button";

interface Props extends Learning {
  // eslint-disable-next-line no-unused-vars
  remove: (learning: { no: Learning["no"] }) => void;
}

function Summary({
  no,
  title,
  viewCount,
  createdAt,
}: Pick<Props, "no" | "title" | "viewCount" | "createdAt" | "remove">) {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(`/learning/${no}`);
      }}
      css={css`
        height: 40px;
        margin: 16px 0;
        border-radius: 8px;
        padding: 12px 4px;
        display: grid;
        grid-template-columns: 50px 1fr 50px;
        grid-template-rows: 9fr 1fr;
        align-items: center;
        cursor: pointer;
        box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px,
          rgb(0 0 0 / 19%) 0px 6px 20px 0px;

        &:hover {
          background-color: #f0f0f0;
        }
      `}
    >
      <span
        css={css`
          grid-row: 1 / 3;
          grid-column: 1/2;
          text-align: center;
          line-height: 100%;
        `}
      >
        {no}
      </span>
      <span
        css={css`
          font-size: 20px;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          grid-row: 1/3;
          grid-column: 3/4;
          text-align: center;
        `}
      >
        {viewCount}
      </span>
      <span
        css={css`
          text-align: right;
          font-size: 10px;
        `}
      >
        {createdAt}
      </span>
    </li>
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
  remove,
}: Props) {
  const router = useRouter();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 15px 45px 1fr 40px;
        grid-template-columns: 50px 1fr 180px 50px;
        border: 1px solid black;
        border-radius: 8px;
      `}
    >
      <span
        css={css`
          grid-column: 1/2;
          grid-row: 1/3;
          border-bottom: 1px solid black;
          padding: 8px;
          position: relative;
        `}
      >
        <span
          css={css`
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;

            border: 1px solid;
            width: 30px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
            background-color: bisque;
          `}
        >
          {no}
        </span>
      </span>
      <span
        css={css`
          grid-column: 2/4;
          grid-row: 1/2;
          padding: 8px;
          font-size: 12px;
        `}
      >
        {category}
      </span>
      <span
        css={css`
          grid-column: 4/5;
          grid-row: 1/3;
          border-bottom: 1px solid black;
          padding: 8px;
          position: relative;
        `}
      >
        <span
          css={css`
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;
            border: 1px solid;
            width: 30px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
            background-color: bisque;
          `}
        >
          {viewCount}
        </span>
      </span>
      <span
        css={css`
          grid-column: 2/4;
          grid-row: 2/3;
          border-bottom: 1px solid black;
          padding: 8px;
          font-size: 24px;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          grid-column: 1/5;
          grid-row: 3/4;
          padding: 20px;

          word-break: break-all;
          white-space: pre-line;
        `}
        dangerouslySetInnerHTML={{ __html: convert(contents) }}
      ></span>
      <span
        css={css`
          grid-column: 1/2;
          grid-row: 4/5;
          padding: 8px;
        `}
      >
        {tags.join(",")}
      </span>
      <span
        css={css`
          grid-column: 3/4;
          grid-row: 4/5;
          padding: 8px;
        `}
      >
        {createdAt}
      </span>
      <Button
        css={css`
          grid-column: 4/5;
          grid-row: 4/5;
          border: 1px solid;
          border-radius: 6px;
          width: 40px;
          height: 30px;

          &:hover {
            background-color: #d0d0d0;
          }
        `}
        onClick={() => {
          remove({ no });
          router.push("/");
        }}
      >
        삭제
      </Button>
    </div>
  );
}

export const Card = {
  Summary,
  Detail,
};

function convert(html: string) {
  const lines = html.split("\n");
  const resultLines = [];

  let codeOpen = false;
  for (const line of lines) {
    let result = "";
    const tokens = line.split("**");

    for (let i = 0; i < tokens.length; i++) {
      result +=
        tokens[i] +
        (i !== tokens.length - 1
          ? i % 2 === 0
            ? "<span style='font-weight: bold;'>"
            : "</span>"
          : "");
    }

    if (result.startsWith("```")) {
      if (codeOpen) {
        resultLines.push(`</code>`.trimStart());
        codeOpen = false;
      } else {
        resultLines.push(`<code style="${codeStyle}">`.trimStart());
        codeOpen = true;
      }
      continue;
    }

    resultLines.push(result.trimStart());
  }

  return resultLines.join("\n").trimStart();
}

const codeStyle = `
  background-color: lightgoldenrodyellow;
  display: block;
  border: 1px solid black;
  border-radius: 8px;
  padding: 0 8px 8px 8px;
  margin: 4px;
`;
