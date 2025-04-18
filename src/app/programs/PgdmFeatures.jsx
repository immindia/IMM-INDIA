import React, { useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import Heading from "../../components/Heading";

const features = [
  {
    id: 1,
    img: "https://img.freepik.com/free-photo/analytics-comparison-information-networking-concept_53876-15846.jpg",
    title: "Marketing & Innovation Management",
    description:
      "Marketing Management is a critical factor that has a direct impact on any organization's organic growth and sustainability. The Marketing courses in IMM's PGDM programme teach students how to develop and implement effective marketing strategies so as to overcome business challenges. The primary goal of incorporating Marketing into the programme is to develop effective managers and leaders capable of applying functional knowledge, to address business challenges in a socially and ethically responsible manner. The goal of the programme is to sharpen knowledge of the marketing function while also gaining a broad understanding of other related disciplines.",
  },
  {
    id: 2,
    img: "https://img.freepik.com/premium-photo/finance-money-transaction-technology-conceptual_31965-18248.jpg",
    title: "Financial Management",
    description:
      "The PGDM Program @IMM with specialization in Finance is an excellent opportunity for students seeking leadership positions in the field of Finance. The curriculum is befitting to contemporary times which prepares students with in-depth courses that advance the understanding of issues particularly in the field of core Finance, including: Investments, Portfolio Management, Derivative Securities, Capital Markets, Corporate Finance, Bancassurance, Corporate Restructuring, Global Financial Ecosystem, Investment & Personal Finance, International Finance, and Financial Institutions.",
  },
  {
    id: 3,
    img: "https://img.freepik.com/free-photo/human-resource-hiring-recruiter-select-career-concept_53876-21141.jpg",
    title: "Human Resource Management",
    description:
      "Human Resource Management specialization provides the academic foundation for careers concerned with the effective utilization of the human resources of organizations and economic system as a whole. It focuses on Workforce Staffing, Training, Maintenance strategies & practices, training and instruction in Employee Recruitment, Development Processes, Management Theories, Organizational Communication, Labour Law and Relations, and other concepts that prepare students to manage an organization's human assets.",
  },
  {
    id: 4,
    img: "https://img.freepik.com/free-photo/business-deal-top-view_23-2147626517.jpg",
    title: "Operations Management",
    description:
      "Operations and IT are increasingly digitally aligned. Different company functions are now increasingly integrated, data-driven, and insight-driven. This fundamental shift in the sector has prompted a modernization of Operations Management knowledge and abilities, with an integration of Analytical methodologies, present day operations and its applications. The course develops a thorough understanding of Supply Chain Management, including Network Strategy, Long-term Planning, and Forecasting Quality Management principles.",
  },
  {
    id: 5,
    img: "https://img.freepik.com/free-photo/analytics-comparison-information-networking-concept_53876-15846.jpg",
    title: "Business Analytics & Research",
    description:
      "Business Analytics takes a data-driven approach to the World of Business making use of Statistics & Data Modeling to help develop new Business Insights. This blend of technology & business will make Business Analytics an ideal Specialization for students with an interest in working with Big Data and Programming. Students will be trained in Data Analysis and Business Intelligence Tools to equip them for predictive modeling and more. Subjects Included: Python for Data Science, Data Visualization using power BI and Tableau, Big Data and SQL.",
  },
  {
    id: 6,
    img: "https://img.freepik.com/free-photo/business-person-futuristic-business-environment_23-2150970186.jpg",
    title: "International Business Management",
    description:
      "Due to globalization it is critical to have a working knowledge of International Business Operations. This covers operations in overseas organisations and the mode of conducting business on a global scale. International Business deals with multi-national organisations, their governance, strategies, and management; their relationship with governments, and the importance of globalisation and localisation of economic activities. The students learn about cross-border trade of goods, services, technology, capital & knowledge transfers.",
  },
  {
    id: 7,
    img: "https://img.freepik.com/premium-vector/word-cloud-background-concept-startup-company-entrepreneurship-idea-project-innovation-opportunity-corporate-plan-vector-illustration_616200-4004.jpg",
    title: "Entrepreneurship Management",
    description:
      "The Entrepreneurship Management specialization equips students with the skills and knowledge needed to launch and manage successful business ventures. The program focuses on developing entrepreneurial mindset, business planning, startup management, and innovation strategies. Students learn about opportunity identification, business model development, funding strategies, risk management, and growth hacking. The curriculum covers essential aspects of entrepreneurship including market research, financial planning, legal considerations, and digital marketing for startups. This specialization prepares students to become successful entrepreneurs or intrapreneurs within established organizations.",
  },
  
];

const FeatureItem = ({ feature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grid grid-cols-12 mx-0 mb-6 md:mb-0">
      <div
        className={cn("col-span-12 md:col-span-6 relative z-20 p-0", {
          "md:order-2": index % 2,
        })}
      >
        <img
          src={feature.img}
          alt={feature.title}
          className="sm:h-full h-[220px]  aspect-video w-full object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-6 relative z-20 p-0">
        <div
          className={cn(
            "bg-slate-100 dark:bg-slate-800 h-full flex flex-col justify-center p-6 lg:p-12"
          )}
        >
          <div className="mb-6">
            <span className="block text-xl sm:text-3xl font-semibold leading-none">
              {feature.title}
            </span>
          </div>
          <p className={cn(
            "mb-6 lg:mb-12 transition-all duration-300",
            !isExpanded && "line-clamp-2 sm:line-clamp-3"
          )}>
            {feature.description}
          </p>
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-bold text-sm uppercase bg-transparent border-0 hover:text-slate-500 flex items-center"
            >
              {isExpanded ? (
                <>
                  See less <ArrowUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureItem.propTypes = {
  feature: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const PgdmFeatures = () => {
  return (
    <section className="pt-14 md:pt-20 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container  mx-auto">
        <div className="flex max-w-3xl justify-center text-center mb-6 md:mb-12 mx-auto">
        <Heading
          title="Course Specialization"
          titleClassName="lg:font-extrabold font-bold lg:text-5xl text-gray-700"
          subtitle="Discover the unique features that make our PGDM program stand out in management education"
          subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal  text-center mx-auto"
            className="w-full text-center sm:col-span-4 lg:pb-0 pb-0"
          />
        </div>

        {features.map((feature, i) => (
          <FeatureItem feature={feature} index={i + 1} key={i} />
        ))}
      </div>
    </section>
  );
};

export default PgdmFeatures;
