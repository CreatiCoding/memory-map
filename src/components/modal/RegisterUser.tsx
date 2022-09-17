import styled from "@emotion/styled";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";
import { padding, width } from "../../utils/css";
import { Button } from "../Button";
import { Input } from "../Input";
import Spacing from "../Spacing";
import { Txt } from "../Txt";

export function RegisterUser({ initial }: { initial: string }) {
  const [user, setUserName] = useUser(initial);
  const { Modal, isOpen, open, close } = useModal();
  const methods = useForm<{ username: string }>({
    mode: "onChange",
    defaultValues: { username: "" },
  });

  useEffect(() => {
    if (isOpen) {
      return;
    }

    if (user == null || ("username" in user && user.username != null)) {
      return;
    }

    open();
  }, [isOpen, open, user]);

  return (
    <Modal
      open={isOpen}
      close={() => {
        if (user == null || ("username" in user && user.username != null)) {
          return;
        }

        close();
      }}
      content={
        <Container>
          <Txt size={20}>닉네임을 입력하여 메모링을 시작해보세요.</Txt>

          <Spacing size={20} />

          <FormProvider {...methods}>
            <Input
              placeholder="닉네임"
              name="username"
              type="text"
              css={width.percent(100)}
            />
            <Button.Submit
              onClick={methods.handleSubmit(({ username }) => {
                setUserName(username);
                close();
              })}
            >
              추가
            </Button.Submit>
          </FormProvider>
        </Container>
      }
    />
  );
}

const Container = styled.div`
  ${padding(0, 20)}
`;
