"use client";

import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { useState } from "react";

interface IPalette {
  color: string;
  colors: string[];
  lockedHexes: string[];
  colorIndex: number;
  setLockedHexes: (value: string[]) => void;
}

extend([namesPlugin]);

const Palette = ({
  color,
  colors,
  lockedHexes,
  colorIndex,
  setLockedHexes,
}: IPalette) => {
  const [colorInstance, setColorInstance] = useState(`#${color}`);

  const handleColorName = (hex: string) => {
    return colord(hex).toName({ closest: true });
  };

  const colorName = handleColorName(colorInstance);
  return (
    <div
      style={{ backgroundColor: colorInstance }}
      className="w-full lg:h-screen h-full flex flex-row-reverse justify-center items-center px-[5px] relative "
    >
      <div className=" lg:absolute left-0 flex lg:items-center flex-col w-full mb-1 text-white">
        <h3
          className="text-xl lg:text-[30px] uppercase font-semibold cursor-pointer text-left
        "
        >
          {colorInstance}
        </h3>

        <p className=" text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px]">
          {colorName}
        </p>
      </div>
    </div>
  );
};

export default Palette;
