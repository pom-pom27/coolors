"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { handleTextColorForeground } from "@/lib/utils";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { useState } from "react";
import Option from "./Option";

import ColorPicker from "react-best-gradient-color-picker";

import { useClickOutside } from "@/hooks/useClickOutside";
import { columnChildVariant, columnVariant } from "@/variants";
import { Reorder, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import rgbHex from "rgb-hex";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  const hexColor = `#${color}`;
  const [colorInstance, setColorInstance] = useState(hexColor);

  const [newColorPalettes, setNewColorPalettes] = useState<string[]>([]);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const textColorForeground = handleTextColorForeground(colorInstance);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const onClickOutside = () => {
    if (newColorPalettes.length) {
      const newRoute = newColorPalettes.join("-");

      router.replace(`/colors/${newRoute}`);
    }
    setShowColorPicker(false);
  };

  const outsideClickRef = useClickOutside(onClickOutside);

  const [isDraggable, setIsDraggable] = useState(false);

  const handleColorName = (hex: string) => {
    return colord(hex).toName({ closest: true });
  };

  const colorName = handleColorName(colorInstance);

  const handleHexToggle = (hex: string) => {
    if (lockedHexes.includes(hex)) {
      setLockedHexes(lockedHexes.filter((lockedHex) => lockedHex !== hex));
    } else {
      setLockedHexes([...lockedHexes, hex]);
    }
  };

  const handleSetColor = (color: string, index: number) => {
    const rgbToHex = rgbHex(color);
    const newColor = rgbToHex.replace(/^#/, "");

    if (newColor) {
      const newColors = [...colors];

      newColors[index] = newColor;

      setNewColorPalettes(newColors);
    }

    setColorInstance(rgbToHex);
  };

  return (
    <Reorder.Item
      dragListener={isDraggable}
      onDragEnd={() => setIsDraggable(false)}
      value={color}
      key={color}
      initial={"start"}
      whileHover={"show"}
      variants={columnVariant}
      style={{ backgroundColor: colorInstance }}
      className="w-full lg:h-screen h-full flex flex-row-reverse justify-center items-center px-[5px] relative "
    >
      {isDesktop ? (
        <motion.div variants={columnChildVariant}>
          <Option
            color={colorInstance}
            toggleHex={handleHexToggle}
            lockedHexes={lockedHexes}
            setDraggable={setIsDraggable}
          />
        </motion.div>
      ) : (
        <Option
          color={colorInstance}
          toggleHex={handleHexToggle}
          lockedHexes={lockedHexes}
          setDraggable={setIsDraggable}
        />
      )}

      {showColorPicker && (
        <div className="p-2 absolute z-50" ref={outsideClickRef}>
          <ColorPicker
            hideAdvancedSliders
            hideColorGuide
            hideControls
            hideEyeDrop
            hideGradientAngle
            hideGradientStop
            hideOpacity
            hidePresets
            width={300}
            height={200}
            value={colorInstance}
            onChange={(color) => {
              handleSetColor(color, colorIndex);
            }}
          />
        </div>
      )}
      <div
        className={`lg:absolute left-0 flex lg:items-center flex-col w-full mb-1 text-${textColorForeground} bottom-6`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <h3
                className="text-xl lg:text-[30px] uppercase font-semibold cursor-pointer text-left"
                onClick={() => setShowColorPicker((prev) => !prev)}
              >
                {colorInstance}
                <br />
              </h3>
            </TooltipTrigger>
            <TooltipContent>Select color</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className=" text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px]">
          {colorName}
        </p>
      </div>
    </Reorder.Item>
  );
};

export default Palette;
