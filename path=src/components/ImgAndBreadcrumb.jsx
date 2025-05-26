import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { useMediaQuery } from "react-responsive";

const ImgAndBreadcrumb = ({ imageSrc, imageAlt, breadcrumbItems, title }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="relative flex items-end justify-center h-56 sm:h-[30rem]">
      <img
        src={imageSrc}
        alt={imageAlt || "Image"}
        className="absolute w-full h-min object-cover"
      />
      <div className="absolute w-full h-full flex flex-col justify-end items-center">
        <div className="text-center text-white mb-4">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
};

export default ImgAndBreadcrumb;
