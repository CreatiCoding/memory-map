import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { Learning, useLearning } from "../hooks/useLearning";
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

interface Props extends Pick<Learning, "category"> {
  width?: number;
}

export function CardInput({ category, width = 500 }: Props) {
  const { add } = useLearning(category);
  const router = useRouter();
  const methods = useForm<InputProps>({
    defaultValues,
    mode: "onChange",
  });
  const { title, contents } = methods.watch();

  return (
    <div
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
          onClick={methods.handleSubmit(() => {
            add({ title, contents, tags: [] });
            router.reload();
          })}
        >
          추가
        </Button.Submit>
      </FormProvider>
    </div>
  );
}
