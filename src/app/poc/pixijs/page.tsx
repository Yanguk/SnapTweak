"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { BlurFilter, DisplayObject, TextStyle } from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { PocaBack, PocaCap, PocaWord } from "./pocas";
import { InputFile } from "@/components/file-input";

interface Draggable extends DisplayObject {
  data: any | null;
  dragging: boolean;
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

  const capBind = useDrag({ x: PocaCap.x, y: PocaCap.y });
  const wordBind = useDrag({ x: PocaWord.x, y: PocaWord.y });

  return (
    <>
      <h1>아직 작업중...</h1>
      <InputFile />

      <br />

      <Stage
        width={650}
        height={1004}
        options={{ background: 0xfee1c6 }}
        className="m-auto"
      >
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
