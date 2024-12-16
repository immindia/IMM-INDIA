import img from "../../assets/hero.jpg";
export default function Hero() {
    return (
      <div className="relative sm:h-[90vh] h-[50vh] w-full">
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
            <h1 className="mb-4 text-4xl lg:text-7xl font-bold leading-tight text-white md:text-6xl">
              Nurturing Next Gen
              <br />
              Global Business Leaders
            </h1>
            
            <p className="mb-6 text-xl lg:text-3xl text-white/90 md:text-2xl">
              Infused with Artificial Intelligence and Machine Learning
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#C4184B] px-4 py-2 text-sm lg:text-base font-semibold text-white">
                AICTE Approved
              </span>
              <span className="rounded-full bg-[#C4184B] px-4 py-2 text-sm lg:text-base font-semibold text-white">
                Dual Specialisations
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  