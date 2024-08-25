"use client";

import React, {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BlurFilter, DisplayObject, Graphics, TextStyle } from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { PocaBack, PocaCap, PocaWord } from "./pocas";
import { InputFile } from "@/components/file-input";
import { Button } from "@/components/ui/button";

interface Draggable extends DisplayObject {
  data: any | null;
  dragging: boolean;
}

export function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const useDrag = ({ x, y }: any) => {
  const sprite = useRef<any>();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });

  const onDown = React.useCallback(() => setIsDragging(true), []);
  const onUp = React.useCallback(() => setIsDragging(false), []);
  const onMove = React.useCallback(
    (e: any) => {
      if (isDragging && sprite.current) {
        setPosition(e.data.getLocalPosition(sprite.current.parent));
      }
    },
    [isDragging, setPosition],
  );

  return {
    ref: sprite,
    interactive: true,
    pointerdown: onDown,
    pointerup: onUp,
    pointerupoutside: onUp,
    pointermove: onMove,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0.5,
    position,
  };
};

function App() {
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";
  const [image, setImage] = useState<string>("");

  const [myselfImage, setMyselfImage] = useState<any>("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function (e: any) {
      const image = new Image();
      image.src = e.target.result;
      image.width = 650;

      image.onload = function () {
        setMyselfImage(image.src);
      };
    };

    fileReader.readAsDataURL(file);
  };

  const ref = useRef<any>();

  const capBind = useDrag({ x: PocaCap.x, y: PocaCap.y });
  const wordBind = useDrag({ x: PocaWord.x, y: PocaWord.y });
  const pictureBind = useDrag({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      (async () => {})();
    }
  }, [ref]);

  const handleOnClick = async () => {
    const app = ref.current.app;

    const graphics = new Graphics().beginFill(0xff0000).drawCircle(0, 0, 50);

    const image = await app.renderer.plugins.extract.image(
      app.stage,
      "image/png",
      1,
    );

    downloadURI(image.src, "poca.png");
  };

  return (
    <>
      <h1>아직 작업중...</h1>
      <Button onClick={handleOnClick}>download</Button>
      <InputFile onChange={onChange} />

      <br />

      <Stage
        ref={ref}
        width={650}
        height={1004}
        options={{ background: 0xfee1c6 }}
        className="m-auto"
      >
        {myselfImage && (
          <Sprite
            width={650}
            height={1004}
            image={myselfImage}
            {...pictureBind}
          />
        )}
        <Sprite image={PocaBack.image} x={PocaBack.x} y={PocaBack.y} />

        <Sprite
          image={PocaCap.image}
          x={PocaCap.x}
          y={PocaCap.y}
          cursor="pointer"
          {...capBind}
        />

        <Sprite cursor="pointer" image={PocaWord.image} {...wordBind} />
      </Stage>
    </>
  );
}

export default function WrapperApp() {
  const [isSSr, setIsSSr] = useState(true);

  useEffect(() => {
    setIsSSr(false);
  }, []);

  if (isSSr) {
    return null;
  }

  return <App />;
}
