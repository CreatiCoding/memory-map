import { css } from "@emotion/react";
import { MouseEventHandler, ReactNode } from "react";
import { Theme } from "../constants/colors";
import cssUtils from "../utils/css";

interface Props {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  width?: number;
  right?: boolean;
}

function Button({ className, onClick, children, width, right = false }: Props) {
  return (
    <button
      className={className}
      onClick={onClick}
      css={css`
        ${cssUtils.width(width ?? 50)}
        ${rightCss(right)}

        border: 1px solid;
        border-radius: 6px;
        width: 60px;
        height: 30px;
        cursor: pointer;
        background-color: ${Theme.button.primary};
        &:hover {
          background-color: ${Theme.button.hover};
        }
      `}
    >
      {children}
    </button>
  );
}

Button.Submit = function SubmitButton(props: Props) {
  return <Button {...props} right />;
};

export { Button };

function rightCss(enable: boolean) {
  if (enable) {
    return css`
      margin: 0 0 0 100%;
      transform: translate(-100%, 0);
    `;
  }
  return css``;
}
