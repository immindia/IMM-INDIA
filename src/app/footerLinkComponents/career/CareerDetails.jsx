"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { API_ENDPOINTS } from "@/lib/api";

const CAREER_API_URL = API_ENDPOINTS.CAREER_DETAILS;
const APPLICATION_API_URL = API_ENDPOINTS.JOB_APPLICATION;

export default function CareerDetails() {
  const { "job-opening": jobSlug } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${CAREER_API_URL}?slug=${jobSlug}`);
        if (!response.ok) {
          throw new Error("Job not found");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobSlug) {
      fetchJobDetails();
    }
  }, [jobSlug]);

  // Validation functions
  const validateName = (name) => (!name ? "Name is required" : "");
  const validateEmail = (email) =>
    !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "A valid email is required"
      : "";
  const validatePhone = (phone) =>
    !phone || !/^[6-9]\d{9}$/.test(phone)
      ? "Phone must be 10 digits starting with 6-9"
      : "";
  const validateFile = (file) => {
    if (!file) return "Resume is required";
    if (file.size > 5 * 1024 * 1024) return "File size must be under 5MB";
    return "";
  };

  const validateForm = () => {
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      file: validateFile(file),
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormErrors((prev) => ({ ...prev, file: validateFile(selectedFile) }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFormErrors((prev) => ({ ...prev, file: validateFile(droppedFile) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Please correct the errors in the form.");
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("loading");
    const dataToSubmit = new FormData();
    dataToSubmit.append("job_id", job.id);
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("phone", formData.phone);
    dataToSubmit.append("message", formData.message);
    dataToSubmit.append("resume", file);

    try {
      const response = await fetch(APPLICATION_API_URL, {
        method: "POST",
        body: dataToSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrorMessage(
        error.message || "There was an error submitting your application."
      );
      setSubmitStatus("error");
    }
  };

  if (isLoading) {
    return (
      <div className="container sm:max-w-6xl md:max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-1/4 mb-4" />
        <Skeleton className="h-20 w-1/2 mb-8" />
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="md:col-span-1">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pink-800 mb-4">
            Job not found
          </h1>
          <p className="text-pink-600 mb-6">
            The job position you're looking for doesn't exist.
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
            <div>
              <h1 className="text-3xl font-bold text-pink-900 mb-4">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <Briefcase size={14} /> {job.department}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <MapPin size={14} /> {job.location}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-pink-200 text-pink-700"
                >
                  <Clock size={14} /> {job.type}
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

                {job.skills && job.skills.length > 0 && (
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
            </div>
          </div>

          {/* Application form column */}
          <div className="md:col-span-1">
            <div className="bg-pink-50 rounded-lg p-6 border border-pink-100">
              <h2 className="text-xl font-semibold text-pink-900 mb-6">
                Apply for this position
              </h2>

              {submitStatus === "success" ? (
                <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your application has been submitted successfully! We&apos;ll
                    be in touch soon.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitStatus === "error" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
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
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={10}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter / Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Resume / CV *</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-pink-500 bg-pink-100"
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
                      />
                      {file ? (
                        <div className="flex items-center justify-center text-pink-700">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      ) : (
                        <div className="text-pink-600">
                          <Upload className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">
                            Click or drag and drop to upload
                          </p>
                          <p className="text-xs text-pink-500 mt-1">
                            PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                    {formErrors.file && (
                      <p className="text-red-500 text-sm">{formErrors.file}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={submitStatus === "loading"}
                  >
                    {submitStatus === "loading" ? (
                      <>
                        {" "}
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Submitting...{" "}
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
