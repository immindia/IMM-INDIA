import {
  Award,
  Globe,
  Briefcase,
  Cpu,
  Lightbulb,
  FileText,
  Users,
  Search,
  Warehouse,
  Building,
  BookOpen,
  TrendingUp,
  Clock,
  Network,
} from "lucide-react"

import logo from "@/assets/about/accreditations/logos-2.png";
import curriculum from "@/assets/programsoffered.webp"

import mcips from "@/assets/bba/mcips.png"
import industryImmersion from "@/assets/bba/industry-integration.png"
import innovativeTeaching from "@/assets/bba/innovative-teaching.jpg"
import bbaFaculty from "@/assets/bba/faculty.jpg"
// Specializations data
export const specializations = [
  {
    title: "Marketing & Innovation Management",
    icon: <Lightbulb className="h-12 w-12 text-blue-900" />,
    description: "Learn to create and market innovative products and services.",
    imageUrl: "/marketing-innovation-meeting.png",
  },
  {
    title: "International Business Management",
    icon: <Globe className="h-12 w-12 text-blue-900" />,
    description: "Prepare for careers in global business environments.",
    imageUrl: "/global-business-meeting.png",
  },
  {
    title: "Financial Management",
    icon: <Briefcase className="h-12 w-12 text-blue-900" />,
    description: "Master financial analysis, planning, and investment strategies.",
    imageUrl: "/financial-analysis-charts.png",
  },
  {
    title: "Human Resource Management",
    icon: <Users className="h-12 w-12 text-blue-900" />,
    description: "Develop skills in talent acquisition, development, and management.",
    imageUrl: "https://img.freepik.com/premium-photo/business-technology-concept-assessment-evaluation-measurement-analytics_27634-1471.jpg?w=1000",
  },
  {
    title: "Business Analytics & Research",
    icon: <Search className="h-12 w-12 text-blue-900" />,
    description: "Learn to analyze data and derive actionable business insights.",
    imageUrl: "https://img.freepik.com/free-photo/employee-working-marketing-setting_23-2151871188.jpg",
  },
  {
    title: "Operations & Supply Chain Management",
    icon: <Warehouse className="h-12 w-12 text-blue-900" />,
    description: "Optimize supply chain operations and logistics for efficient business operations.",
    imageUrl: "/supply-chain-warehouse.png",
  },
]

// Key features data with images for bento grid
export const features = [
  {
    title: "MULTIDISCIPLINARY CURRICULUM",
    description: "Aligned with NEP2020 for a comprehensive education",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    imageUrl: "https://img.freepik.com/free-photo/notebook-yellow-background-top-view_23-2149382394.jpg",
    size: "large",
  },
  {
    title: "GLOBAL PERSPECTIVE",
    description: "Preparing you for international business environments.",
    icon: <Globe className="h-10 w-10 text-white" />,
    imageUrl: "https://img.freepik.com/free-photo/people-celebrating-world-population-day_23-2151493248.jpg",
    size: "medium",
  },
  {
    title: "INDUSTRY INTEGRATION",
    description: "Experience through internships, live projects, and interactions with industry leaders.",
    icon: <Building className="h-10 w-10 text-white" />,
    imageUrl: industryImmersion,
  },
  {
    title: "EMERGING TECHNOLOGIES",
    description: "Learn to use AI, ML, and other technologies to innovate and solve business problems.",
    icon: <Cpu className="h-10 w-10 text-white" />,
    imageUrl: "https://img.freepik.com/premium-photo/silhouette-woman-stands-symbolizing-integration-human-artificial-intelligence_668889-735.jpg",
  },
  
  {
    title: "CORPORATE IMMERSION PROGRAM",
    description: "Gain practical, hands-on experience through our unique corporate immersion programme.",
    icon: <FileText className="h-10 w-10 text-white" />,
    imageUrl: mcips,
    
  },
  {
    title: "INNOVATIVE TEACHING",
    description: "A mix of traditional methods, digital tools, and case studies.",
    icon: <Lightbulb className="h-10 w-10 text-white" />,
    imageUrl: innovativeTeaching,
    size: "",
  },
  
]

// Stats data with icons
export const stats = [
  { value: "56+", label: "Years of Excellence", icon: Clock },
  { value: "20000+", label: "Alumni Network", icon: Network },
  { value: "100%", label: "Placement Assistance", icon: TrendingUp },
  { value: "520+", label: "Industry Partners", icon: Building },
]

// Program highlights with images
export const programHighlights = [
  {
    title: "AICTE Approved",
    icon: <Award className="h-8 w-8 text-white" />,
    description: "One of the first BBA programs to receive AICTE approval, ensuring high-quality education standards.",
    imageUrl: logo,
  },
  {
    title: "AI & ML Integration",
    icon: <Cpu className="h-8 w-8 text-white" />,
    description:
      "Learn how to leverage artificial intelligence and machine learning to solve complex business problems.",
    imageUrl: "https://img.freepik.com/premium-photo/futuristic-robot-artificial-intelligence-concept_31965-4087.jpg?w=1000",
  },
  {
    title: "Industry Immersion",
    icon: <Building className="h-8 w-8 text-white" />,
    description: "Gain hands-on experience through our unique Multidisciplinary Corporate Immersion Programme.",
    imageUrl: "/corporate-internship.png",
  },
]

// FAQ items
export const faqItems = [
  {
    question: "Pioneering AICTE-Approved BBA",
    answer:
      "We're proud to be among the first to receive AICTE approval for our BBA program, highlighting our commitment to high standards and relevant education. Our curriculum incorporates the latest trends and technologies to keep you ahead in the business game.",
  },
  {
    question: "A Proud Legacy",
    answer:
      "For over five decades, IMM Business School has been a cornerstone of business education in India. Our graduates are successful leaders across various industries, and our global alumni network is a testament to the impact of an IMM education.",
  },
  {
    question: "Embracing NEP2020",
    answer:
      "Our BBA program is designed with the National Education Policy 2020 (NEP2020) in mind, focusing on holistic and multidisciplinary education. We aim to nurture your critical thinking, creativity, and ethical leadership, ensuring you're ready to thrive in today's business world.",
  },
  {
    question: "Integrating AI, ML, and Emerging Technologies",
    answer:
      "What sets our BBA program apart is the integration of Artificial Intelligence (AI), Machine Learning (ML), and other emerging technologies into our courses. These advancements will equip you with the skills to analyse data, drive innovation, and adopt a futuristic approach in your career. You will learn to harness these technologies to solve complex business problems and stay ahead in a rapidly evolving business landscape.",
  },
  {
    question: "Multidisciplinary Corporate Immersion Programme for Problem Solving (MCIPPS)",
    answer:
      'A key differentiator of our BBA program is our unique Multidisciplinary Corporate Immersion Programme for Problem Solving (MCIPPS). This unique, hands-on experiential learning initiative runs concurrently with your studies, offering real-world corporate exposure. Through MCIPPS, you\'ll engage in practical problem-solving within diverse business environments, ensuring that you "hit the ground running" when you enter the business and/or your chosen corporate domain.',
  },
  {
    question: "From Class 12 to Business Leader",
    answer:
      "Our BBA program is tailored for students right after Class 12, providing a smooth transition into higher education. We cover essential areas like management, finance, marketing, operations, business analytics and entrepreneurship, with a clear focus on personalised mentorship and holistic growth.",
  },
]

// Program carousel data
export const programCarouselItems = [
  {
    title: "Comprehensive Curriculum",
    description:
      "Our BBA program offers a well-rounded curriculum that covers all essential aspects of business administration while incorporating modern technological advancements.",
    imageUrl: curriculum,
    points: [
      "Foundation courses in management principles, economics, and accounting",
      "Technology Driven Pedagogy in Management Subjects, Empowered by Al & ML Bootcamp",
      "Specialized courses in your chosen area of concentration",
      "Technology-focused modules including AI & ML",
      "Soft skills development through communication and leadership workshops",
    ],
  },
  {
    title: "Expert Faculty",
    description:
      "Learn from industry experts and experienced academicians who bring real-world knowledge to the classroom.",
    imageUrl: bbaFaculty,
    points: [
      "Professors with extensive industry experience",
      "Visiting faculty from top corporations",
      "Research-oriented academicians with publications in reputed journals",
      "Mentors who provide personalized guidance for career development",
      "Industry professionals who conduct specialized workshops",
    ],
  },
  {
    title: "State-of-the-Art Facilities",
    description:
      "Our campus is equipped with modern facilities to enhance your learning experience and prepare you for the corporate world.",
    imageUrl: "https://stealthlearn.in/imm-admin/api/uploads/680733147548c.webp",
    points: [
      "Smart classrooms with advanced audio-visual equipment",
      "Well-stocked library with digital resources and databases",
      "Computer labs with industry-standard software",
      "Innovation hub for entrepreneurial projects",
      "Recreation areas for holistic development",
    ],
  },
]

// Curriculum items
export const curriculumItems = [
  "Foundation courses in management principles, economics, and accounting",
  "Technology Driven Pedagogy in Management Subjects, Empowered by Al & ML Bootcamp",
  "Specialized courses in your chosen area of concentration",
  "Technology-focused modules including AI & ML",
  "Soft skills development through communication and leadership workshops",
  "Industry projects and internships for practical experience",
]

// Faculty items
export const facultyItems = [
  "Professors with extensive industry experience",
  "Visiting faculty from top corporations",
  "Research-oriented academicians with publications in reputed journals",
  "Mentors who provide personalized guidance for career development",
  "Industry professionals who conduct specialized workshops",
]

// Facilities items
export const facilitiesItems = [
  "Smart classrooms with advanced audio-visual equipment",
  "Well-stocked library with digital resources and databases",
  "Computer labs with industry-standard software",
  "Innovation hub for entrepreneurial projects",
  "Recreation areas for holistic development",
]

// Semester fees
export const semesterFees = [
  {
    name: "I",
    year1: "₹1,00,000",
    year2: "₹1,10,000",
    year3: "₹1,10,000",
  },
  {
    name: "II",
    year1: "₹70,000",
    year2: "₹80,000",
    year3: "₹80,000",
  },
]
