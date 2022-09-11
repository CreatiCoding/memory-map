import { CardList } from "../components/CardList";

export function IndexPage() {
  return (
    <div>
      <main>
        <h1>Hello world!</h1>
      </main>
      <section>
        <CardList category="coding-architecture" />
      </section>
    </div>
  );
}
