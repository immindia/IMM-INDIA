// import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/about/AboutBanner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";
import { useState } from "react";
import { Eye, Target, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import founder from "../../assets/about/leadership/founder.webp";
import building from "../../assets/Building.webp";
const ImmLegacy = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about/imm-legacy", label: "About" },
    { label: "IMM Legacy & Vision" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="IMM Legacy & Vision"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        {/* <Heading
          title="IMM Legacy & Vision"
          titleClassName="text-primary-color text-left lg:text-5xl"
          subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full lg:"
          subtitle=" "
          className="pt-12"
        /> */}
        <Legacy />
      </Container>
      <div className="bg-slate-50">
        <IMMFeatureSection />
      </div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default ImmLegacy;

const Legacy = () => {
  return (
    <section className="light pt-12 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container ">
        <div className="grid lg:grid-cols-3 gap-x-6">
          <div>
            <h2 className="lg:text-end text-3xl md:text-5xl text-primary-color leading-tight md:leading-normal tracking-wide sm:font-light lg:pl-6 mb-0">
              IMM Legacy: Five Decades of Excellence in Management Education
            </h2>
          </div>
          <div className="lg:px-4 my-6 lg:my-0">
            <div
              className="min-h-[350px] md:h-full bg-center bg-cover rounded-md"
              style={{
                backgroundImage: `url(${founder})`,
              }}
            ></div>
          </div>
          <div className="sm:pr-6">
            <p className="text-base tracking-widest opacity-80 mb-0 text-justify ">
              In 1969, a dream transformed into reality as IMM, a premier
              educational society, was established with a vision to spread the
              gospel of marketing and management education in India. IMM, the
              brainchild of Visionary Dr. Jagjit Singh, has successfully created
              global intellectual capital for almost five decades and continues
              to do so today.
            </p>
            <p className="text-base tracking-widest opacity-80 mt-6 mb-0 text-justify">
              From training practicing managers to corporate leaders, educating
              management career aspirants, readying marketing professionals to
              put India on the global marketing map, IMM Business School has
              come a long way.
            </p>
            <p className="text-base tracking-widest opacity-80 mt-6 mb-0 text-justify">
              We take pride in helping students pursue their educational
              endeavors overseas while maintaining our commitment to excellence
              in management education and creating future business leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Eye,
    title: "Vision",
    desc: "To serve as a Centre for Excellence in Management Education, Research & Training. By taking the Glorious & Golden Legacy of 55 years forward with Young Leaders and Nation Builders & blending modern management thoughts and eternal values.",
  },
  {
    icon: Target,
    title: "Mission",
    desc: "Our Mission is to impart Value-based Management Education to be achieved through an Interdisciplinary approach, by integrating teaching with research, training, seminars, conferences, publications and to put India on the Marketing and Management Map of the World.",
  },
  {
    icon: Award,
    title: "Programme Educational Objectives",
    desc: [
      "To facilitate students develop critical-thinking, problem solving skills & analytical approach for effective managerial decision-making.",
      "To sensitize students to socio-cultural & economic aspects impacting the current and future requirements of business management.",
      "To enable students to adapt to changing global business environment.",
      "To develop students as professional managers, entrepreneurs & ethical business leaders by blending modern management thoughts with eternal values.",
    ],
  },
];

const FeatureItem = ({ feature, isHovered, onHover }) => {
  return (
    <Card
      className={`
        flex bg-white dark:bg-slate-800  p-6 xl:p-12 mb-4 lg:mb-6
        transform transition-all duration-300 ease-out
        hover:shadow-2xl hover:-translate-y-1
        ${isHovered ? "border-primary" : "border-border"}
      `}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`
        transition-all hidden sm:block duration-300
        text-primary rounded-full mr-6 xl:mr-12
        transform ${isHovered ? "scale-110" : "scale-100"}
      `}
      >
        <feature.icon
          size={42}
          className={`transition-all duration-300 ${
            isHovered ? "stroke-[1.5]" : "stroke-1"
          }`}
        />
      </div>
      <div>
        <h4
          className={`
          text-2xl text-primary-color font-medium mb-4
          transition-colors duration-300
          ${isHovered ? "text-primary" : "text-foreground"}
        `}
        >
          {feature.title}
        </h4>
        {Array.isArray(feature.desc) ? (
          <ul className="list-disc pl-5 space-y-2">
            {feature.desc.map((item, index) => (
              <li key={index} className="text-muted-foreground leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground leading-relaxed">
            {feature.desc}
          </p>
        )}
        {/* <div
          className={`
          mt-4 sm:flex hidden items-center text-primary
          transition-all duration-300 ease-out
          opacity-0 transform translate-x-[-10px]
          ${isHovered ? "opacity-100 translate-x-0" : ""}
        `}
        >
          <span className="mr-2">Learn more</span>
          <ArrowRight size={16} />
        </div> */}
      </div>
    </Card>
  );
};

const IMMFeatureSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-14 md:pt-24 container mx-auto text-foreground overflow-visible">
      <div className="container px-4 mx-auto">
        <div className="flex max-w-3xl justify-center text-center mb-12 mx-auto">
          <div className="space-y-6">
            <h2
              className="text-4xl leading-none font-bold md:text-5xl text-primary-color 
              animate-in fade-in slide-in-from-bottom-3 duration-700"
            >
              Vision & Mission
            </h2>
            <p
              className="text-lg text-muted-foreground
              animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
            >
              Discover our commitment to excellence in management education and
              our goals for shaping future leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-12 max-w-7xl mx-auto min-h-[90vh]">
          <div className="col-span-2 lg:col-span-1 lg:sticky lg:top-24" style={{height: 'fit-content'}}>
            <div className="relative h-full z-10">
              <div className="absolute -top-11 -left-11 right-12 bottom-12 h-[400px] sm:h-[600px] bg-gray-900 dark:bg-slate-700 -z-10 rounded-[200px] lg:rounded-full rounded-tl-none lg:rounded-tl-none" />
              <div
                className="bg-center bg-no-repeat bg-cover rounded-2xl min-h-[350px] w-full float-right shadow-xl h-[400px] sm:h-[600px]"
                style={{
                  backgroundImage: `url(${building})`,
                }}
              />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="lg:ml-6 xl:ml-12">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="animate-in fade-in slide-in-from-right duration-700"
                  style={{ animationDelay: `${(i + 1) * 200 + 300}ms` }}
                >
                  <FeatureItem
                    feature={feature}
                    isHovered={hoveredIndex === i}
                    onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
