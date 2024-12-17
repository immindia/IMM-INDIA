import ShimmerButton from "@/components/ui/shimmer-button";
import Heading from "../../components/Heading";
// import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import img from "../../assets/breadcrumb.png";

// import InfiniteCarousel from "../../components/ui/InfiniteCarousel";
import IconMarquee from "./IconMarquee";
import { ChevronRight } from "lucide-react";
import amazon from "../../assets/recruiters-logo/amazon.webp";
import cafe from "../../assets/recruiters-logo/cafe.webp";
import citibank from "../../assets/recruiters-logo/citibank.webp";
import emami from "../../assets/recruiters-logo/emami.webp";
import ese from "../../assets/recruiters-logo/ese.webp";
import euromonitor from "../../assets/recruiters-logo/euromonitor.webp";
import ey from "../../assets/recruiters-logo/ey.webp";
import haldiram from "../../assets/recruiters-logo/haldriram.webp";
import itc from "../../assets/recruiters-logo/itc.webp";
import khimji from "../../assets/recruiters-logo/khimji.webp";
import kotak from "../../assets/recruiters-logo/kotak.webp";
import kreative from "../../assets/recruiters-logo/kreative.webp";
import tcs from "../../assets/recruiters-logo/tcs.webp";
import zentrades from "../../assets/recruiters-logo/zentrades.webp";

const icons = [
  { src: amazon, alt: "Amazon" },
  { src: cafe, alt: "Cafe" },
  { src: citibank, alt: "Citibank" },
  { src: emami, alt: "Emami" },
  { src: ese, alt: "Ese" },
  { src: euromonitor, alt: "Euromonitor" },
  { src: ey, alt: "EY" },
  { src: haldiram, alt: "Haldiram" },
  { src: itc, alt: "ITC" },
  { src: khimji, alt: "Khimji" },
  { src: kotak, alt: "Kotak" },
  { src: kreative, alt: "Kreative" },
  { src: tcs, alt: "TCS" },
  { src: zentrades, alt: "Zentrades" },
];

const Recruiters = () => {
  return (
    <div className="relative ">
      <Container className=" ">
        {/* <div className="md:sticky md:top-5 self-start">
          <AboutSidebar sidebarLinks={sidebarLinks} />
        </div> */}
        <div className="">
          <Heading
            title="Our Prominent Recruiters"
            titleClassName="text-secondary-color text-left  text-center text-pink-950"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full text-center"
            subtitle="Top companies across various industries now choose IMM as a preferred destination for on-campus recruitment."
            className="lg:pb-10"
          />
          <IconMarquee icons={icons} />

          {/* <ShimmerButton className="shadow-2xl mt-12 mx-auto hover:-translate-y-2 duration-300 ease-in-out">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out ">
              View more
              <ChevronRight
                size={20}
                className="text-white mt-1 group-hover:translate-x-1 duration-300 ease-in-out"
              />
            </span>
          </ShimmerButton> */}
        </div>
      </Container>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default Recruiters;
