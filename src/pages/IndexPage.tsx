import { useRouter } from "next/router";
import { Background } from "../components/Background";
import { CardList } from "../components/CardList";
import { Main } from "../components/Main";
import { Title } from "../components/Title";

export function IndexPage() {
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
      </Main>
    </Background>
  );
}
