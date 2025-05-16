import React, { useState, useEffect } from "react";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import { useFetch } from "../../hooks/useFetch";

const LifeAtIMM = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    if (data) {
      setBanner(data.filter((item) => item.category === "Life at IMM"));
    }
  }, [data]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/life-at-imm/life-at-imm", label: "Life at IMM" },
    { label: "Life at IMM" },
  ];

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={
          banner[0]?.url ||
          "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
        }
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
