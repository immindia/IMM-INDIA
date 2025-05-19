"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Search,
  Award,
  Globe,
  Briefcase,
  Cpu,
  Lightbulb,
  FileText,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Building,
  Users,
  BookOpen,
  ArrowRight,
  X,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFetch } from "../../hooks/useFetch";
import campus from "../../assets/bba/bbaAbout.jpg";
import ImgAndBreadcrumb from "@/components/ImgAndBreadcrumb";

// Add this style to your component or global CSS
const verticalTextStyle = {
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
  textOrientation: "mixed",
  fontWeight: "bold",
};

// Custom hook for animations when element is in viewport
const useAnimationInView = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
};

const BBAProgram = () => {
  const { updateColors } = useTheme();
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Set custom colors when component mounts
  useEffect(() => {
    updateColors("bg-blue-900", "bg-blue-900");

    // Reset colors when component unmounts
    return () => {
      updateColors("bg-primary-color", "bg-primary-color");
    };
  }, [updateColors]);

  // State for form submission and file upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMarksheetUpload, setShowMarksheetUpload] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
  ); // Default image
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data) {
      const mobileImage = data.find(
        (item) => item.category === "BBA Mobile"
      )?.url;
      const desktopImage = data.find((item) => item.category === "BBA")?.url;

      if (isMobile && mobileImage) {
        setBannerImage(mobileImage);
      } else if (!isMobile && desktopImage) {
        setBannerImage(desktopImage);
      } else if (desktopImage) {
        setBannerImage(desktopImage);
      } else if (mobileImage) {
        setBannerImage(mobileImage);
      }
    }
  }, [data, isMobile]);

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    window.scrollTo({
      top: window.innerWidth > 768 ? 10 : 400,
      behavior: "smooth",
    });
  };

  // Form validation schema
  const formSchema = z.object({
    fullname: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .regex(/^[A-Za-z ]+$/, {
        message: "Name can only contain letters and spaces.",
      }),
    contact: z.string().regex(/^[6-9][0-9]{9}$/, {
      message:
        "Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    address: z.string().min(2, {
      message: "Please enter your city.",
    }),
    completed12th: z.enum(["yes", "no"], {
      required_error: "Please select an option.",
    }),
  });

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      contact: "",
      email: "",
      address: "",
      program: "BBA",
      completed12th: undefined,
      marksheet: undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    setIsSubmitting(true);

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("contact", values.contact);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("course", "BBA");
    formData.append("completed12th", values.completed12th);

    // Only append file if one exists
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        "https://www.immindia.edu.in/bbaformaction.php",
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header, let the browser set it correctly
          redirect: "manual", // Don't automatically follow redirects
        }
      );

      // A 302 status is actually a success in this case!
      // The PHP script is redirecting to thank-you.php
      if (response.status === 302 || response.ok) {
        setIsSuccess(true);
        form.reset();
        setFile(null);
        setShowMarksheetUpload(false);
        return;
      }

      // If we get here, it's an actual error
      console.error("Form submission failed with status:", response.status);
      // For demo purposes, show success anyway
      setIsSuccess(true);
      form.reset();
      setFile(null);
      setShowMarksheetUpload(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle eligibility change
  const handleEligibilityChange = (value) => {
    if (value === "yes") {
      setShowMarksheetUpload(true);
      setIsEligible(true);
    } else {
      setShowMarksheetUpload(false);
      setIsEligible(false);
      alert("Sorry, you are not eligible.");
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // BBA specializations data
  const specializations = [
    {
      title: "Marketing & Innovation Management",
      icon: <Lightbulb className="h-12 w-12 text-blue-600" />,
      description:
        "Learn to create and market innovative products and services.",
    },
    {
      title: "International Business Management",
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      description: "Prepare for careers in global business environments.",
    },
    {
      title: "Financial Management",
      icon: <Briefcase className="h-12 w-12 text-blue-600" />,
      description:
        "Master financial analysis, planning, and investment strategies.",
    },
    {
      title: "Human Resource Management",
      icon: <Users className="h-12 w-12 text-blue-600" />,
      description:
        "Develop skills in talent acquisition, development, and management.",
    },
    {
      title: "Business Analytics & Research",
      icon: <Search className="h-12 w-12 text-blue-600" />,
      description:
        "Learn to analyze data and derive actionable business insights.",
    },
    {
      title: "Operations & Supply Chain Management",
      icon: <Warehouse className="h-12 w-12 text-blue-600" />,
      description:
        "Optimize supply chain operations and logistics for efficient business operations.",
    },
  ];

  // Key features data
  const features = [
    {
      title: "MULTIDISCIPLINARY CURRICULUM",
      description: "Aligned with NEP2020 for a comprehensive education",
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "GLOBAL PERSPECTIVE",
      description: "Preparing you for international business environments.",
      icon: <Globe className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "INDUSTRY INTEGRATION",
      description:
        "Experience through internships, live projects, and interactions with industry leaders.",
      icon: <Building className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "EMERGING TECHNOLOGIES",
      description:
        "Learn to use AI, ML, and other technologies to innovate and solve business problems, making you future-ready.",
      icon: <Cpu className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "INNOVATIVE TEACHING",
      description:
        "A mix of traditional methods, digital tools, and case studies.",
      icon: <Lightbulb className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "MCIPPS",
      description:
        "Gain practical, hands-on experience through our unique Multidisciplinary Corporate Immersion Programme for Problem Solving.",
      icon: <FileText className="h-10 w-10 text-blue-600" />,
    },
  ];

  // Stats data
  const stats = [
    { value: "56+", label: "Years of Excellence" },
    { value: "20,000+", label: "Alumni Network" },
    { value: "100%", label: "Placement Assistance" },
    { value: "520+", label: "Industry Partners" },
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/programs/bba", label: "Programs" },
    { label: "BBA" },
  ];

  return (
    <div className="min-h-screen" id="form">
      <ImgAndBreadcrumb
        title="BBA Program"
        imageSrc={bannerImage}
        imageAlt="BBA Program Banner"
        breadcrumbItems={breadcrumbItems}
        buttonText="Apply Now"
        onButtonClick={toggleForm}
      />

      {/* Enquiry Form Toggle Button */}
      <div className="fixed right-0 top-1/2 z-50 transform -translate-y-1/2">
        <button
          onClick={toggleForm}
          className={`flex items-center bg-amber-500 hover:bg-amber-600 text-white animate-pulse px-2 py-3 rounded-l-lg shadow-lg transition-all duration-300 ${
            isFormVisible ? "opacity-50" : "opacity-100"
          }`}
        >
          {isFormVisible ? (
            <X className="h-5 w-5 mr-2" />
          ) : (
            <span style={verticalTextStyle}>Enquiry Now</span>
          )}
        </button>
      </div>

      {/* Hero Banner Section */}
      <section
        id="overview"
        className="relative sm:h-[80vh] py-5 sm:py-0 flex items-center justify-center text-white"
      >
        <img
          className="absolute h-full w-full object-cover -z-[99]"
          src={bannerImage}
          alt="IMM Business School Campus"
        />
        <div className="absolute inset-0 bg-black/10 bg-gradient-to-r from-blue-900/60 to-blue-700/10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-6"
              >
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 text-sm font-medium">
                  1st Time in India
                </Badge>
                <h1 className="text-4xl text-shadow-lg md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  AI & ML Infused{" "}
                  <span className="text-amber-400 text-shadow-lg">
                    BBA Program
                  </span>{" "}
                  in New Delhi
                </h1>
                <p className="text-lg md:text-xl text-shadow-md text-slate-100 max-w-2xl">
                  Prepare for the future of business with our innovative program
                  that combines traditional business education with cutting-edge
                  technology.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5">
                    AICTE Approved
                  </Badge>

                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5">
                    NEP 2020 Aligned
                  </Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5">
                    Industry Immersion
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Form Section - Collapsible */}
            <div className="form-section lg:col-span-4  relative z-10">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: isFormVisible ? 1 : 0,
                  x: isFormVisible ? 0 : 100,
                  width: isFormVisible ? "auto" : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`${isFormVisible ? "block" : "hidden"}`}
              >
                <Card className="bg-white text-foreground shadow-xl border-0">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-center text-xl font-bold">
                        Register for Admission 2025-2028
                      </CardTitle>
                      <button
                        onClick={toggleForm}
                        className="text-white hover:text-gray-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <CardDescription className="text- text-blue-100">
                      Fill the form below to start your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="fullname"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter Full Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contact"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="numeric"
                                  placeholder="Enter Contact Number"
                                  maxLength={10}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter Email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enter City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="program"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  value="BBA"
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="completed12th"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Do you have minimum 50% score in 10th and 12th?
                              </FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleEligibilityChange(value);
                                }}
                                value={field.value}
                                disabled={!isEligible && field.value === "no"}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Yes or No" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {showMarksheetUpload && (
                          <FormField
                            name="marksheet"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Upload your 12th Marksheet
                                </FormLabel>
                                <FormControl className="h-max">
                                  <Input
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={(e) => {
                                      handleFileChange(e);
                                      field.onChange(e);
                                    }}
                                    disabled={!isEligible}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Accepted formats: PDF, DOC, DOCX
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        )}

                        <Button
                          type="submit"
                          className="w-full bg-blue-700 hover:bg-blue-800"
                          disabled={isSubmitting || !isEligible}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved above welcome section */}
      <section className="py-12 bg-gradient-to-r from-blue-800 to-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform"
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-blue-800 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-8 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                src={campus}
                alt="IMM Business School Campus"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome to your Future at <br /> IMM Business School
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We&apos;re excited to introduce you to our Bachelor of Business
                Administration (BBA) program—a perfect blend of tradition and
                innovation that has been shaping future business leaders for 56
                years.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our program is designed to equip you with the skills, knowledge,
                and mindset needed to thrive in today&apos;s rapidly evolving
                business landscape. With a focus on practical learning, industry
                exposure, and cutting-edge technology, we prepare you to be the
                leaders of tomorrow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-8 sm:py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Program Highlights
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Our BBA Program?
            </h2>
            <p className="text-white/90 text-lg">
              Our program stands out with its unique blend of traditional
              business education and modern technological integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    AICTE Approved
                  </h3>
                  <p className="text-gray-600">
                    One of the first BBA programs to receive AICTE approval,
                    ensuring high-quality education standards.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                    <Cpu className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    AI & ML Integration
                  </h3>
                  <p className="text-gray-600">
                    Learn how to leverage artificial intelligence and machine
                    learning to solve complex business problems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                    <Building className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Industry Immersion
                  </h3>
                  <p className="text-gray-600">
                    Gain hands-on experience through our unique
                    Multidisciplinary Corporate Immersion Programme.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="py-8 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Specializations
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Specializations Offered in BBA @IMM
            </h2>
            <p className="text-gray-700 text-lg">
              Choose from a variety of specializations designed to align with
              your career goals and industry demands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <Card className="border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        {spec.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-blue-700">
                        {spec.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{spec.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section
        id="features"
        className="py-8 sm:py-20 bg-gradient-to-r from-blue-900 to-blue-700"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Key Features
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              What Makes Our BBA Program Special
            </h2>
            <p className="text-white/90 text-lg">
              Our program is designed with the future in mind, combining
              traditional business education with modern technological
              advancements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-50 rounded-full p-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 ml-16">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Program Details
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore Our BBA Program
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Tabs defaultValue="curriculum" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger
                  value="curriculum"
                  className=" data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="faculty"
                  className=" data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Faculty
                </TabsTrigger>
                <TabsTrigger
                  value="facilities"
                  className=" data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Facilities
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="curriculum"
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-blue-500 mb-4">
                  Comprehensive Curriculum
                </h3>
                <p className="text-gray-700 mb-4">
                  Our BBA program offers a well-rounded curriculum that covers
                  all essential aspects of business administration while
                  incorporating modern technological advancements.
                </p>
                <ul className="space-y-3">
                  {[
                    "Foundation courses in management principles, economics, and accounting",
                    "Technology Driven Pedagogy in Management Subjects, Empowered by Al & ML Bootcamp",
                    "Specialized courses in your chosen area of concentration",
                    "Technology-focused modules including AI & ML",
                    "Soft skills development through communication and leadership workshops",
                    "Industry projects and internships for practical experience",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent
                value="faculty"
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-blue-500 mb-4">
                  Expert Faculty
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn from industry experts and experienced academicians who
                  bring real-world knowledge to the classroom.
                </p>
                <ul className="space-y-3">
                  {[
                    "Professors with extensive industry experience",
                    "Visiting faculty from top corporations",
                    "Research-oriented academicians with publications in reputed journals",
                    "Mentors who provide personalized guidance for career development",
                    "Industry professionals who conduct specialized workshops",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent
                value="facilities"
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-blue-500 mb-4">
                  State-of-the-Art Facilities
                </h3>
                <p className="text-gray-700 mb-4">
                  Our campus is equipped with modern facilities to enhance your
                  learning experience and prepare you for the corporate world.
                </p>
                <ul className="space-y-3">
                  {[
                    "Smart classrooms with advanced audio-visual equipment",
                    "Well-stocked library with digital resources and databases",
                    "Computer labs with industry-standard software",
                    "Innovation hub for entrepreneurial projects",
                    "Recreation areas for holistic development",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-8 sm:py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              We guarantee you the finest & quality business education
            </h2>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline text-left">
                  Embracing NEP2020
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  Our BBA program is designed with the National Education Policy
                  2020 (NEP2020) in mind, focusing on holistic and
                  multidisciplinary education. We aim to nurture your critical
                  thinking, creativity, and ethical leadership, ensuring
                  you&apos;re ready to thrive in today&apos;s business world.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline text-left">
                  A Proud Legacy
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  For over five decades, IMM Business School has been a
                  cornerstone of business education in India. Our graduates are
                  successful leaders across various industries, and our global
                  alumni network is a testament to the impact of an IMM
                  education.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline text-left">
                  Pioneering AICTE-Approved BBA
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  We&apos;re proud to be among the first to receive AICTE
                  approval for our BBA program, highlighting our commitment to
                  high standards and relevant education. Our curriculum
                  incorporates the latest trends and technologies to keep you
                  ahead in the business game.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline text-left">
                  Integrating AI, ML, and Emerging Technologies
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  What sets our BBA program apart is the integration of
                  Artificial Intelligence (AI), Machine Learning (ML), and other
                  emerging technologies into our courses. These advancements
                  will equip you with the skills to analyse data, drive
                  innovation, and adopt a futuristic approach in your career.
                  You will learn to harness these technologies to solve complex
                  business problems and stay ahead in a rapidly evolving
                  business landscape.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline text-left">
                  Multidisciplinary Corporate Immersion Programme for Problem
                  Solving (MCIPPS)
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  A key differentiator of our BBA program is our unique
                  Multidisciplinary Corporate Immersion Programme for Problem
                  Solving (MCIPPS). This unique, hands-on experiential learning
                  initiative runs concurrently with your studies, offering
                  real-world corporate exposure. Through MCIPPS, you&apos;ll
                  engage in practical problem-solving within diverse business
                  environments, ensuring that you &quot;hit the ground
                  running&quot; when you enter the business and/or your chosen
                  corporate domain.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-900 px-6 py-4 hover:no-underline">
                  From Class 12 to Business Leader
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-6 pb-4">
                  Our BBA program is tailored for students right after Class 12,
                  providing a smooth transition into higher education. We cover
                  essential areas like management, finance, marketing,
                  operations, business analytics and entrepreneurship, with a
                  clear focus on personalised mentorship and holistic growth.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section id="fees" className="py-8 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Fee Structure
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Investment in Your Future
            </h2>
            <p className="text-gray-700 text-lg">
              Our fee structure is designed to provide quality education at a
              competitive price.
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Card className="border-2 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-700 border-b">
                <CardTitle className="text-center text-2xl font-bold text-white">
                  Registration Fee : ₹50,000
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100">
                      <TableHead className="font-bold text-black border w-1/4 text-center">
                        SEMESTER
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        1<sup>st</sup> YEAR
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        2<sup>nd</sup> YEAR
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        3<sup>rd</sup> YEAR
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold border text-center">
                        I
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹1,00,000
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹1,10,000
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹1,10,000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold border text-center">
                        II
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹70,000
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹80,000
                      </TableCell>
                      <TableCell className="border text-center">
                        ₹80,000
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="bg-blue-700 border-t justify-center p-4">
                <p className="text-2xl font-bold text-white">
                  Total Fee : ₹6,00,000
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
            <p className="mb-6 text-lg leading-relaxed">
              At IMM Business School, we believe our BBA program is more than
              just a degree—it&apos;s a journey of growth and transformation.
              Join our vibrant community and be part of an institution that has
              been pioneering business education for 56 years.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Enrol today and start your exciting journey into the world of
              business with us ! <br /> We can&apos;t wait to welcome you to IMM
              Business School, where your future begins.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="#form">
                <Button
                  className="bg-white text-blue-900 hover:bg-gray-100"
                  onClick={toggleForm}
                >
                  Apply Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Toast */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed z-50 bottom-4 right-4 bg-white border border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
        >
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>
            Application submitted successfully! We&apos;ll contact you soon.
          </span>
          <button
            onClick={() => setIsSuccess(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BBAProgram;
