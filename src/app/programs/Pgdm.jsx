import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import PgdmProgramTab from "./PgdmProgramTab";
import ProjectTab from "./ProjectTab";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { useFetch } from "../../hooks/useFetch";
import SemesterTabs from "./SemesterTabs";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
const Pgdm = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM Programs - PGDM");
    setDescription(
      "Explore AICTE-approved PGDM programs at IMM Delhi. Specializations in Marketing, Finance, HR, International Business, and more. Launch your career with industry-focused education at one of India's top B-schools."
    );
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
        title={window.innerWidth < 768 ? "PGDM" : ""}
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <section className="relative">
        <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent, z-[-99] relative)], hidden md:block"
          )}
        />
        <Container>
          <div className="">
            <Heading
              title="Post Graduate Diploma in Management"
              titleClassName="lg:font-extrabold font-bold text-primary-color"
              subtitle="Our PGDM program is designed to provide a comprehensive understanding of modern business practices"
              subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal  text-center mx-auto max-w-4xl backdrop-blur-sm"
              className="w-full text-center sm:col-span-4 pt-12"
            />

            <Tabs defaultValue="pgdm" className="w-full my-2">
              <TabsList className="grid w-full h-full grid-cols-2 ">
                <TabsTrigger
                  value="pgdm"
                  className="data-[state=active]:bg-pink-900 h-10 data-[state=active]:text-white"
                >
                  PGDM
                </TabsTrigger>
                {/* <TabsTrigger
              value="curriculum"
              className="data-[state=active]:bg-pink-900 h-10 data-[state=active]:text-white"
            >
              Curriculum
            </TabsTrigger> */}
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-pink-900 h-10 data-[state=active]:text-white"
                >
                  Projects
                </TabsTrigger>
                {/* <TabsTrigger
              value="global"
              className="data-[state=active]:bg-pink-900 h-10 data-[state=active]:text-white"
            >
              IMM Goes Global
            </TabsTrigger> */}
              </TabsList>
              <TabsContent value="pgdm" className="mt-6">
                <div className="space-y-8 sm:px-4">
                  <PgdmProgramTab />
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <ProjectTab />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <div className="space-y-8 sm:px-4">
                  <ProjectTab />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Container>{" "}
      </section>
    </div>
  );
};

export default Pgdm;
