"use client";

import { InputFile } from "@/components/file-input";
import { Slider } from "@/components/ui/slider";
import { useRef, useState } from "react";

export default function Home() {
  const ref = useRef<any>(null);

  const [brightness, setBrightness] = useState(100); // Default brightness value
  const [contrast, setContrast] = useState(100); // Default contrast value

  const [image, setImage] = useState<any>(null);

  const onChange = (e: any) => {
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e: any) {
      var image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        setImage(image);
        drawImageData(image);
      };
    };

    fileReader.readAsDataURL(file);
  };

  function drawImageData(image: any) {
    const canvas = ref.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    image.height *= canvas.offsetWidth / image.width;
    image.width = canvas.offsetWidth;

    if (image.height > canvas.offsetHeight) {
      image.width *= canvas.offsetHeight / image.height;
      image.height = canvas.offsetHeight;
    }

    // Clear previous image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    ctx.drawImage(image, 0, 0, image.width, image.height);
  }

  const handleBrightnessChange = (value: any) => {
    setBrightness(value);
    drawImageData(image);
  };

  const handleContrastChange = (value: any) => {
    setContrast(value);
    drawImageData(image);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex space-y-3">
        <InputFile onChange={onChange} />

        <div className="flex">
          <div className="w-1/6 space-y-2">
            <div className="space-y-2 p-2 flex-col items-center">
              <p className="text-center">어떤속성</p>
              <Slider
                onValueChange={handleBrightnessChange}
                defaultValue={[33]}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2 p-2 flex-col items-center">
              <p className="text-center">어떤속성</p>
              <Slider
                onValueChange={handleContrastChange}
                defaultValue={[33]}
                max={100}
                step={1}
              />
            </div>
          </div>

          <canvas width={500} height={700} ref={ref} />
        </div>
      </div>
    </main>
  );
}
