import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import icon2 from "../../assets/about/accreditations/logos-2.png";
import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import Awards from "./Awards";
import { Suspense } from "react";
import { useFetch } from "../../hooks/useFetch";

const AffiliationAwards = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("About Us - accreditations-awards");
    setDescription(
      "Discover the prestigious accreditations and awards that establish IMM as a leading business school in India. Learn why the Institute of Management Science, founded in 1969, is recognized for academic excellence and industry relevance."
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
        (item) => item.category === "Accreditations & Awards Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Accreditations & Awards"
      )?.url;

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
    { href: "/about/accreditations-awards", label: "About" },
    { label: "Awards & Accreditations" },
  ];

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        // title="Accreditations & Awards"
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        loading="eager"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid">
        {/* <Heading
          title="Accreditations & Awards"
          titleClassName="text-primary-color  lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Meet the visionaries guiding our institution towards excellence in education and empowerment."
          className="pt-12 mx-auto"
        /> */}
        <AffiliationAwardsContent />
      </Container>
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading awards...
          </div>
        }
      >
        <Awards />
      </Suspense>
      <div className="bg-slate-50"></div>
    </div>
  );
};

export default AffiliationAwards;

const AffiliationAwardsContent = () => {
  return (
    <section className=" pt-8 sm:pt-12">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-6 sm:gap-12 sm:px-4 md:px-0 flex flex-col sm:flex-row">
          <div className="flex-1 order-2 sm:order-1 flex justify-center items-center  gap-5 sm:gap-12">
            <div className="">
              <img
                src={icon2}
                className="w-full sm:p-8 sm:rounded-lg object-contain drop-shadow-2xl hover:scale-110 transition-all duration-300"
                alt=""
              />
            </div>
          </div>
          <div className="max-w-xl order-1 sm:order-2 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-primary-color text-2xl font-semibold">
              Awards & Accreditations
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              IMM has established itself as one of the Top Business Schools in
              India.
            </p>
            <p className="mt-3 text-gray-600 text-justify">
              Our quality of education acts as a key differentiator of the
              Institute&apos;s standard of excellence. The accreditations ensure
              a rigorous quality control and benchmarking against global
              standards in terms of governance, programs, faculty, research, and
              ethics. IMM&apos;s PGDM is focused on three inter-related areas:
              academic merit, personal values, and social concerns. The
              two-year, full-time, Post Graduate Diploma in Management (PGDM) is
              approved by the All India Institute of Technical Education
              (AICTE).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
