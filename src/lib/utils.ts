import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToAvatar(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
