import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Theme } from "../constants/colors";
import { Learning } from "../models/learning";
import { Button } from "./Button";

interface Props extends Learning {
  // eslint-disable-next-line no-unused-vars
  remove?: (learning: { no: Learning["no"] }) => void;
  // eslint-disable-next-line no-unused-vars
  goDetail: (no: number) => void;
}

function Summary({
  no,
  title,
  createdAt,
  goDetail,
}: Pick<Props, "no" | "title" | "createdAt" | "remove" | "goDetail">) {
  return (
    <li
      onClick={() => goDetail(no)}
      css={css`
        margin: 16px 0;
        border: 1px solid;
        border-radius: 8px;
        padding: 12px 4px;
        display: grid;
        grid-template-columns: 90px 1fr 90px;
        grid-template-rows: auto 10px;
        align-items: center;
        cursor: pointer;
        /* box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px,
          rgb(0 0 0 / 19%) 0px 6px 20px 0px; */
        background-color: ${Theme.card.header};

        &:hover {
          background-color: ${Theme.card.hover};
        }
      `}
    >
      <span
        css={css`
          grid-row: 1 / 3;
          grid-column: 1/2;
          text-align: center;
          line-height: 100%;
          border: 1px solid;
          width: 60px;
          margin: 0 10px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 8px;
          margin-left: 1 0px;
          background-color: ${Theme.card.no};
        `}
      >
        {no}
      </span>
      <span
        css={css`
          font-size: 20px;
          padding-top: 12px;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          text-align: right;
          font-size: 10px;
          grid-row: 2 / 3;
          grid-column: 2/4;
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
  remove,
}: Omit<Props, "goDetail">) {
  const router = useRouter();
  const [markup, setMarkup] = useState<string>("<div/>");

  useEffect(() => {
    setMarkup(convert(contents));
  }, [contents]);

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 20px auto 1fr 40px;
        grid-template-columns: 80px 1fr 180px 90px;
        border: 1px solid black;
        border-radius: 8px;
        overflow: hidden;
        background-color: ${Theme.card.background};
      `}
    >
      <span
        css={css`
          grid-column: 1/2;
          grid-row: 1/3;
          border-bottom: 1px solid black;
          padding: 8px;
          position: relative;
          background-color: ${Theme.card.header};
        `}
      >
        <span
          css={css`
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;

            border: 1px solid;
            width: 60px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
            background-color: ${Theme.card.no};
          `}
        >
          {no}
        </span>
      </span>
      <span
        css={css`
          grid-column: 2/5;
          grid-row: 1/2;
          padding: 8px;
          font-size: 12px;
          background-color: ${Theme.card.header};
        `}
      >
        {category}
      </span>
      <span
        css={css`
          grid-column: 2/5;
          grid-row: 2/3;
          border-bottom: 1px solid black;
          padding: 8px;
          font-size: 24px;
          background-color: ${Theme.card.header};
        `}
      >
        {title}
      </span>
      <section
        css={css`
          grid-column: 1/5;
          grid-row: 3/4;
          padding: 20px;
          word-break: break-all;
          white-space: pre-line;
        `}
        dangerouslySetInnerHTML={{ __html: markup }}
      ></section>
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
          grid-column: ${remove == null ? `3/5` : `3/4`};
          grid-row: 4/5;
          padding: 8px;
          ${remove == null ? `text-align: right;` : ``};
        `}
      >
        {createdAt}
      </span>
      {remove == null ? null : (
        <Button
          css={css`
            grid-column: 4/5;
            grid-row: 4/5;
            margin: 0 auto;
          `}
          onClick={() => {
            remove({ no });
            router.push("/");
          }}
        >
          ??????
        </Button>
      )}
    </div>
  );
}

export const Card = {
  Summary,
  Detail,
};

function convert(html: string) {
  const lines = html
    .replaceAll("<", "&#60;")
    .replaceAll(">", "&#62;")
    .split("\n");
  const resultLines = [];

  let codeOpen = false;
  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      if (codeOpen) {
        resultLines.push(`</code>`);
        codeOpen = false;
      } else {
        resultLines.push(`<code style="${codeStyle}">`);
        codeOpen = true;
      }
      continue;
    }

    let result = "";
    const tokens = line.split("**");

    for (let i = 0; i < tokens.length; i++) {
      // ??? ??????????????? ????????? ????????? ???
      if (i === 0) {
        result += tokens[i] !== "" ? `<span>${tokens[i]}</span>` : "";
        continue;
      }

      // ?????? ????????? ???
      if (i % 2 === 1) {
        result += "<span style='font-weight: bold;'>" + tokens[i] + "</span>";
        continue;
      }

      // ?????? ????????? ???
      if (i % 2 === 0) {
        result += tokens[i] !== "" ? `<span>${tokens[i]}</span>` : "";
        continue;
      }

      // ????????? ????????? ???
      if (i !== tokens.length - 1) {
        result += tokens[i] !== "" ? `${tokens[i]}</span>` : "";
        continue;
      }
    }

    resultLines.push(result);
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
  word-break: break-all;
  white-space: pre-wrap;
`;
