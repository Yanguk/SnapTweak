import { BaseLayout } from "@/components/base-layout/index";
import dynamic from "next/dynamic";

const LazyFilter = dynamic(() => import("../section/filter"), { ssr: false });

export default function Home() {
  return (
    <BaseLayout.Container>
      <BaseLayout.Header>header fix</BaseLayout.Header>
      <BaseLayout.Body>content</BaseLayout.Body>
      <BaseLayout.Footer>footer</BaseLayout.Footer>
    </BaseLayout.Container>
  );
}
