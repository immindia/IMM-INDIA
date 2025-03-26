import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import EU from "../../assets/partners/EU.png";
import IIT from "../../assets/partners/iit.png";
import JIT from "../../assets/partners/jit.png";
import Kladio from "../../assets/partners/kladio.png";
import Vitti from "../../assets/partners/vitti.png";
import Wasme from "../../assets/partners/wasme.png";
import Young from "../../assets/partners/young.png";

import Heading from "../../components/Heading";

import InternationalPartner from "./InternationalPartner";
import NationalPartners from "./NationalPartners";

export default function OurPartners() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });

  // International partner data
  const internationalPartner = {
    id: 0,
    name: "European Global Institute of Innovation & Technology (EU Global)",
    logo: EU,
    description:
      "The European Global Institute of Innovation & Technology, also known as European Global Varsity (EU Global), is a prestigious institution based in Malta, Europe.",
    website: "/about/imm-partners",
    category: "Education",
  };

  // National partners data with extended information
  const nationalPartners = [
    {
      id: 1,
      name: "IIT Ropar",
      logo: IIT,

      category: "Education",
      fullDescription:
        "The Indian Institute of Technology Ropar (IIT Ropar) is a premier engineering institution in Punjab. The Government of India has officially designated IIT Ropar as a Centre of Excellence in AI, recognizing it as one of the top four institutes leading India's AI revolution. This landmark initiative, reported by the Economic Times, cements IIT Ropar's position at the forefront of AI and innovation, and IMM students will be direct beneficiaries of this elite status.",
      website: "/about/imm-partners",
    },
    {
      id: 2,
      name: "KLADIO",
      logo: Kladio,
      category: "Education",
      fullDescription:
        "Kladio is an innovative educational platform that emphasizes experiential and global learning to prepare students for the evolving world. Their programs, such as the Bachelor's in Entrepreneurship and Family Business Management, offer immersive experiences across multiple countries, providing students with diverse business insights and cultural exposure.",
      website: "/about/imm-partners",
    },
    {
      id: 3,
      name: "JJF Education Pvt. Ltd.",
      logo: JIT,
      category: "Education",
      fullDescription:
        "JJF Education Private Limited operates in the education sector with a focus on disseminating knowledge and creating awareness. The company aims to provide a common forum for various education professionals to organize training courses and special programs in both online and offline formats.",
      website: "/about/imm-partners",
    },
    {
      id: 4,
      name: "VITTI Research Foundation",
      logo: Vitti,
      category: "Research",
      fullDescription:
        "Vitti Research Foundation focuses on fundamental AI research and collaborates with academia, global foundations, industries, and government initiatives to publish papers and generate intellectual property.",
      website: "/about/imm-partners",
    },
    {
      id: 5,
      name: "Young Skilled India",
      logo: Young,
      category: "Training",
      fullDescription:
        "Young Skilled India, a Government of India-certified startup (DIPP 1656), is incubated at MCIE - IIT BHU, Varanasi. The organization offers AI-driven training and certificate courses aimed at enhancing professional and management skills across various demographics.",
      website: "/about/imm-partners",
    },
    {
      id: 6,
      name: "WASME",
      logo: Wasme,
      category: "SME Development",
      fullDescription:
        "The World Association for Small and Medium Enterprises (WASME) is a global, non-governmental organization dedicated to promoting the growth and development of small and medium enterprises (SMEs) worldwide. WASME fosters collaboration among governments, industry bodies, and SMEs through policy advocacy, capacity building, and knowledge sharing.",
      website: "/about/imm-partners",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-t from-primary-color via-pink-700 to-primary-color lg:py-20 md:py-12 py-8 sm:px-0 px-6"
    >
      <div className="container mx-auto sm:max-w-5xl md:max-w-6xl lg:max-w-7xl">
        <motion.div
          ref={headingRef}
          className="mb-8 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isHeadingInView ? 1 : 0,
            y: isHeadingInView ? 0 : 50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Heading
            title="Academic Partners"
            titleClassName="text-center text-2xl font-bold text-white md:text-3xl"
            className="block lg:pb-0 sm:pb-0 mx-auto w-full text-left sm:col-span-4 "
            subtitle="Our academic partners are some of the best in the world, and we are proud to have them on board."
            subtitleClassName="text-center text-white/80 text-sm md:text-base"
          />
        </motion.div>

        <div className="space-y-10 sm:space-y-20">
          <InternationalPartner partner={internationalPartner} />
          <NationalPartners partners={nationalPartners} />
        </div>
      </div>
    </section>
  );
}
