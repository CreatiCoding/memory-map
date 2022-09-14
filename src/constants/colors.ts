export const COLOR_SET = {
  PASTEL: {
    lightred: "rgb(245, 230, 235)",
    lightvilot: "rgb(231, 228, 241)",
    blue: "rgb(210, 218, 233)",
    vilot: "rgb(217, 207, 222)",
    red: "rgb(250, 207, 207)",
    yellow: "rgb(254, 240, 214)",
  },
  NOTION: {
    background: "#f6f6f6",
    header: "#ffffee",
    hover: "#ededeb",
    deep: "#37352f73",
  },
};

export const DefaultTheme = {
  card: {
    header: "lightgreen",
    no: "bisque",
    viewCount: "bisque",
    background: "lightcyan",
    hover: "#91ffff",
  },
  button: {
    primary: "palegreen",
    hover: "lightgreen",
  },
};

export const PASTEL_THEME = {
  card: {
    background: COLOR_SET.PASTEL.yellow,
    header: "white",
    no: COLOR_SET.PASTEL.lightvilot,
    viewCount: COLOR_SET.PASTEL.lightvilot,
    hover: COLOR_SET.PASTEL.vilot,
  },
  button: {
    primary: COLOR_SET.PASTEL.lightvilot,
    hover: COLOR_SET.PASTEL.vilot,
  },
};

export const NOTION_THEME = {
  card: {
    background: "white",
    header: COLOR_SET.NOTION.header,
    no: "white",
    viewCount: "white",
    hover: COLOR_SET.NOTION.hover,
  },
  button: {
    primary: COLOR_SET.NOTION.background,
    hover: COLOR_SET.NOTION.hover,
  },
};

export const Theme = NOTION_THEME;
