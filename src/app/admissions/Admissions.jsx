import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import AboutSidebar from "../../components/AboutSidebar";
import ProcessAndFees from "./ProcessAndFees";
import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";

import { useFetch } from "../../hooks/useFetch";
import Magnet from "../../../yes/Magnet/Magnet";
import { Creative } from "./Creative";
import { API_ENDPOINTS } from "@/lib/api";

const Admissions = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - Admission");
    setDescription(
      "Apply now for IMM Admission – Get into one of India's top management institutes offering industry-focused PGDM and postgraduate courses after BCom. Secure your future with IMM's expert faculty and excellent placement opportunities."
    );
  }, [setTitle, setDescription]);

  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    `${API_ENDPOINTS.UPLOADS}/680fd14484b0a.png`
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
        (item) => item.category === "Admissions Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Admissions"
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

    { label: "Admissions" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="col-span-1 pt-8 md:col-span-4">
          <Heading
            title="Admission Process & Fees"
            titleClassName="text-primary-color  lg:text-5xl"
            subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-5xl mx-auto"
            subtitle="Discover our comprehensive admission process and fee structure. We're committed to making quality education accessible while maintaining transparency throughout your application journey."
            className="lg:pb-10"
          />
          <ProcessAndFees />
        </div>
        {/* <div className="self-start md:sticky md:top-5 hover:translate-x-3 hover:translate-y-3 transition-all duration-500">
          <AboutSidebar
            sidebarLinks={sidebarLinks}
            className="bg-black hover:bg-black/90"
          />
        </div> */}

        <Creative />
      </Container>

      <div className="fixed -right-10 top-1/2 z-50 transform -translate-y-1/2">
        <Magnet
          padding={150}
          disabled={window.innerWidth < 768 ? true : false}
          magnetStrength={2}
          className=""
        >
          <button
            onClick={() => {
              window.location.href = "https://admissions.immindia.edu.in/";
            }}
            target="_blank"
            className={`flex items-center rotate-[270deg] bg-blue-600 hover:bg-blue-700 text-white px-4 pt-2 pb-5 rounded-lg drop-shadow-lg transition-all duration-300 animate-pulse `}
          >
            Apply Now
          </button>
        </Magnet>
      </div>
    </div>
  );
};

export default Admissions;
