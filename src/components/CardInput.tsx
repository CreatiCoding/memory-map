import { css } from "@emotion/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { createLearning } from "../remotes/learning";
import cssUtils from "../utils/css";
import { Button } from "./Button";
import { Input } from "./Input";

interface InputProps {
  title: string;
  contents: string;
}

const defaultValues = {
  title: "",
  contents: "",
};

interface Props {
  className?: string;
  width?: number;
}

export function CardInput({ className, width = 500 }: Props) {
  const router = useRouter();

  const methods = useForm<InputProps>({
    defaultValues,
    mode: "onChange",
  });

  const { title, contents } = methods.watch();

  return (
    <div
      className={className}
      css={css`
        ${cssUtils.width(width)}
        margin: 0 auto;
      `}
    >
      <FormProvider {...methods}>
        <Input placeholder="Title" type="text" name="title" width={500} />
        <Input
          placeholder="Contents"
          type="textarea"
          name="contents"
          width={500}
        />
        <Button.Submit
          onClick={methods.handleSubmit(async () => {
            try {
              await createLearning({ title, contents });

              router.reload();
            } catch (error: any) {
              if (axios.isAxiosError(error)) {
                alert(JSON.stringify(error.response?.data, null, 2));
              } else {
                alert(error.message);
              }
            }
          })}
        >
          추가
        </Button.Submit>
      </FormProvider>
    </div>
  );
}
