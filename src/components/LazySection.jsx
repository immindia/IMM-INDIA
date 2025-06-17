import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LazySection = ({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = "100px",
  triggerOnce = true,
  className = "",
  ...props
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && !hasLoaded) {
      setShouldLoad(true);
      setHasLoaded(true);
    }
  }, [inView, hasLoaded]);

  return (
    <div ref={ref} className={className} {...props}>
      {shouldLoad ? children : fallback}
    </div>
  );
};

export default LazySection;
