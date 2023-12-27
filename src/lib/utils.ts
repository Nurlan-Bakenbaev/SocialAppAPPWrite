import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
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
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};


export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength - 3) + "...";
  }
}
