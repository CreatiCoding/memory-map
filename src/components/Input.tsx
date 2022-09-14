import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";
import cssUtils from "../utils/css";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  type: "text" | "textarea";
  className?: string;
  width?: number;
}

export function Input({
  label,
  placeholder,
  name,
  type,
  className,
  width = 300,
}: Props) {
  const { register, watch, formState } = useFormContext();
  const errors = formState.errors;
  const value = watch()[name];

  if (type === "textarea") {
    return (
      <>
        <Container className={className} width={width}>
          {label != null && (
            <Label css={cssUtils.width.percent(20)}>{label}</Label>
          )}

          <textarea
            placeholder={placeholder}
            css={css`
              resize: none;
              ${fieldCss}
              ${label != null
                ? cssUtils.width.percent(80)
                : cssUtils.width.percent(100)}
            `}
            value={value}
            {...register(name, {
              validate: {
                empty: (v) => (v != null && v !== "") || "값을 입력해주세요",
              },
            })}
            rows={6}
          />
        </Container>
        <Message message={errors[name]?.message} />
      </>
    );
  }

  return (
    <>
      <Container className={className} width={width}>
        {label != null && (
          <Label css={cssUtils.width.percent(20)}>{label}</Label>
        )}

        <input
          placeholder={placeholder}
          css={css`
            ${fieldCss}
            ${label != null
              ? cssUtils.width.percent(80)
              : cssUtils.width.percent(100)}
          `}
          type={type}
          value={value}
          {...register(name, {
            validate: {
              empty: (v) => (v != null && v !== "") || "값을 입력해주세요",
            },
          })}
        />
      </Container>
      <Message message={errors[name]?.message} />
    </>
  );
}

function Message({
  message,
}: {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return (
    <p
      css={css`
        ${cssUtils.height(10)}
        font-size: 10px;
        margin: 4px;
      `}
    >
      {message != null && message !== "" ? `🚨 ${message}` : ""}
    </p>
  );
}

const fieldCss = css`
  padding: 4px;
  border: 1px solid #303030;
  border-radius: 4px;

  &:focus {
    outline: none !important;
    border: 1px solid #303030;
    background-color: #f0f0f0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${(props: { width: number }) => cssUtils.width(props.width)};
`;

const Label = styled.label`
  text-align: center;
`;
