import ShimmerButton from "@/components/ui/shimmer-button";
import Heading from "../../components/Heading";
// import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import img from "../../assets/breadcrumb.png";

// import InfiniteCarousel from "../../components/ui/InfiniteCarousel";
import IconMarquee from "./IconMarquee";
import { ChevronRight } from "lucide-react";
// import amazon from "../../assets/recruiters-logo/amazon.webp";
// import cafe from "../../assets/recruiters-logo/cafe.webp";
// import citibank from "../../assets/recruiters-logo/citibank.webp";
// import emami from "../../assets/recruiters-logo/emami.webp";
// import ese from "../../assets/recruiters-logo/ese.webp";
// import euromonitor from "../../assets/recruiters-logo/euromonitor.webp";
// import ey from "../../assets/recruiters-logo/ey.webp";
// import haldiram from "../../assets/recruiters-logo/haldriram.webp";
// import itc from "../../assets/recruiters-logo/itc.webp";
// import khimji from "../../assets/recruiters-logo/khimji.webp";
// import kotak from "../../assets/recruiters-logo/kotak.webp";
// import kreative from "../../assets/recruiters-logo/kreative.webp";
// import tcs from "../../assets/recruiters-logo/tcs.webp";
// import zentrades from "../../assets/recruiters-logo/zentrades.webp";
import acuteRating from "../../assets/recruiters-logo-marquee/Acute rating logo.webp";
import airtel from "../../assets/recruiters-logo-marquee/airtel logo.webp";
import anandRathi from "../../assets/recruiters-logo-marquee/Anand rathi logo.webp";
import axis from "../../assets/recruiters-logo-marquee/axis logo.webp";
import bajajCapital from "../../assets/recruiters-logo-marquee/Bajaj capital Logo.webp";
import berger from "../../assets/recruiters-logo-marquee/berger logo.webp";
import capgemini from "../../assets/recruiters-logo-marquee/capgemii logo.webp";
import cvent from "../../assets/recruiters-logo-marquee/cvent logo.webp";
import decathlon from "../../assets/recruiters-logo-marquee/decathlon logo.webp";
import federal from "../../assets/recruiters-logo-marquee/Federal logo.webp";
import genpact from "../../assets/recruiters-logo-marquee/genpact logo.webp";
import giani from "../../assets/recruiters-logo-marquee/Giani logo.webp";
import grandThorton from "../../assets/recruiters-logo-marquee/grand thorton logo.webp";
import gujrat from "../../assets/recruiters-logo-marquee/gujrat logo.webp";
import idbi from "../../assets/recruiters-logo-marquee/IDBI logo.webp";
import jkTyre from "../../assets/recruiters-logo-marquee/jk tyre logo.webp";
import jill from "../../assets/recruiters-logo-marquee/jlllogo.webp";
import lenskart from "../../assets/recruiters-logo-marquee/lenskart logo.webp";
import logo from "../../assets/recruiters-logo-marquee/LOGO.webp";
import mcRice from "../../assets/recruiters-logo-marquee/mc rice logo.webp";
import policy from "../../assets/recruiters-logo-marquee/policy logo.webp";
import rspl from "../../assets/recruiters-logo-marquee/rspl logo.webp";
import simplotel from "../../assets/recruiters-logo-marquee/Simplotel logo.webp";
import stGobain from "../../assets/recruiters-logo-marquee/st gobain logo.webp";
import tataPower from "../../assets/recruiters-logo-marquee/tata power logo.webp";
import thomas from "../../assets/recruiters-logo-marquee/thomas logo.webp";
import tourismFinance from "../../assets/recruiters-logo-marquee/tourism finance logo.webp";
import trident from "../../assets/recruiters-logo-marquee/trident logo.webp";
import vardhman from "../../assets/recruiters-logo-marquee/vardhman logo.webp";
import vivo from "../../assets/recruiters-logo-marquee/vivo logo.webp";
import volvo from "../../assets/recruiters-logo-marquee/volvo logo.webp";
import wipro from "../../assets/recruiters-logo-marquee/wipro logo.webp";

const icons = [
  // { src: amazon, alt: "Amazon" },
  // { src: cafe, alt: "Cafe" },
  // { src: citibank, alt: "Citibank" },
  // { src: emami, alt: "Emami" },
  // { src: ese, alt: "Ese" },
  // { src: euromonitor, alt: "Euromonitor" },
  // { src: ey, alt: "EY" },
  // { src: haldiram, alt: "Haldiram" },
  // { src: itc, alt: "ITC" },
  // { src: khimji, alt: "Khimji" },
  // { src: kotak, alt: "Kotak" },
  // { src: kreative, alt: "Kreative" },
  // { src: tcs, alt: "TCS" },
  // { src: zentrades, alt: "Zentrades" },
  { src: acuteRating, alt: "Acute Rating" },
  { src: airtel, alt: "Airtel" },
  { src: anandRathi, alt: "Anand Rathi" },
  { src: axis, alt: "Axis" },
  { src: bajajCapital, alt: "Bajaj Capital" },
  { src: berger, alt: "Berger" },
  { src: capgemini, alt: "Capgemini" },
  { src: cvent, alt: "Cvent" },
  { src: decathlon, alt: "Decathlon" },
  { src: federal, alt: "Federal" },
  { src: genpact, alt: "Genpact" },
  { src: giani, alt: "Giani" },
  { src: grandThorton, alt: "Grand Thorton" },
  { src: gujrat, alt: "Gujrat" },
  { src: idbi, alt: "IDBI" },
  { src: jkTyre, alt: "JK Tyre" },
  { src: jill, alt: "Jill" },
  { src: lenskart, alt: "Lenskart" },
  { src: logo, alt: "Logo" },
  { src: mcRice, alt: "MC Rice" },
  { src: policy, alt: "Policy" },
  { src: rspl, alt: "RSPL" },
  { src: simplotel, alt: "Simplotel" },
  { src: stGobain, alt: "St Gobain" },
  { src: tataPower, alt: "Tata Power" },
  { src: thomas, alt: "Thomas" },
  { src: tourismFinance, alt: "Tourism Finance" },
  { src: trident, alt: "Trident" },
  { src: vardhman, alt: "Vardhman" },
  { src: vivo, alt: "Vivo" },
  { src: volvo, alt: "Volvo" },
  { src: wipro, alt: "Wipro" },
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
            titleClassName="text-primary-color text-left  text-center text-primary-color"
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
