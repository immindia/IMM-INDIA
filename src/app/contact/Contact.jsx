import React, { useState } from "react";
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
} from "lucide-react";
import { Label } from "@/components/ui/label";
import Heading from "@/components/Heading";
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your server
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating server delay
    setIsSubmitting(false);
    alert("Thank you for your message. We'll get back to you soon!");
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
        <Input id="name" type="text" placeholder="Your Name" required />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Your Email
        </Label>
        <Input id="email" type="email" placeholder="Your Email" required />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </Label>
        <Input id="phone" type="text" placeholder="Phone Number" required />
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
          required
          className="h-[5rem]"
        />
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
      <div className="flex items-center space-x-3 text-gray-600">
        <MapPin className="w-5 h-5 text-pink-900" />
        <span>B-11 Qutab Institutional Area, New Delhi - 110016</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-600">
        <Phone className="w-5 h-5 text-pink-900" />
        <span>011-26520892</span>
        <Phone className="w-5 h-5 text-pink-900" />
        <span> 011-26520896</span>
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
        <span>immplacement1@gmail.com</span>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-pink-900">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-900">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-900">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-900">
          <Linkedin className="w-6 h-6" />
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
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-40 bg-center bg-cover sm:h-80"
        style={{
          backgroundImage:
            "url('https://immindia.edu.in/images/imm-college.jpg')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Heading
            title="Contact Us"
            titleClassName="lg:font-extrabold text-center text-white tracking-wide"
            className="block w-full  mx-auto text-left sm:col-span-4 sm:pb-0 lg:pb-0 pb-0 pt-8 sm:pt-0"
          />
        </div>
      </div>

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
                  Admission Head
                </h2>
                <AdmissionHead />
              </div>

              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Corporate Resource Centre Head
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
