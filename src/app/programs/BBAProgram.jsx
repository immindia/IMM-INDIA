import React, { useState } from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Award,
  Globe,
  Briefcase,
  Cpu,
  Lightbulb,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const BBAProgram = () => {
  // State for form submission and file upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMarksheetUpload, setShowMarksheetUpload] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
      completed12th: undefined,
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
      // alert("Form submission successful");
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
      icon: <Lightbulb className="h-16 w-16 text-primary" />,
    },
    {
      title: "International Business Management",
      icon: <Globe className="h-16 w-16 text-primary" />,
    },
    {
      title: "Financial Management",
      icon: <Briefcase className="h-16 w-16 text-primary" />,
    },
    {
      title: "Human Resource Management",
      icon: <Home className="h-16 w-16 text-primary" />,
    },
    {
      title: "Business Analytics & Research",
      icon: <Search className="h-16 w-16 text-primary" />,
    },
    {
      title: "Information Technology",
      icon: <Cpu className="h-16 w-16 text-primary" />,
    },
  ];

  // Key features data
  const features = [
    {
      title: "MULTIDISCIPLINARY CURRICULUM",
      description: "Aligned with NEP2020 for a comprehensive education",
      icon: <FileText className="h-16 w-16 text-primary" />,
    },
    {
      title: "GLOBAL PERSPECTIVE",
      description: "Preparing you for international business environments.",
      icon: <Globe className="h-16 w-16 text-primary" />,
    },
    {
      title: "INDUSTRY INTEGRATION",
      description:
        "Experience through internships, live projects, and interactions with industry leaders.",
      icon: <Briefcase className="h-16 w-16 text-primary" />,
    },
    {
      title: "EMERGING TECHNOLOGIES",
      description:
        "Learn to use AI, ML, and other technologies to innovate and solve business problems, making you future-ready.",
      icon: <Cpu className="h-16 w-16 text-primary" />,
    },
    {
      title: "INNOVATIVE TEACHING",
      description:
        "A mix of traditional methods, digital tools, and case studies.",
      icon: <Lightbulb className="h-16 w-16 text-primary" />,
    },
    {
      title: "MCIPPS",
      description:
        "Gain practical, hands-on experience through our unique Multidisciplinary Corporate Immersion Programme for Problem Solving.",
      icon: <FileText className="h-16 w-16 text-primary" />,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                <div className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold px-6 py-2 rounded-md">
                  1<sup>st</sup> time in India
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  AI & ML Infused BBA Program <br /> in New Delhi
                </h1>
                <div className="inline-block bg-blue-500 px-4 py-2 rounded-full">
                  Approved By AICTE
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-white text-foreground">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-bold text-blue-800">
                    Register Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                              <Input placeholder="Enter Full Name" {...field} />
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

                      <FormItem>
                        <FormControl>
                          <Input value="BBA" readOnly className="bg-gray-100" />
                        </FormControl>
                      </FormItem>

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
                        <FormItem>
                          <FormLabel>Upload your 12th Marksheet</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf, .doc, .docx"
                              onChange={handleFileChange}
                              disabled={!isEligible}
                            />
                          </FormControl>
                          <FormDescription>
                            Accepted formats: PDF, DOC, DOCX
                          </FormDescription>
                        </FormItem>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !isEligible}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Welcome to your Future at The IMM Business School
            </h2>
            <p className="text-gray-700 text-lg">
              IMM Business School! We're excited to introduce you to our
              Bachelor of Business Administration (BBA) program—a perfect blend
              of tradition and innovation that has been shaping future business
              leaders for 56 years.
            </p>
          </div>

          <div className="mt-12">
            <img
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              src="https://v0.dev/placeholder.svg"
              alt="IMM Business School Campus"
            />
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            BBA Specializations Offered at IMM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{spec.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-800">
                    {spec.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore BBA Section */}
      {/* <section className="py-8">
          <div className="container mx-auto px-4">
            <img
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              src="https://v0.dev/placeholder.svg"
              alt="Explore BBA Program"
            />
          </div>
        </section> */}

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Key Features of IMM Business School's BBA Programmes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            We guarantee you the finest & quality business education
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  Embracing NEP2020
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Our BBA program is designed with the National Education Policy
                  2020 (NEP2020) in mind, focusing on holistic and
                  multidisciplinary education. We aim to nurture your critical
                  thinking, creativity, and ethical leadership, ensuring you're
                  ready to thrive in today's business world.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  A Proud Legacy
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  For over five decades, IMM Business School has been a
                  cornerstone of business education in India. Our graduates are
                  successful leaders across various industries, and our global
                  alumni network is a testament to the impact of an IMM
                  education.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  Pioneering AICTE-Approved BBA
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  We're proud to be among the first to receive AICTE approval
                  for our BBA program, highlighting our commitment to high
                  standards and relevant education. Our curriculum incorporates
                  the latest trends and technologies to keep you ahead in the
                  business game.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  Integrating AI, ML, and Emerging Technologies
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
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

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  Multidisciplinary Corporate Immersion Programme for Problem
                  Solving (MCIPPS)
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  A key differentiator of our BBA program is our unique
                  Multidisciplinary Corporate Immersion Programme for Problem
                  Solving (MCIPPS). This unique, hands-on experiential learning
                  initiative runs concurrently with your studies, offering
                  real-world corporate exposure. Through MCIPPS, you'll engage
                  in practical problem-solving within diverse business
                  environments, ensuring that you "hit the ground running" when
                  you enter the business and/or your chosen corporate domain.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold text-blue-800">
                  From Class 12 to Business Leader
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Our BBA program is tailored for students right after Class 12,
                  providing a smooth transition into higher education. We cover
                  essential areas like management, finance, marketing,
                  operations, business analytics and entrepreneurship, with a
                  clear focus on personalised mentorship and holistic growth.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {/* <section className="py-8">
        <div className="container mx-auto px-4">
          <img
            className="w-full rounded-lg shadow-lg"
            src="images_webp/eventsbbadesk-min.webp"
            alt="BBA Events"
          />
        </div>
      </section> */}

      {/* Join Us Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us</h2>
            <p className="mb-4 text-lg">
              At IMM Business School, we believe our BBA program is more than
              just a degree—it's a journey of growth and transformation. Join
              our vibrant community and be part of an institution that has been
              pioneering business education for 56 years.
            </p>
            <p className="text-lg">
              Enrol today and start your exciting journey into the world of
              business with us! We can't wait to welcome you to IMM Business
              School, where your future begins.
            </p>

            <Button className="mt-8 bg-white text-blue-900 hover:bg-blue-50">
              Apply Now
            </Button>
          </div>
        </div>
      </section>
      {/* Fee Structure Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <div className="grid grid-cols-3 gap-4 text-center font-semibold">
                  <div>Fees Structure</div>
                  <div>Total Fees</div>
                  <div>4,95,000/-</div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="py-2">1st Year</div>
                  <div className="py-2">2nd Year</div>
                  <div className="py-2">3rd Year</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center font-semibold text-blue-700">
                  <div className="py-2">1,70,000/-</div>
                  <div className="py-2">1,65,000/-</div>
                  <div className="py-2">1,60,000/-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isSuccess && (
        <div className="bg-green-100 fixed z-50 top-[190px] right-5 border border-green-400 text-green-700 px-4 py-3 rounded  mb-4 w-fit">
          <span className="block sm:inline">Form submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default BBAProgram;
