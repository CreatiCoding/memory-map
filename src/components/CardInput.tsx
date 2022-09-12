import { Learning, useLearning } from "../hooks/useLearning";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "./Input";
import { width } from "../utils/css";
import { css } from "@emotion/react";
import { Button } from "./Button";

interface InputProps {
  title: string;
  contents: string;
}

const defaultValues = {
  title: "",
  contents: "",
};

export function CardInput({ category }: Pick<Learning, "category">) {
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
        ${width(500)}
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
