
import { useState } from 'react';
import { ChevronDown, Calendar, GraduationCap } from 'lucide-react';
import LiveProjects from '../LandingPage/LiveProjects';

const ProjectTab = () => {
  return (
    <section>
      <div className="space-y-4">
        {/* <h1 className="text-3xl font-semibold text-primary-color">
          Project Work
        </h1>
        <p className="text-gray-600 text-base">
        These are designed to make the student learn and apply their class room teachings in the practical world. There are two categories of projects.
        </p> */}
      <AcademicProjects />
      <LiveProjects />
      </div>
    </section>
  );
};

export default ProjectTab;



const AccordionItem = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-2 text-primary-color" />
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary-color transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-5 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

const AcademicProjects = () => {
  return (
    <div className="max-w-full mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-primary-color text-white">
        <h1 className="text-3xl font-bold text-center">Academic Projects</h1>
        <p className="mt-2 text-center italic">
          Designed to apply classroom teachings in the practical world
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <AccordionItem title="Summer Internship Project (SIP)" icon={Calendar}>
          <p className="mb-4">
            The Summer Internship Project provides an opportunity to apply tools, techniques, skills, and concepts learned through field studies, computer-based analysis, and library research.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Conducted at the end of the second semester</li>
            <li>Mandatory academic requirement</li>
            <li>Project reports are graded towards final assessment</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Industry Oriented Project (IOP)" icon={GraduationCap}>
          <p className="mb-4">
            The Industry Oriented Project, conducted in the final semester, provides students an opportunity to learn in a real-world context, integrating learning across different verticals.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Organization-based projects</li>
            <li>Often multifunctional and multidisciplinary in nature</li>
            <li>Students appear for a viva voce at the end</li>
            <li>Marks counted towards the final grade</li>
          </ul>
        </AccordionItem>
      </div>
    </div>
  );
};

