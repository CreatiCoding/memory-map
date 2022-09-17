import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { validateString } from "../apis/utils/validate";
import { Background } from "../components/Background";
import { CardList } from "../components/CardList";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { Learning } from "../models/learning";
import { fetchLearningList } from "../remotes/learning";

export function MemoryPage({
  username,
  learningList,
}: {
  username: string;
  learningList: Learning[];
}) {
  const router = useRouter();

  return (
    <Background>
      <Main>
        <Title center>{`${username}'s Memory Map`}</Title>
        <CardList
          list={learningList}
          pageSize={
            router.query.pageSize != null ? Number(router.query.pageSize) : 20
          }
          goDetail={(no) => {
            router.push(`/memory/${username}/learning/${no}`);
          }}
        />
      </Main>
    </Background>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  if (!validateString(username)) {
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
      learningList: await fetchLearningList(username),
    },
  };
};
