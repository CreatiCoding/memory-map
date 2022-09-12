import { css } from "@emotion/react";

const margin = (px: number) => {
  return css`
    margin: ${px}px;
  `;
};

margin.x = (px: number) => {
  return css`
    margin: 0 ${px}px 0 ${px}px;
  `;
};

margin.y = (px: number) => {
  return css`
    margin: ${px}px 0 ${px}px 0;
  `;
};

const width = (px: number) => {
  return css`
    width: ${px}px;
  `;
};

width.percent = (percent: number) => {
  return css`
    width: ${percent}%;
  `;
};

const height = (px: number) => {
  return css`
    height: ${px}px;
  `;
};

height.percent = (percent: number) => {
  return css`
    height: ${percent}%;
  `;
};

export { margin, width };

const cssUtils = { margin, width, height };

export default cssUtils;
