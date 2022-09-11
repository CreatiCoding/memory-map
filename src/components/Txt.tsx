import { css, jsx } from "@emotion/react";
import { ReactNode } from "react";

interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
  className?: string;
  center?: boolean;
}

function Txt(props: Props) {
  const { as, className, children } = props;

  return jsx(as, { css: getCss(props), className }, children);
}

function getCss({ as, center }: Props) {
  const common = css`
    text-align: ${center === true ? "center" : "unset"};
    font-weight: bold;
  `;

  switch (as) {
    case "h1": {
      return css`
        ${common}
        font-size: 32px;
      `;
    }
    case "h2": {
      return css`
        ${common}
        font-size: 24px;
      `;
    }
    case "h3": {
      return css`
        ${common}
        font-size: 18px;
      `;
    }
    case "h4": {
      return css`
        ${common}
        font-size: 16px;
      `;
    }
    case "h5": {
      return css`
        ${common}
        font-size: 14px;
      `;
    }
  }
}

type HeaderProps = Omit<Props, "as">;

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

Txt.Header = (props: Props) => {
  const { className, children } = props;

  return jsx(props.as, { css: getCss(props), className }, children);
};

export { Txt };
