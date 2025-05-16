import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import AboutSidebar from "../../components/AboutSidebar";
import ProcessAndFees from "./ProcessAndFees";
import { useState, useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";

const Admissions = () => {

  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);
    useEffect(() => {
      if (data) {
        setBanner(data.filter((item) => item.category === "Admissions"));
      }
    }, [data]);
  
  const breadcrumbItems = [
    { href: "/", label: "Home" },

    { label: "Admissions" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title=""
        imageSrc={banner[0]?.url || "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="col-span-1 pt-12 md:col-span-4">
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
      </Container>
    </div>
  );
};

export default Admissions;
