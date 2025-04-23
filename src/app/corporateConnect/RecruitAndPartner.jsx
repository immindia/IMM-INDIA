"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import img2 from "../../assets/programsoffered.webp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  title: z.string().optional(),
  company: z.string().optional(),
  connectionType: z.enum(["hireIntern", "fullTimeJob", "collaborate"], {
    required_error: "Please select how you wish to connect",
  }),
  comments: z.string().optional(),
});

export default function RecruitAndPartner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      company: "",
      connectionType: undefined,
      comments: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      // Submit to backend API
      console.log("Submitting form:", values);
      const response = await axios.post(
        "https://stealthlearn.in/imm-admin/api/indexRecruitAndPartner.php",
        values
      );

      console.log("API Response:", response.data);

      // Handle success, partial success, or error
      if (response.data.status === "success") {
        // Complete success
        setIsSubmitted(true);
        toast({
          title: "Form submitted successfully",
          description: "Thank you for your interest. We'll be in touch soon.",
        });
      } else if (response.data.status === "partial") {
        // Database success but email failed
        setIsSubmitted(true);
        toast({
          title: "Form submitted successfully",
          description:
            "Your information was saved, but there was an issue with sending the confirmation email.",
        });
      } else {
        // Other errors
        throw new Error(
          "API returned error: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Your form was not submitted. Please try again later.",
        variant: "destructive",
      });
    } finally {
      // Always set isSubmitting to false when done
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-white">
        <Card className="w-full max-w-3xl mx-auto border-pink-200 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-pink-100 rounded-full opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 bg-pink-100 rounded-full opacity-70"></div>

          <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center relative z-10">
            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-pink-600" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2 text-pink-800">
              Thank You!
            </h2>
            <p className="text-center text-gray-600 max-w-md">
              Your submission has been received. We appreciate your interest in
              IMM's Strategic Plan Implementation. Someone from our team will be
              in touch with you soon.
            </p>
            <Button
              className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-8 py-2 rounded-full"
              onClick={() => setIsSubmitted(false)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-5xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 bg-pink-100 rounded-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 -mb-10 -ml-10 bg-pink-100 rounded-full opacity-70"></div>

        <Card className="w-full border-pink-200 shadow-xl overflow-hidden relative z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pink-abstract-network.png')] opacity-5 bg-cover"></div>

          <CardHeader className="text-center bg-gradient-to-r from-pink-700 to-pink-500 text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pink-white-geometric-abstraction.png')] opacity-30 bg-cover mix-blend-overlay"></div>

            <div className="relative z-10 py-6">
              <div className="flex justify-center mb-4">
                <img
                  src="/minimalist-pink-education-logo.png"
                  alt="IMM Logo"
                  width={80}
                  height={80}
                  className="rounded-full bg-white p-2"
                />
              </div>
              <CardTitle className="text-4xl font-bold tracking-tight mb-2">
                HELP DESIGN IMM'S FUTURE
              </CardTitle>
              <CardDescription className="text-pink-100 text-xl">
                Send Comments, Ideas, Questions
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-8 relative z-10">
            <div className="mb-8 text-slate-600 bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
              <p>
                Thank you for your interest in IMM's Strategic Plan
                Implementation: IMM{new Date().getFullYear()} - Designing the
                Future. Please use the form below to ask any questions or
                provide feedback. Your inquiry will be directed to the
                appropriate initiative team for follow-up.
              </p>
            </div>

            <div className="flex items-center mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200"></div>
              <h3 className="font-medium text-pink-800 px-4">
                Please enter your information
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-800">
                              Full Name <span className="text-pink-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                              />
                            </FormControl>
                            <FormMessage className="text-pink-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-800">
                              Email <span className="text-pink-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john.doe@example.com"
                                {...field}
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                              />
                            </FormControl>
                            <FormMessage className="text-pink-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-800">
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your job title"
                                {...field}
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                              />
                            </FormControl>
                            <FormMessage className="text-pink-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-pink-800">
                              Company
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your company name"
                                {...field}
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                              />
                            </FormControl>
                            <FormMessage className="text-pink-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="connectionType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-pink-800">
                            How do you wish to connect with FIIB?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg hover:bg-pink-50 transition-colors">
                                <FormControl>
                                  <RadioGroupItem
                                    value="hireIntern"
                                    className="text-pink-600"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-pink-800 cursor-pointer">
                                  Hire Intern
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg hover:bg-pink-50 transition-colors">
                                <FormControl>
                                  <RadioGroupItem
                                    value="fullTimeJob"
                                    className="text-pink-600"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-pink-800 cursor-pointer">
                                  Full-Time Job
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg hover:bg-pink-50 transition-colors">
                                <FormControl>
                                  <RadioGroupItem
                                    value="collaborate"
                                    className="text-pink-600"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-pink-800 cursor-pointer">
                                  Collaborate with us
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-pink-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-pink-800">
                            Add Comments
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your thoughts, questions, or ideas..."
                              className="resize-none min-h-[120px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-pink-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Submit
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="hidden md:block">
                <div className="sticky top-10">
                  <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                    <img
                      src={img2}
                      alt="IMM Campus"
                      width={300}
                      height={400}
                      className="w-full h-auto brightness-75 hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-medium text-pink-800 mb-2">
                      Why Partner With Us?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>
                          Access to top talent and innovative research
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>
                          Collaborative opportunities with industry experts
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Be part of shaping the future of education</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-pink-100 pt-6 pb-6 text-sm text-pink-700 bg-gradient-to-r from-pink-50 to-white">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-pink-400" />
              IMM{new Date().getFullYear()} - Designing the Future | Strategic
              Plan Implementation
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
