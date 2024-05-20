import { clsx, type ClassValue } from "clsx";
import { colord, extend } from "colord";
import { twMerge } from "tailwind-merge";

import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleTextColorForeground(color: string): string {
  const luminance = colord(color).luminance();
  return luminance < 0.3 ? "white" : "black";
}
