"use client";

import Palette from "@/components/Palette";
import { useState } from "react";

interface IPage {
  params: { slug: string };
}

const Page = ({ params }: IPage) => {
  const generatedColor = params.slug;

  const colors: undefined | string[] | any =
    generatedColor && generatedColor.split("-");

  const [colorPalettes, setColorPalettes] = useState(colors);
  return (
    <div className="flex lg:pt-[66px] flex-col">
      <div className="flex  lg:flex-row flex-col w-full h-screen">
        {colorPalettes.map((color: string, idx: number) => (
          <Palette
            color={color}
            key={color}
            colors={colors}
            lockedHexes={[]}
            colorIndex={idx}
            setLockedHexes={function (value: string[]): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
