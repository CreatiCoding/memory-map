import { css } from "@emotion/react";

const margin = (px: number, x?: number) => {
  if (x == null) {
    return css`
      margin: ${px}px;
    `;
  } else {
    return css`
      margin: ${px}px ${x}px;
    `;
  }
};

margin.x = (px: number) => {
  return css`
    margin-left: ${px}px;
    margin-right: ${px}px;
  `;
};

margin.y = (px: number) => {
  return css`
    margin-top: ${px}px;
    margin-bottom: ${px}px;
  `;
};

const padding = (px: number, x?: number) => {
  if (x == null) {
    return css`
      padding: ${px}px;
    `;
  } else {
    return css`
      padding: ${px}px ${x}px;
    `;
  }
};

padding.top = (px: number) => css`
  padding-top: ${px}px;
`;
padding.bottom = (px: number) => css`
  padding-bottom: ${px}px;
`;
padding.left = (px: number) => css`
  padding-left: ${px}px;
`;
padding.right = (px: number) => css`
  padding-right: ${px}px;
`;
padding.x = (px: number) => {
  return css`
    padding-left: ${px}px;
    padding-right: ${px}px;
  `;
};

padding.y = (px: number) => {
  return css`
    padding-top: ${px}px;
    padding-bottom: ${px}px;
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

const cssUtils = { margin, padding, width, height };

export default cssUtils;

export { margin, padding, width, height };
