import * as BaseLayout from "@/components/base-layout";
import Some from "./temp/page";

export default function Home() {
  return <Some />

  return (
    <BaseLayout.Container>
      <BaseLayout.Header>준비중</BaseLayout.Header>
      <BaseLayout.Body>
        <Some />
      </BaseLayout.Body>
      <BaseLayout.Footer>footer</BaseLayout.Footer>
    </BaseLayout.Container>
  );
}
