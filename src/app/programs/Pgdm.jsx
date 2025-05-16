import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import PgdmProgramTab from "./PgdmProgramTab";
import ProjectTab from "./ProjectTab";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import img from "../../assets/pgdm/pgdmBanner.jpg";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedCertification";
import SemesterTabs from "./SemesterTabs";
const Pgdm = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    if (data) {
      setBanner(data.filter((item) => item.category === "PGDM"));
    }
  }, [data]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/programs/pgdm", label: "Programs" },
    { label: "PGDM" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={
          banner[0]?.url ||
          "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
        }
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container>
        <div className="">
          <Heading
            title="Post Graduate Diploma in Management"
            titleClassName="lg:font-extrabold font-bold text-primary-color"
            subtitle="Our PGDM program is designed to provide a comprehensive understanding of modern business practices"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal  text-center mx-auto max-w-5xl"
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
                
                <SemesterTabs />
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

            <TabsContent value="global" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">IMM Goes Global</h2>
                <p className="text-gray-600">
                  Our international partnerships and global exposure
                  initiatives...
                  {/* Add your global content here */}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default Pgdm;
