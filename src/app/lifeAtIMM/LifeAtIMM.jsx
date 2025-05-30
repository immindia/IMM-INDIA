import React, { useState, useEffect } from "react";
import { useMeta } from '@/context/MetaContext';
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import { useFetch } from "../../hooks/useFetch";

const LifeAtIMM = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("New Infrastructure and Campus - IMM India");
    setDescription("Discover the new infrastructure and vibrant student life at IMM India. Explore modern classrooms, tech-enabled learning, and a dynamic campus environment that fosters holistic development and career growth.");
  }, [setTitle, setDescription]);

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
        (item) => item.category === "Life at IMM Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Life at IMM"
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
    { href: "/life-at-imm/life-at-imm", label: "Life at IMM" },
    { label: "Life at IMM" },
  ];

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Life at IMM"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid">
        <Heading
          title="Life at IMM"
          titleClassName="text-primary-color lg:text-5xl"
          subtitleClassName="text-gray-500 m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Experience the vibrant campus life and diverse activities at IMM"
          className="pt-12"
        />
        <div className="py-8">
          <p className="text-gray-600">
            Content for Life at IMM page will be displayed here.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LifeAtIMM;
