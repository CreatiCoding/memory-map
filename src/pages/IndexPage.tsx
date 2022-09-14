import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { CardList } from "../components/CardList";
import { Txt } from "../components/Txt";
import { COLOR_SET } from "../constants/colors";
import { margin, width } from "../utils/css";

export function IndexPage() {
  const router = useRouter();
  return (
    <Background>
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
    </Background>
  );
}

const Background = styled.div`
  background-color: ${COLOR_SET.NOTION.background};
  min-height: 100vh;
  padding-bottom: 100px;
`;

const Main = styled.main`
  ${width(720)}
  margin: 0 auto;
`;

const Title = styled(Txt.H1)`
  ${margin(10)}
`;
