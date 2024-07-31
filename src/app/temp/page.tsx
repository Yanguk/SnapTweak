"use client";

import { InputFile } from "@/components/file-input";
import dynamic from "next/dynamic";
import { ChangeEventHandler, useEffect, useState } from "react";

const LazyFilter = dynamic(() => import("@/section/filter"), { ssr: false });

export default function Home() {
  const [image, setImage] = useState<any>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function (e: any) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        setImage(image);
      };
    };

    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image) {
      const image = new Image();

      image.src =
        process.env.NODE_ENV === "production"
          ? "/SnapTweak/IMG_3599.png"
          : "/IMG_3599.png";

      image.onload = function () {
        setImage(image);
      };
    }
  }, [image]);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 h-full">
      <h1>대충 기능 테스트용으로 만든 데모 사이트 By yagnuk</h1>
      <h1 className="mb-5">추후 기능 하나씩 붙혀보면서 만들어볼예정</h1>

      <InputFile onChange={onChange} />

      {image && (
        <div className="size-full max-w-3xl">
          <LazyFilter image={image} />
        </div>
      )}
    </main>
  );
}
