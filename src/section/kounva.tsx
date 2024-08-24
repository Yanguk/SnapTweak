"use client";

import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Circle, Image, Layer, Line, Rect, Stage, Text } from "react-konva";
import Konva from "konva";
import { Button } from "@/components/ui/button";

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Filter({ image }: { image: HTMLImageElement }) {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [emboss, setEmboss] = useState(0.5);

  //  var layer = new Konva.Layer();
  //
  // var star = new Konva.Star({
  //   x: stage.width() / 2,
  //   y: stage.height() / 2,
  //   numPoints: 6,
  //   innerRadius: 40,
  //   outerRadius: 70,
  //   fill: 'yellow',
  //   stroke: 'black',
  //   strokeWidth: 4,
  // });
  return (
    <div className="flex size-full mt-5">
      {/* 왼쪽 네브 */}
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

        <div className="space-y-2 p-2 flex-col items-center">
          <p className="text-center">Strength: {emboss}</p>
          <Slider
            disabled
            defaultValue={[emboss]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={([a]) => {
              setEmboss(a);
            }}
          />
        </div>
      </div>

      <Separator orientation="vertical" />

      <FilterWrapper image={image} h={h} s={s} l={l} emboss={emboss} />
    </div>
  );
}

function FilterWrapper({ image, h, s, l, emboss }: any) {
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

  const stageRef = React.useRef<any>(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({
      // mimeType: "image/jpeg",
      // quality: 2,
      // pixelRadio: 2,
    });
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    downloadURI(uri, "stage.png");
  };

  return (
    <div ref={divRef} className="flex-initial relative size-full">
      <Button className="mb-4" onClick={handleExport}>
        Click here to log stage data URL
      </Button>
      <Stage ref={stageRef} width={dimensions.width} height={dimensions.height}>
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
              // Konva.Filters.Emboss,
              // Konva.Filters.Grayscale,
            ]}
            // blukRadius={30}
            hue={h}
            saturation={s}
            luminance={l}
            strength={emboss}
          />
        </Layer>

        <Layer>
          <Text
            draggable
            text="Drag Me!!! / 할게 너무 많은데...  어떻게하지 너무 귀찮넹"
            fill="green"
            fontSize={20}
            y={420}
            x={20}
          />

          <Rect
            x={20}
            y={150}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            draggable
          />

          <Circle draggable x={200} y={200} radius={50} fill="green" />
          <Line
            x={20}
            y={300}
            points={[0, 0, 100, 0, 100, 100]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}
