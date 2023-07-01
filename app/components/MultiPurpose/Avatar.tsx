"use client";
import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height="30"
      width="30"
      src="/images/avatar.png"
    />
  );
};
