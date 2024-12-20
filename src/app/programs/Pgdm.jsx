import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";
import PgdmProgramTab from "./PgdmProgramTab";
import ProjectTab from "./ProjectTab";
const Pgdm = () => {
  return (
    <Container>
      <div className="">
        <Heading
          title="Post Graduate Diploma in Management"
          titleClassName="lg:font-extrabold font-bold text-primary-color"
          subtitle="Our PGDM program is designed to provide a comprehensive understanding of modern business practices..."
          subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal  text-center mx-auto"
          className="w-full text-center sm:col-span-4 "
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
  );
};

export default Pgdm;
