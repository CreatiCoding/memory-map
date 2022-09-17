import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { useUser } from "../hooks/useUser";
import { Learning } from "../models/learning";
import { fetchLearning } from "../remotes/learning";

export function MyLearningDetailPage({
  secretKey: initial,
}: {
  secretKey: string;
}) {
  const router = useRouter();
  const [learning, setLearning] = useState<Learning>();
  const [user] = useUser(initial);

  useEffect(() => {
    const { no } = router.query;

    if (!router.isReady) {
      return;
    }
    if (no == null || isNaN(Number(no))) {
      return;
    }

    if (user == null || !("username" in user) || user.username === "") {
      return;
    }

    fetchLearning(user.username, Number(no)).then(setLearning);
  }, [router.isReady, router.query, router.query.no, user]);

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
        <Card.Detail {...learning} category={"coding-architecture"} />
      </Main>
    </Background>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { secretKey: uuidv4() },
  };
};
