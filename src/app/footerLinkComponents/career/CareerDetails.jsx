"use client";

import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { jobListings } from "./jobData";

export default function CareerDetails() {
  window.scrollTo(0, 0);
  const { "job-opening": jobSlug } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill in all required fields and upload your resume."
  );
  const fileInputRef = useRef(null);

  // Find the job from jobListings array using the slug
  const job = jobListings.find((job) => job.slug === jobSlug);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pink-800 mb-4">
            Job not found
          </h1>
          <p className="text-pink-600 mb-6">
            The job position you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/career">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage(
          "File size exceeds 5MB limit. Please select a smaller file."
        );
        setSubmitStatus("error");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      // Check file size (5MB limit)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setErrorMessage(
          "File size exceeds 5MB limit. Please select a smaller file."
        );
        setSubmitStatus("error");
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !file) {
      setErrorMessage(
        "Please fill in all required fields and upload your resume."
      );
      setSubmitStatus("error");
      return;
    }

    // Set loading state
    setSubmitStatus("loading");

    // Create FormData object for file upload
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("job_id", job.id || jobSlug);
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("message", formData.message);
    formDataToSubmit.append("img", file);

    // Submit form to PHP endpoint
    fetch("/apply-job.php", {
      method: "POST",
      body: formDataToSubmit,
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to career-detail.php with success flag
          window.location.href = "/career-detail.php?flag=success";
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setErrorMessage(
          "There was an error submitting your application. Please try again later."
        );
        setSubmitStatus("error");
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-pink-50 border-b border-pink-100">
        <div className="container sm:max-w-6xl md:max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link
            to="/career"
            className="inline-flex items-center text-pink-700 hover:text-pink-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all positions
          </Link>
        </div>
      </div>

      <div className="container sm:max-w-6xl md:max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Job details column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-pink-900 mb-4">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <Briefcase size={14} />
                  {job.department}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <MapPin size={14} />
                  {job.location}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <Clock size={14} />
                  {job.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  Experience: {job.experience}
                </Badge>
              </div>

              <div className="prose max-w-none text-pink-800">
                <h2 className="text-xl font-semibold text-pink-900 mb-3">
                  Job Description
                </h2>
                <p className="mb-6">{job.fullDescription}</p>

                {job.skills && (
                  <>
                    <h2 className="text-xl font-semibold text-pink-900 mb-3">
                      Skills & Requirements
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      {job.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Application form column */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-pink-50 rounded-lg p-6 border border-pink-100"
            >
              <h2 className="text-xl font-semibold text-pink-900 mb-6">
                Apply for this position
              </h2>

              {submitStatus === "success" ? (
                <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Your application has been submitted successfully! We&apos;ll
                    be in touch soon.
                  </AlertDescription>
                </Alert>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  encType="multipart/form-data"
                >
                  {submitStatus === "error" && (
                    <Alert className="bg-red-50 border-red-200 text-red-800 mb-4">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter / Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-500 focus:ring-pink-500 min-h-[100px]"
                    />
                  </div>

                  {/* Hidden input for job_id */}
                  <input
                    type="hidden"
                    name="job_id"
                    value={job.id || jobSlug}
                  />

                  <div className="space-y-2">
                    <Label>Resume / CV *</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-pink-500 bg-pink-50"
                          : "border-pink-200 hover:border-pink-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        name="img"
                      />

                      {file ? (
                        <div className="flex items-center justify-center text-pink-700">
                          <CheckCircle className="h-5 w-5 mr-2 text-pink-600" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      ) : (
                        <div className="text-pink-600">
                          <Upload className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">
                            Drag and drop your resume here, or click to browse
                          </p>
                          <p className="text-xs text-pink-500 mt-1">
                            Supports PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={submitStatus === "loading"}
                  >
                    {submitStatus === "loading"
                      ? "Submitting..."
                      : "Submit Application"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
