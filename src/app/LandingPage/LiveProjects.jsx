import Container from "../../components/wrappers/Container";
import { IndustryMarquee } from "./IndustryMarquee";

const LiveProjects = () => {
  return (
    <Container className="ezy__about11 pt-20 sm:px-8 light  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container ">
        <div className="grid grid-cols-12 gap-5 justify-start items-start">
          <div className="col-span-12 lg:col-span-6">
            <div className="text-left md:pr-20">
              <p className="opacity-75 uppercase pl-1">IIM India</p>
              <h1 className="text-4xl md:text-6xl leading-tight font-light uppercase tracking-wide">
                Our{" "}
                <span className="font-bold">
                  Live Projects International and National
                </span>
                <span className="inline-flex w-3 h-3 rounded-full bg-primary-color ml-2"></span>
              </h1>
              <p className="text-xl leading-normal opacity-75 mt-4 mb-6">
                Gain hands-on experience through our industry-integrated live
                projects, where students work directly with leading companies to
                solve real business challenges and implement innovative
                solutions.
              </p>
              <p className="opacity-50 text-sm ">
                Our live projects provide invaluable exposure to real-world
                business scenarios, enabling students to apply classroom
                learning to practical situations while building strong industry
                connections and enhancing their professional portfolio.
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <IndustryMarquee />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LiveProjects;
