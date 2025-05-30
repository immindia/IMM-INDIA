"use client";

import { useEffect } from "react";
import { useMeta } from "@/context/MetaContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";

export default function Feedback() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - Feedback");
    setDescription(
      "Read genuine student feedback and reviews about the Institute of Marketing and Management (IMM). Discover insights on courses, faculty, placements, and overall experience at IMM Delhi."
    );
  }, [setTitle, setDescription]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary-color mb-2">Feedback</h1>
        <p className="text-muted-foreground">
          We value your input to help improve our services
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FeedbackCard
          title="For Students"
          description="Share your thoughts about courses, facilities, and student services"
          icon={<GraduationCap className="h-8 w-8" />}
          buttonText="Submit Student Feedback"
          onClick={() =>
            (window.location.href =
              "https://www.aicte-india.org/feedback/students.php")
          }
        />

        <FeedbackCard
          title="For Faculty"
          description="Provide feedback on academic resources, policies, and administrative support"
          icon={<Users className="h-8 w-8" />}
          buttonText="Submit Faculty Feedback"
          onClick={() =>
            (window.location.href =
              "https://www.aicte-india.org/feedback/faculty.php")
          }
        />
      </div>
    </div>
  );
}

function FeedbackCard({ title, description, icon, buttonText, onClick }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="bg-primary-color text-primary-foreground rounded-t-lg pb-4">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-base mb-6">
          {description}
        </CardDescription>
        <Button
          className="w-full bg-primary-color text-primary-foreground hover:bg-primary-color/80"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
