import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildTextChars(text: string) {
  let id = 0;
  return text.split(" ").map((word) => ({
    word,
    chars: [...word].map((char) => ({ char, id: id++ })),
  }));
}
