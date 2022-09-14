import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { Learning, useLearning } from "../hooks/useLearning";

export function LearningDetailPage() {
  const router = useRouter();
  const category = "coding-architecture";
  const { getDetail, remove } = useLearning(category);
  const [learning, setLearning] = useState<Learning>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const no = Number(router.query.no);

    if (isNaN(no)) {
      throw new Error("no가 올바르지 않습니다.");
    }

    setLearning(getDetail({ no }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.no]);

  if (learning == null) {
    return <></>;
  }

  return (
    <Background>
      <Main>
        <br />
        <Title center>Memory Map</Title>
        <br />
        <br />
        <Card.Detail {...learning} category={category} remove={remove} />
      </Main>
    </Background>
  );
}
