"use client";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";

import { useEffect } from "react";

interface IPage {}

export const runtime = "edge";

const Page = ({}: IPage) => {
  const generateRandomColors = randomColor({
    hue: "random",
    count: 5,
    luminosity: "random",
  });

  const router = useRouter();

  const routeParams = generateRandomColors
    .map((color: string) => color.slice(1))
    .join("-");

  useEffect(() => {
    setTimeout(() => {
      router.push(`/colors/${routeParams}`);
    }, 100);
  }, []);

  return (
    <div className="h-screen bg-white w-screen flex justify-center items-center">
      <div className="border-gray-300 h-14 w-14 animate-spin rounded-full border-2 border-t-black"></div>
    </div>
  );
};

export default Page;
