"use client";

import { useState, useRef, useEffect } from "react";
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
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    file: "",
  });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill in all required fields and upload your resume."
  );
  // apiEndpoint state is defined here for potential future dynamic endpoint configuration
  // eslint-disable-next-line no-unused-vars
  const [apiEndpoint, setApiEndpoint] = useState(
    "https://www.immindia.edu.in/apply-job.php"
  );
  const fileInputRef = useRef(null);

  // Check if the API endpoint is accessible
  useEffect(() => {
    // Try to detect if we're running in a development environment without PHP
    const isLocalDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalDev) {
      console.log(
        "Development environment detected. API calls may fail if PHP backend is not available."
      );
      console.log("Using remote endpoint:", apiEndpoint);
    }
  }, [apiEndpoint]);

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

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    if (!/^[a-zA-Z\s]*$/.test(name))
      return "Name should only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(phone))
      return "Phone number must start with 6-9 and be 10 digits";
    return "";
  };

  const validateMessage = (message) => {
    if (message && message.length > 1000)
      return "Message should not exceed 1000 characters";
    return "";
  };

  const validateFile = (file) => {
    if (!file) return "Resume is required";
    if (file.size > 5 * 1024 * 1024) return "File size exceeds 5MB limit";
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension))
      return "Only PDF, DOC, DOCX files are allowed";
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
      file: validateFile(file),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value;

    // Real-time validation
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        // Remove non-numeric characters
        numericValue = value.replace(/\D/g, "");
        // Update form with numeric value
        setFormData((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
        error = validatePhone(numericValue);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
        break;
    }

    // Only update form data if it's not a phone number (phone is handled in the switch)
    if (name !== "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileError = validateFile(selectedFile);
      if (fileError) {
        setFormErrors((prev) => ({
          ...prev,
          file: fileError,
        }));
        setErrorMessage(fileError);
        setSubmitStatus("error");
        return;
      }
      setFile(selectedFile);
      setFormErrors((prev) => ({
        ...prev,
        file: "",
      }));
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
    console.log("Form submission started");

    // Validate all fields before submission
    if (!validateForm()) {
      setErrorMessage("Please correct the errors in the form.");
      setSubmitStatus("error");
      return;
    }

    console.log("Form data:", formData);
    console.log("File:", file);
    console.log("Job data:", job);
    console.log("API endpoint:", apiEndpoint);

    // Set loading state
    setSubmitStatus("loading");

    // Create FormData object for file upload
    const formDataToSubmit = new FormData();

    // Use job.id if available, otherwise use the slug as fallback
    const jobIdentifier = job.id ? job.id.toString() : jobSlug;
    formDataToSubmit.append("job_id", jobIdentifier);

    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("message", formData.message || ""); // Ensure message is not null
    formDataToSubmit.append("img", file); // This matches the PHP file input name

    console.log("FormData created with job_id:", jobIdentifier);

    // Log all form data being sent
    for (let pair of formDataToSubmit.entries()) {
      console.log(
        pair[0] + ": " + (pair[0] === "img" ? pair[1].name : pair[1])
      );
    }

    // Submit form to PHP endpoint
    fetch(apiEndpoint, {
      method: "POST",
      body: formDataToSubmit,
      mode: "cors",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.text().then((text) => {
          console.log("Response text:", text);

          if (response.ok) {
            // Try to parse the response as JSON
            let jsonResponse;
            try {
              jsonResponse = JSON.parse(text);
              console.log("Parsed JSON response:", jsonResponse);
            } catch (e) {
              console.log("Response is not JSON, treating as success", e);
            }

            console.log("Form submitted successfully");
            // Set success state locally
            setSubmitStatus("success");

            // Redirect to career-detail.php with success flag after a short delay
            setTimeout(() => {
              window.location.href = `https://www.immindia.edu.in/career-detail.php?job=${jobSlug}&flag=success`;
            }, 2000);
          } else {
            throw new Error(`Form submission failed: ${text}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);

        // Check if the error is related to CORS
        if (
          error.message.includes("NetworkError") ||
          error.message.includes("CORS")
        ) {
          console.warn(
            "CORS error detected. Attempting traditional form submission..."
          );

          // Create a hidden form and submit it traditionally
          const form = document.createElement("form");
          form.method = "POST";
          form.action = apiEndpoint;
          form.enctype = "multipart/form-data";
          form.target = "_blank"; // Open in new tab

          // Add all form fields
          const jobIdInput = document.createElement("input");
          jobIdInput.type = "hidden";
          jobIdInput.name = "job_id";
          jobIdInput.value = job.id ? job.id.toString() : jobSlug;
          form.appendChild(jobIdInput);

          const nameInput = document.createElement("input");
          nameInput.type = "hidden";
          nameInput.name = "name";
          nameInput.value = formData.name;
          form.appendChild(nameInput);

          const phoneInput = document.createElement("input");
          phoneInput.type = "hidden";
          phoneInput.name = "phone";
          phoneInput.value = formData.phone;
          form.appendChild(phoneInput);

          const emailInput = document.createElement("input");
          emailInput.type = "hidden";
          emailInput.name = "email";
          emailInput.value = formData.email;
          form.appendChild(emailInput);

          const messageInput = document.createElement("input");
          messageInput.type = "hidden";
          messageInput.name = "message";
          messageInput.value = formData.message || "";
          form.appendChild(messageInput);

          // Note: We can't add the file this way, so we'll inform the user
          setErrorMessage(
            "We're redirecting you to our application form. Please reattach your resume there."
          );

          // Append form to body and submit
          document.body.appendChild(form);

          // Set a timeout to submit the form
          setTimeout(() => {
            form.submit();
            // Remove form from DOM after submission
            document.body.removeChild(form);
          }, 1000);

          return;
        }

        setErrorMessage(
          "There was an error submitting your application. Please try again later."
        );
        setSubmitStatus("error");

        // For development purposes - show a success message even if the API fails
        // Remove this in production
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          console.warn(
            "Development mode: Showing success message despite error"
          );
          setTimeout(() => {
            setSubmitStatus("success");
          }, 1000);
        }
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
                  method="POST"
                  action={apiEndpoint}
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
                      className={`border-pink-200 focus:border-pink-500 focus:ring-pink-500 ${
                        formErrors.name ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
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
                      className={`border-pink-200 focus:border-pink-500 focus:ring-pink-500 ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone * (10 digits starting with 6-9)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={10}
                      className={`border-pink-200 focus:border-pink-500 focus:ring-pink-500 ${
                        formErrors.phone ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter / Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`border-pink-200 focus:border-pink-500 focus:ring-pink-500 min-h-[100px] ${
                        formErrors.message ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  {/* Hidden input for job_id - ensure it matches PHP expectation */}
                  <input
                    type="hidden"
                    name="job_id"
                    value={job.id ? job.id.toString() : jobSlug}
                  />

                  <div className="space-y-2">
                    <Label>Resume / CV *</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-pink-500 bg-pink-50"
                          : formErrors.file
                          ? "border-red-500"
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
                    {formErrors.file && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.file}
                      </p>
                    )}
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
