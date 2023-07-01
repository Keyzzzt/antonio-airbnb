"use client";
import React, { FC } from "react";

type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

export const Heading: FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
    </div>
  );
};
