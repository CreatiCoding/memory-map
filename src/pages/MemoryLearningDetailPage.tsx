import { GetServerSideProps } from "next";
import { validateString } from "../apis/utils/validate";
import { Background } from "../components/Background";
import { Card } from "../components/Card";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { Learning } from "../models/learning";
import { fetchLearning } from "../remotes/learning";

export function MemoryLearningDetailPage({ learning }: { learning: Learning }) {
  const category = "coding-architecture";

  return (
    <Background>
      <Main>
        <br />
        <Title center>Memory Map</Title>
        <br />
        <br />
        <Card.Detail {...learning} category={category} />
      </Main>
    </Background>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, no } = context.query;

  if (!validateString(username) || !validateString(no) || isNaN(Number(no))) {
    return {
      redirect: {
        destination: "/my",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username,
      learning: await fetchLearning(username, Number(no)),
    },
  };
};
