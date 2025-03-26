/* eslint-disable react/prop-types */

// import img from "next/img"
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function NationalPartners({ partners }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef}>
      <motion.div
        ref={titleRef}
        className="mb-8"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: isTitleInView ? 1 : 0, x: isTitleInView ? 0 : -40 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          National Partners
        </h2>
        <div className="w-20 h-1 mt-2 bg-white/80"></div>
      </motion.div>

      <div
        ref={cardsRef}
        className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-6"
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: areCardsInView ? 1 : 0,
              y: areCardsInView ? 0 : 50,
              scale: areCardsInView ? 1 : 0.9,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5 + index * 0.5,
              ease: "easeOut",
            }}
            whileHover={{ y: 0, scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full overflow-hidden transition-all duration-300 group hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30 rounded-sm">
              <CardContent className="p-0">
                <div className="relative flex items-center justify-center w-full p-0 overflow-hidden bg-whit aspect-square dark:bg-slate-700">
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, rotateY: 20 }}
                    animate={{
                      opacity: areCardsInView ? 1 : 0,
                      rotateY: areCardsInView ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="object-cover w-full h-ful mx-auto "
                    />
                  </motion.div>
                </div>
                <motion.div
                  className="flex flex-col p-4 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: areCardsInView ? 1 : 0,
                    y: areCardsInView ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <h3 className="mb-2 font-semibold line-clamp-1 hover:line-clamp-none">
                    {partner.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="mb-2 w-fit bg-primary/10 text-primary dark:bg-primary/20 text-"
                  >
                    {partner.category}
                  </Badge>
                  <Link to={partner.website}>
                    <span className="w-full mt-auto text-sm group text-primary-color">
                      Read More{" "}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
