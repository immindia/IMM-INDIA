"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InternationalPartner from "./InternationalPartner";
import NationalPartners from "./NationalPartners";

export default function OurPartners() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading and trigger animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // International partner data
  const internationalPartner = {
    id: 1,
    name: "Global Innovations Alliance",
    logo: "/placeholder.svg?height=200&width=400",
    description:
      "Our premier international partner helping us expand our global reach and impact.",
    website: "https://example.com",
  };

  // National partners data with extended information
  const nationalPartners = [
    {
      id: 1,
      name: "Tech Solutions",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Technology",
      fullDescription:
        "Tech Solutions is a leading technology provider specializing in cloud infrastructure and AI solutions. Our partnership has enabled us to implement cutting-edge technologies across our product line.",
      established: "January 2018",
      location: "San Francisco, CA",
      contactEmail: "partnerships@techsolutions.example",
      contactPhone: "+1 (555) 123-4567",
      website: "https://example.com/tech",
      projects: [
        {
          name: "Cloud Migration",
          description:
            "Complete migration of legacy systems to cloud infrastructure",
        },
        {
          name: "AI Integration",
          description:
            "Implementation of machine learning algorithms for predictive analytics",
        },
      ],
    },
    {
      id: 2,
      name: "Finance Group",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Finance",
      fullDescription:
        "Finance Group provides financial services and consulting for our operations. They have been instrumental in optimizing our financial processes and securing funding for expansion.",
      established: "March 2019",
      location: "New York, NY",
      contactEmail: "info@financegroup.example",
      contactPhone: "+1 (555) 987-6543",
      website: "https://example.com/finance",
      projects: [
        {
          name: "Funding Round",
          description: "Secured Series B funding of $25M",
        },
        {
          name: "Financial Process Optimization",
          description: "Reduced processing costs by 35%",
        },
      ],
    },
    {
      id: 3,
      name: "Healthcare Systems",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Healthcare",
      fullDescription:
        "Healthcare Systems specializes in medical technology and healthcare solutions. Our partnership has allowed us to expand into the healthcare sector with specialized products.",
      established: "June 2020",
      location: "Boston, MA",
      contactEmail: "partners@healthcaresystems.example",
      contactPhone: "+1 (555) 456-7890",
      website: "https://example.com/healthcare",
      projects: [
        {
          name: "Patient Management System",
          description:
            "Developed integrated system for patient data management",
        },
        {
          name: "Telehealth Platform",
          description: "Launched remote healthcare consultation platform",
        },
      ],
    },
    {
      id: 4,
      name: "Education Partners",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Education",
      fullDescription:
        "Education Partners focuses on educational technology and learning solutions. Together, we've developed innovative learning platforms for schools and universities.",
      established: "September 2019",
      location: "Chicago, IL",
      contactEmail: "hello@educationpartners.example",
      contactPhone: "+1 (555) 234-5678",
      website: "https://example.com/education",
      projects: [
        {
          name: "Digital Classroom",
          description: "Virtual learning environment for K-12 schools",
        },
        {
          name: "Learning Analytics",
          description: "Data-driven insights for educational institutions",
        },
      ],
    },
    {
      id: 5,
      name: "Retail Alliance",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Retail",
      fullDescription:
        "Retail Alliance is a consortium of retail businesses that collaborate on technology and supply chain solutions. Our partnership has strengthened our retail presence nationwide.",
      established: "February 2021",
      location: "Seattle, WA",
      contactEmail: "alliance@retailalliance.example",
      contactPhone: "+1 (555) 876-5432",
      website: "https://example.com/retail",
      projects: [
        {
          name: "Inventory Management",
          description: "Real-time inventory tracking and optimization",
        },
        {
          name: "Customer Experience",
          description: "Omnichannel customer engagement platform",
        },
      ],
    },
    {
      id: 6,
      name: "Manufacturing Co",
      logo: "/placeholder.svg?height=120&width=200",
      category: "Manufacturing",
      fullDescription:
        "Manufacturing Co specializes in advanced manufacturing processes and materials. Our collaboration has improved our product quality and manufacturing efficiency.",
      established: "April 2018",
      location: "Detroit, MI",
      contactEmail: "info@manufacturingco.example",
      contactPhone: "+1 (555) 345-6789",
      website: "https://example.com/manufacturing",
      projects: [
        {
          name: "Process Automation",
          description: "Automated production line reducing costs by 28%",
        },
        {
          name: "Sustainable Materials",
          description: "Implementation of eco-friendly materials in production",
        },
      ],
    },
  ];

  return (
    <section className=" bg-gradient-to-t from-primary-color via-pink-700 to-primary-color lg:py-20 md:py-12 py-8 sm:px-0 px-6">
      <div className="container mx-auto md:max-w-6xl lg:max-w-7xl">
        <motion.div
          className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-white to-slate-100 bg-clip-text md:text-5xl">
          Our Partners
        </h1>
        <p className="max-w-2xl mx-auto text-white/80">
          We collaborate with leading organizations to deliver exceptional
          solutions and services.
        </p>
      </motion.div>

      <div className="space-y-20">
        <InternationalPartner
          partner={internationalPartner}
          isLoaded={isLoaded}
        />
        <NationalPartners partners={nationalPartners} isLoaded={isLoaded} />
        </div>
      </div>
    </section>
  );
}
