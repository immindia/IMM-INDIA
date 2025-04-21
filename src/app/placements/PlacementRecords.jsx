// import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
// import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, ChevronDown, ChevronUp } from "lucide-react";
import PlacementStats from "./PlacementStats";
import PlacementGrid from "./PlacementGrid";
import PlacementPieChart from "./PlacementPieChart";
const PlacementRecords = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/placements/placement-records", label: "Placement Records" },
    { label: "Placement Records" },
  ];

  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title="Placement Records"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
        <PlacementStats/>
        <div className="w-full bg-slate-50">
          <PlacementPieChart/>
        </div>
      {/* <Container className="container grid "> */}
        {/* <Heading
          title="Placement Records"
          titleClassName="text-primary-color lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Discover the industry leaders who trust our platform for their recruitment needs."
          className="pt-12 lg:pb-10 mx-auto"
        /> */}
      {/* </Container> */}
     <PlacementGrid/>
      <div className="bg-slate-50"></div>
    </div>
  );
};

export default PlacementRecords;
