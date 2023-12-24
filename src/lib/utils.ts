import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//TIME CONVERT
export function timeAgo(timestamp: string): string {
  const seconds: number = Math.floor(
    (new Date().getTime() - new Date(timestamp).getTime()) / 1000
  );
  const intervals: number[] = [31536000, 2592000, 86400, 3600, 60];
  const units: string[] = ["year", "month", "day", "hour", "minute"];

  for (let i = 0; i < intervals.length; i++) {
    const value: number = Math.floor(seconds / intervals[i]);
    if (value >= 1) {
      return `${value} ${units[i]}${value === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
}
