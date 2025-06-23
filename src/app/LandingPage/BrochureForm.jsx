"use client";

import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, MapPin } from "lucide-react";
import pgdm from "../../assets/pdfs/PGDM Brochure 2025-2027.pdf";

export default function BrochureForm() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - PGDM Brochure");
    setDescription(
      "Read genuine feedback and reviews about the Institute of Marketing and Management (IMM). Discover student experiences, course quality, faculty insights, and placement support at IMM Delhi."
    );
  }, [setTitle, setDescription]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    state: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(
        "https://www.stealthlearn.in/imm-admin/api/indexBrochure.php",
        {
          // TODO: Replace with your actual API URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: "success", text: result.message });
        setIsOpen(false); // Close the dialog
        window.open(pgdm, "_blank"); // Open the PDF
        // Reset form data if needed
        setFormData({
          name: "",
          mobile: "",
          email: "",
          state: "",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: result.message || "An error occurred.",
        });
      }
    } catch (err) {
      console.error("Brochure form submission error:", err);
      setSubmitMessage({
        type: "error",
        text: "Failed to connect to the server. Check console for details.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={`flex items-center rotate-[270deg] bg-red-800 hover:bg-pink-900 text-white px-4 pt-2 pb-5 rounded-lg drop-shadow-lg transition-all duration-300 animate-pulse font-semibold`}
        >
          Download Brochure
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-pink-800 flex items-center justify-between px-4">
            Download PGDM Brochure
            <img
              src="/logo.svg"
              alt="PGDM Brochure"
              className="w-auto h-12 mr-2 p-1 bg-pink-900 rounded-sm"
            />
          </DialogTitle>
          {submitMessage && (
            <p
              className={`text-sm mt-2 ${
                submitMessage.type === "error"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {submitMessage.text}
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-4 py-4">
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right text-pink-800">
              <User className="inline-block mr-2 h-5 w-5 text-pink-800" />
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3 border-pink-300 focus:border-pink-500"
              required
            />
          </div>
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="mobile" className="sm:text-right text-pink-800">
              <Phone className="inline-block mr-2 h-5 w-5 text-pink-800" />
              Mobile
            </Label>
            <Input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className="col-span-3 border-pink-300 focus:border-pink-500"
              required
            />
          </div>
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="email" className="sm:text-right text-pink-800">
              <Mail className="inline-block mr-2 h-5 w-5 text-pink-800" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="col-span-3 border-pink-300 focus:border-pink-500"
              required
            />
          </div>
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="state" className="sm:text-right text-pink-800">
              <MapPin className="inline-block mr-2 h-5 w-5 text-pink-800" />
              State
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="col-span-3 border-pink-300 focus:border-pink-500"
              required
            />
          </div>
          <DialogFooter className="flex justify-between gap-3 sm:gap-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-pink-800 border-pink-800 hover:bg-pink-50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-pink-800 hover:bg-pink-900 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit & Download"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
