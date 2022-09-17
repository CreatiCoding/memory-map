import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { Background } from "../components/Background";
import { CardList } from "../components/CardList";
import { Main } from "../components/Main";
import { Title } from "../components/Title";
import { RegisterUser } from "../components/modal/RegisterUser";

export function IndexPage({ secretKey: initial }: { secretKey: string }) {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <Title center>Memory Map</Title>
        <CardList
          category="coding-architecture"
          pageSize={
            router.query.pageSize != null ? Number(router.query.pageSize) : 20
          }
        />
        <RegisterUser initial={initial} />
      </Main>
    </Background>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { secretKey: uuidv4() },
  };
};
