import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { CardList } from "../components/CardList";
import { Txt } from "../components/Txt";
import { margin, width } from "../utils/css";

export function IndexPage() {
  const router = useRouter();

  return (
    <Main>
      <br />
      <Title center>Memory Map</Title>
      <br />
      <br />
      <CardList
        category="coding-architecture"
        pageSize={
          router.query.pageSize != null ? Number(router.query.pageSize) : 20
        }
      />
    </Main>
  );
}

const Main = styled.main`
  ${width(720)}
  margin: 0 auto;
`;

const Title = styled(Txt.H1)`
  ${margin(10)}
`;
