import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import PgdmProgramTab from "./PgdmProgramTab";
import ProjectTab from "./ProjectTab";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import SemesterTabs from "./SemesterTabs";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
const Pgdm = () => {
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
        (item) => item.category === "PGDM Mobile"
      )?.url;
      const desktopImage = data.find((item) => item.category === "PGDM")?.url;

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
    { href: "/programs/pgdm", label: "Programs" },
    { label: "PGDM" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      
    </div>
  );
};

export default Pgdm;
