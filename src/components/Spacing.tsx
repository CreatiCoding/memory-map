import { css } from "@emotion/react";
import React from "react";

export default function Spacing({ size }: { size: number }) {
  return (
    <div
      css={css`
        width: 100%;
        height: ${size}px;
      `}
    />
  );
}
