// import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
// import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, ChevronDown, ChevronUp } from "lucide-react";
import PlacementStats from "./PlacementStats";
import PlacementGrid from "./PlacementGrid";
import PlacementPieChart from "./PlacementPieChart";
import { useFetch } from "../../hooks/useFetch";

const PlacementRecords = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
  ); // Default image
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data) {
      const mobileImage = data.find(
        (item) => item.category === "Placement Records Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Placement Records"
      )?.url;

      if (isMobile && mobileImage) {
        setBannerImage(mobileImage);
      } else if (!isMobile && desktopImage) {
        setBannerImage(desktopImage);
      } else if (desktopImage) {
        setBannerImage(desktopImage);
      } else if (mobileImage) {
        setBannerImage(mobileImage);
      }
    }
  }, [data, isMobile]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/placements/placement-records", label: "Placements" },
    { label: "Placement Records" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <PlacementStats />
      <div className=" bg-slate-50">
        <PlacementPieChart />
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
      <PlacementGrid />
      <div className="bg-slate-50"></div>
    </div>
  );
};

export default PlacementRecords;
