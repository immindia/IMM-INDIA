import img from "../../assets/aboutimm.png";
import WordPullUp from "../../components/ui/word-pull-up";
import Container from "../../components/wrappers/Container";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutIMM() {
  // Image animation trigger
  const { ref: imgRef, inView: imgInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Paragraph animation trigger
  const { ref: pRef, inView: pInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Container className="container mx-auto  pt-10">
      <div className="flex flex-col-reverse lg:flex-row gap-10 md:gap-28">
        {/* Image Animation Wrapper */}
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: -100 }} // Animation starts with the image offscreen to the left
          animate={imgInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="w-full lg:w-1/2 mb-6 md:mb-0"
          style={{ minHeight: "300px" }} // Minimum height for better small-screen display
        >
          <img
            src={img || ""}
            alt="Indo Global Campus"
            className="w-full h-auto object-cover rounded-lg md:p-28 lg:p-0"
            style={{ display: "block" }} // Ensure the image fills the container properly
          />
        </motion.div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 md:pl space-y-6 relative">
          {/* Title Animations */}
          <WordPullUp
            className="w-fit sm:mx-0  text-gray-500 font-normal text-sm sm:text-2xl "
            words="About IMM India"
          />
          <WordPullUp
            className="text-left sm:text-left text-4xl font-bold sm:font-bold md:font-extrabold text-pink-950 mt-8 mb-4 underline "
            words="Top B-School in Delhi NCR"
          />
          <div className="w-10/12 h-[2px] bg-pink-800"></div>

          {/* Paragraph Animation Wrapper */}
          <motion.p
            ref={pRef}
            initial={{ opacity: 0, x: 100 }} // Start with the paragraph offscreen to the right
            animate={pInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
            className="text-gray-600 sm:font-normal md:leading-loose tracking-wide text-base text-justify sm:text-left sm:text-lg"
          >
            Year 1969, dream turned into reality and IMM, a premier educational
            society, took birth with a vision to spread the gospel of marketing
            and management education in India. IMM, the brain child of Visionary
            Dr. Jagjit Singh, has over almost five decades successfully created
            global intellectual capital and continues to do so even today.
            <br /> 
            From training practicing managers to corporate leaders, educating
            management career aspirants, readying the marketing professionals to
            put India on the global marketing map and also helping students to
            pursue their educational endeavours overseas, IMM Business School
            has come a long way.
          </motion.p>
        </div>
      </div>
    </Container>
  );
}
