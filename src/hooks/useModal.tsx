import styled from "@emotion/styled";
import { ReactNode, useEffect, useState } from "react";
import { Txt } from "../components/Txt";
import { Theme } from "../constants/colors";
import { isBrowser } from "../utils/browser";
import { padding } from "../utils/css";

export function useModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const body = document.querySelector("body");

    if (body == null) {
      return;
    }

    body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return {
    Modal,
    isOpen: open,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
}

function Modal({
  open,
  title = "안내",
  content,
  close,
}: {
  open: boolean;
  title?: string;
  content: ReactNode | string;
  close: () => void;
}) {
  return (
    <>
      {open ? (
        <ModalBackground onClick={close}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Txt.H1 center css={padding.y(20)}>
              {title}
            </Txt.H1>
            {typeof content === "string" ? (
              <Txt size={20} css={padding(0, 40)}>
                {content}
              </Txt>
            ) : (
              <>{content}</>
            )}
          </ModalContainer>
        </ModalBackground>
      ) : null}
    </>
  );
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  border: 1px solid;
  border-radius: 8px;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  width: 420px;
  height: 240px;
  background-color: ${Theme.card.background};
  border: 1px solid;
  border-radius: 8px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
