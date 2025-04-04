import img from "../../assets/hero.jpg";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";

export default function Hero() {
  return (
    <div className="relative h-[400px] sm:h-[79vh] w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 ">
        <img
          src={img}
          alt="IMM Students and Faculty"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-4xl">
          <h1 className="mb-4 text-4xl lg:text-7xl font-bold leading-tight md:text-6xl space-y-4">
            <Heading
              className="bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-5xl lg:text-7xl"
              title="Human Centered."
              colors={{
                first: "#DDC99F",
                second: "#C4184B",
              }}
            />

            <Heading
              className="bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-5xl lg:text-7xl"
              title="Future Focused."
              colors={{
                first: "#DDC99F",
                second: "#C4184B",
              }}
            />
          </h1>

          <p className="mb-6 text-xl lg:text-3xl text-white/90 md:text-2xl">
            Infused with Artificial Intelligence and Machine Learning
          </p>

          <div className="flex flex-wrap gap-4 mt-14">
            <Link to="/programs/pgdm" className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2">
              <span >
                <BorderBeam className="absolute inset-0" />
              PGDM Program
              </span>
            </Link>
            <Link to="/programs/bba" className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2">
              <span >
                <BorderBeam className="absolute inset-0" />
                BBA Program
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
