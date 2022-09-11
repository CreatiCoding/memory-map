import { css } from "@emotion/react";
import { CardList } from "../components/CardList";
import { Txt } from "../components/Txt";
import { margin, width } from "../utils/css";

export function IndexPage() {
  return (
    <div>
      <main
        css={css`
          ${width(720)}
          margin: 0 auto;
        `}
      >
        <Txt.H1 center css={margin(10)}>
          Memory Map
        </Txt.H1>

        <br />

        <section>
          <CardList category="coding-architecture" />
        </section>
      </main>
    </div>
  );
}
