import * as BaseLayout from "@/components/base-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout.Container>
      <BaseLayout.Header>
        준비중
      </BaseLayout.Header>

      <BaseLayout.Body>
        <div className="flex-col p-3 space-y-3 size-full">
          <div>
            <Button>
              <Link href="/poc/kounva">go To kounva</Link>
            </Button>
          </div>

          <div>
            <Button>
              <Link href="/poc/pixijs">go To pixi</Link>
            </Button>
          </div>
        </div>
      </BaseLayout.Body>
      <BaseLayout.Footer>footer</BaseLayout.Footer>
    </BaseLayout.Container>
  );
}
