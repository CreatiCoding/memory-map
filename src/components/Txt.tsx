import { css, jsx } from "@emotion/react";
import { ReactNode } from "react";

interface Props {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
  className?: string;
  center?: boolean;
  size?: number;
}

function Txt({ children, as = "p", center, className, size }: Props) {
  return jsx(as, { css: getCss({ as, center, size }), className }, children);
}

function getCss({
  as = "p",
  center,
  size,
}: Pick<Props, "as" | "center" | "size">) {
  const common = css`
    white-space: pre-wrap;
    text-align: ${center === true ? "center" : "unset"};
    ${size == null ? "" : "font-size: ${size}px;"}
  `;

  const headerCommon = css`
    font-weight: bold;
    ${common}
  `;

  switch (as) {
    case "h1": {
      return css`
        font-size: 32px;
        ${headerCommon}
      `;
    }
    case "h2": {
      return css`
        font-size: 24px;
        ${headerCommon}
      `;
    }
    case "h3": {
      return css`
        font-size: 18px;
        ${headerCommon}
      `;
    }
    case "h4": {
      return css`
        font-size: 16px;
        ${headerCommon}
      `;
    }
    case "h5": {
      return css`
        font-size: 14px;
        ${headerCommon}
      `;
    }
    case "span":
    case "p": {
      return css`
        font-size: 20px;
        ${common}
      `;
    }
  }
}

type HeaderProps = Omit<Props, "as">;

Txt.Header = ({ children, as = "p", center, className, size }: Props) => {
  return jsx(as, { css: getCss({ as, center, size }), className }, children);
};

Txt.H1 = (props: HeaderProps) => {
  return Txt.Header({ ...props, as: "h1" });
};
Txt.H2 = (props: HeaderProps) => {
  return Txt.Header({ ...props, as: "h2" });
};
Txt.H3 = (props: HeaderProps) => {
  return Txt.Header({ ...props, as: "h3" });
};
Txt.H4 = (props: HeaderProps) => {
  return Txt.Header({ ...props, as: "h4" });
};
Txt.H5 = (props: HeaderProps) => {
  return Txt.Header({ ...props, as: "h5" });
};

export { Txt };
