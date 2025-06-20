import React, { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Label } from "@/components/ui/label";

import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import { useFetch } from "../../hooks/useFetch";
import { RiTwitterXLine } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must not contain special characters or numbers.";
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Mobile must be 10 digits and start with 6-9.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://stealthlearn.in/imm-admin/api/indexContact.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            result.message || "There was a problem with your request.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not connect to the server. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Your Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </Label>
        <Input
          id="phone"
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="h-[5rem]"
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-pink-900 hover:bg-pink-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3 text-gray-600">
        <MapPin className="w-5 h-5 text-pink-900" />
        <span>
          B-11 Qutab Institutional Area,
          <span className="block sm:hidden">
            <br /> New Delhi - 110016
          </span>
          <span className="hidden sm:inline">&nbsp; New Delhi - 110016</span>
        </span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>011-26520892/93/94/95/96</span>
      </div>
      <div className="flex flex-col space-y-4 text-gray-600 sm:items-center sm:flex-row sm:space-y-0 sm:space-x-3">
        <div className="flex items-center ">
          <Mail className="w-5 h-5 mr-3 text-pink-900" />
          <span>info@immindia.com</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-5 h-5 mr-3 text-pink-900" />
          <span>registrar.imm@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

function AdmissionHead() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>+91-9999078888</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>+91-9910463458</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Mail className="w-5 h-5 text-pink-900" />
        <span>admissions@immindia.edu.in</span>
      </div>
    </div>
  );
}

function CorporateResourceCentreHead() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>+91-9313556551</span>
      </div>
      {/* <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>011-41324850</span>
        <Phone className="w-5 h-5 text-pink-900" />
        <span>011-26965558</span>
      </div> */}
      <div className="flex items-center space-x-3 text-gray-600">
        <Mail className="w-5 h-5 text-pink-900" />
        <span>sanjay@immindia.com</span>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">Follow Us</h3>
      <div className="flex space-x-4">
        <a
          href="https://www.facebook.com/indiaimm"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
        >
          <Facebook className="w-6 h-6 text-pink-800 transition-colors duration-300 group-hover:text-pink-600" />
        </a>
        <a
          href="https://x.com/imm_bschool"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
        >
          <RiTwitterXLine className="w-6 h-6 text-pink-800 transition-colors duration-300 group-hover:text-pink-600" />
        </a>
        <a
          href="https://www.instagram.com/imm_india"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:-rotate-12 group"
        >
          <Instagram className="w-6 h-6 text-pink-800 transition-colors duration-300 group-hover:text-pink-600" />
        </a>
        <a
          href="https://www.linkedin.com/school/institute-of-marketing-and-management/?originalSubdomain=in"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:-rotate-12 group"
        >
          <Linkedin className="w-6 h-6 text-pink-800 transition-colors duration-300 group-hover:text-pink-600" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCsFZ4Ove-nEuyZSaBggG3eQ"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
        >
          <Youtube className="w-6 h-6 text-pink-800 transition-colors duration-300 group-hover:text-pink-600" />
        </a>
      </div>
    </div>
  );
}

function Map() {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.019969589436!2d77.17916397533202!3d28.53911947571588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dfac0000001%3A0xee90409084aef4b8!2sIMM%20BUSINESS%20SCHOOL!5e0!3m2!1sen!2sin!4v1734506660054!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}

export default function Contact() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - Contact Us");
    setDescription(
      "Reach out to IMM Delhi for MBA admissions & inquiries. Get in touch with our office now to know our working hours and location."
    );
  }, [setTitle, setDescription]);

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
        (item) => item.category === "Contact Us Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Contact Us"
      )?.url;

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

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen">
      <Toaster />
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Contact Us"
        breadcrumbItems={breadcrumbItems}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-8">
          {/* Contact Form */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Send us a message
            </h2>
            <ContactForm />

            <div className="mt-6 ">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Find Us
              </h2>
              <Map />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-5 sm:space-y-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Contact Information
              </h2>
              <ContactInfo />
              <SocialLinks />
            </div>
            <div className="grid gap-5 sm:gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Prof. Mukul Kumar {window.innerWidth < 768 ? " " : " - "}{" "}
                  Admission Director
                </h2>
                <AdmissionHead />
              </div>

              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Corporate Connect Hub
                </h2>
                <CorporateResourceCentreHead />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
