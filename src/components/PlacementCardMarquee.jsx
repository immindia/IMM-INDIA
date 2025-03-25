
import Marquee from "@/components/ui/marquee";





export default function PlacementCardMarquee({children}) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s] py-6 sm:py-12">
       
        {children}
      </Marquee>
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-[#F3F3F3]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[5%] bg-gradient-to-l from-[#F9F9F9]"></div>
    </div>
  );
}
