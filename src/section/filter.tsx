"use client";

import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Image, Layer, Stage } from "react-konva";
import Konva from "konva";

export default function Filter({ image }: { image: HTMLImageElement }) {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);

  return (
    <div className="flex size-full mt-5">
      <div className="w-40 space-y-2">
        <div className="space-y-2 p-2 flex-col items-center">
          <p className="text-center">Hue: {h}</p>
          <Slider
            defaultValue={[h]}
            min={0}
            max={259}
            step={1}
            onValueChange={([a]) => {
              setH(a);
            }}
          />
        </div>

        <div className="space-y-2 p-2 flex-col items-center">
          <p className="text-center">Saturation: {s}</p>
          <Slider
            defaultValue={[s]}
            min={-2}
            max={10}
            step={0.5}
            onValueChange={([a]) => {
              setS(a);
            }}
          />
        </div>

        <div className="space-y-2 p-2 flex-col items-center">
          <p className="text-center">Luminance: {l}</p>
          <Slider
            defaultValue={[s]}
            min={-2}
            max={2}
            step={0.1}
            onValueChange={([a]) => {
              setL(a);
            }}
          />
        </div>
      </div>

      <Separator orientation="vertical" />

      <FilterWrapper image={image} h={h} s={s} l={l} />
    </div>
  );
}

function FilterWrapper({ image, h, s, l }: any) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (image) {
      const imgWidth = image.naturalWidth;
      const imgHeight = image.naturalHeight;

      setImageDimensions({
        width: imgWidth,
        height: imgHeight,
      });
    }
  }, [image]);

  const getScaledImageDimensions = () => {
    const { width: stageWidth, height: stageHeight } = dimensions;

    const { width: imgWidth, height: imgHeight } = imageDimensions;

    if (!stageWidth || !stageHeight) return { width: 0, height: 0 };

    // Calculate aspect ratios
    const stageAspect = stageWidth / stageHeight;
    const imgAspect = imgWidth / imgHeight;

    let newWidth, newHeight;

    if (imgAspect > stageAspect) {
      newWidth = stageWidth;
      newHeight = stageWidth / imgAspect;
    } else {
      newHeight = stageHeight;
      newWidth = stageHeight * imgAspect;
    }

    return { width: newWidth, height: newHeight };
  };

  const { width: scaledImageWidth, height: scaledImageHeight } =
    getScaledImageDimensions();

  const imageRef = React.useRef<any>();

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (imageRef && imageDimensions.width) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current.cache();
    }
  }, [imageDimensions.width, imageRef]);

  return (
    <div ref={divRef} className="flex-initial relative size-full">
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Image
            alt="image"
            ref={imageRef}
            image={image}
            width={scaledImageWidth}
            height={scaledImageHeight}
            x={(dimensions.width - scaledImageWidth) / 2}
            y={(dimensions.height - scaledImageHeight) / 2}
            filters={[
              Konva.Filters.HSL,
              Konva.Filters.Blur,
              // Konva.Filters.Grayscale,
            ]}
            // blukRadius={30}
            hue={h}
            saturation={s}
            luminance={l}
          />
        </Layer>
      </Stage>
    </div>
  );
}
