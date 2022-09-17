import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Background } from "../components/Background";
import { CardList } from "../components/CardList";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { RegisterUser } from "../components/modal/RegisterUser";
import { useUser } from "../hooks/useUser";
import { Learning } from "../models/learning";
import { fetchLearningList } from "../remotes/learning";

export function MyPage({ secretKey: initial }: { secretKey: string }) {
  const router = useRouter();
  const [user] = useUser(initial);
  const [learningList, setLearningList] = useState<Learning[]>();

  useEffect(() => {
    if (user != null && "username" in user) {
      fetchLearningList(user.username).then(setLearningList);
    }
  }, [user]);

  return (
    <Background>
      <Main>
        <Title center>Memory Map</Title>
        <CardList
          list={learningList ?? []}
          useInput
          goDetail={(no) => {
            router.push(`/my/learning/${no}`);
          }}
        />
        <RegisterUser initial={initial} />
      </Main>
    </Background>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { secretKey: uuidv4(), learningList: [] },
  };
};
