import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const IconItem = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="aspect-square w-32 rounded mx-4 object-contain hover:-translate-y-2  duration-300 ease-in-out "
    />
  );
};

export function IconMarquee({ icons }) {
  const firstRow = icons.slice(0, Math.ceil(icons.length / 3));
  const secondRow = icons.slice(Math.ceil(icons.length / 3), Math.ceil((icons.length * 2) / 3));
  const thirdRow = icons.slice(Math.ceil((icons.length * 2) / 3), icons.length);

  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden gap-8">
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {firstRow.map((icon, index) => (
          <IconItem key={index} {...icon} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]">
        {secondRow.map((icon, index) => (
          <IconItem key={index} {...icon} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {thirdRow.map((icon, index) => (
          <IconItem key={index} {...icon} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

export default IconMarquee;