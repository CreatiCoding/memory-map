import styled from "@emotion/styled";
import { CardList } from "../components/CardList";
import { Txt } from "../components/Txt";
import { margin, width } from "../utils/css";

export function IndexPage() {
  return (
    <Main>
      <Title center>Memory Map</Title>
      <br />
      <CardList category="coding-architecture" />
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
