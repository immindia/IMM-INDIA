import Heading from "../../components/Heading";
import Container from "../../components/wrappers/Container";
import IconMarquee from "./IconMarquee";
import { useRecruitersData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

// Loading skeleton component
const RecruitersSkeleton = () => (
  <div className="relative">
    <Container>
      <div>
        <div className="text-center mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
        <div className="flex space-x-4 justify-center overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-24 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </Container>
  </div>
);

const RecruitersContent = () => {
  const {
    data: icons = [],
    isLoading,
    error,
  } = useRecruitersData("Home Page Recruiter");

  if (isLoading) {
    return <RecruitersSkeleton />;
  }

  if (error) {
    return (
      <div className="relative">
        <Container>
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load recruiters data</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative">
      <Container>
        <div>
          <Heading
            title="Our Prominent Recruiters"
            titleClassName="text-primary-color text-left text-center text-primary-color"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full text-center"
            subtitle="Top companies across various industries now choose IMM as a preferred destination for on-campus recruitment."
            className="lg:pb-10"
          />

          <IconMarquee icons={icons} />
        </div>
      </Container>
    </div>
  );
};

const Recruiters = () => {
  return (
    <LazySection fallback={<RecruitersSkeleton />} rootMargin="100px">
      <RecruitersContent />
    </LazySection>
  );
};

export default Recruiters;
