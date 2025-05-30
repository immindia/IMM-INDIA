"use client";
import { useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
// Main Privacy Policy Component
export default function PolicyPrivacy() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - Privacy Policy");
    setDescription(
      "Read the Privacy Policy of IMM India to understand how we collect, use, and protect your personal information. Your privacy is our priority."
    );
  }, [setTitle, setDescription]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background-light to-background">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center sm:mt-12">
            <Heading
              title="Privacy Policy"
              titleClassName="text-4xl font-bold text-center text-gray-900"
              subtitle="For Online Payment Services"
              subtitleClassName="text-gray-600 text-lg text-center leading-8"
            />
          </div>

          <Card className="mb-8 border-primary/10 shadow-md">
            <CardHeader className="bg-background-light border-b border-primary/10">
              <CardTitle className="text-primary">
                Our Commitment to Privacy
              </CardTitle>
              <CardDescription className="text-primary-muted">
                Last updated: February 27, 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 text-foreground">
              <p className="mb-4">
                The basic purpose of the Privacy Policy statement is to enable
                you to understand that as a customer we value privacy of the
                information provided or obtained through the visits or usage of
                our website. This policy clearly states the manner in which the
                information is collected or used. You are advised to read the
                Privacy policy carefully. By accessing the services provided,
                you agree to the collection and use of information in the manner
                provided in the Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem
              value="item-1"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                What information do we collect?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p className="mb-4">
                  The information is generally collected whenever you visit our
                  web-site which does not disclose your personal identity like:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>IP address, assigned to the computer which you use</li>
                  <li>The domain server through which you assess our site</li>
                  <li>The type of web browser you are using</li>
                  <li>Date and time of your access to our site</li>
                </ul>
                <p className="mb-4">
                  There will be certain cases, while using the site, you will be
                  required to provide your information like:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Name including first, middle and last name</li>
                  <li>Contact address and/or mobile number</li>
                  <li>ZIP/PIN Codes</li>
                  <li>E-mail address or alternate e-mail address</li>
                  <li>
                    Other information as may be required as per registration
                    process
                  </li>
                </ul>
                <p>
                  However certain information may also be collected as under:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>About the pages you visit/access</li>
                  <li>The number of times you access the page</li>
                  <li>The links you click on our site</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                How is the information used?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p className="mb-4">We use the personal information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Take, process or execute your requests, process or obtain
                    payment or notify you of the status of your requests
                  </li>
                  <li>Provide you latest announcements</li>
                  <li>
                    Preserve social history as governed by existing laws or
                    policies
                  </li>
                  <li>Contact you as a survey respondent</li>
                  <li>Notify you, if you win any contest</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                Disclosure of the information
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Internal:</h4>
                  <p>
                    We use the information we collect about you in order to
                    provide our services and process your transaction and to
                    provide you best service. We give access to individually
                    identifiable information about our users only to those
                    employees who require it to fulfill customer service
                    requests.
                  </p>
                  <p className="mt-2">
                    We will not use your financial information for any other
                    purpose other than to complete a transaction with you.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">External:</h4>
                  <p>
                    We do not rent, sell or share your personal information and
                    will not disclose any of your personally identifiable
                    information to third parties unless:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>We have your permission</li>
                    <li>Required to complete your transaction</li>
                    <li>
                      To help investigate, prevent or take action regarding
                      unlawful and illegal activities, suspected fraud,
                      potential threat to the safety or security of any person,
                      violations of terms of use or to defend against legal
                      claims
                    </li>
                    <li>
                      Special circumstances such as compliance with subpoenas,
                      court orders, requests/order, notices from legal
                      authorities or law enforcement agencies requiring such
                      disclosure
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                Opting out the services
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p>
                  Upon request, we will block/remove your personally
                  identifiable information from our database. However, the
                  information will remain stored in archive on our servers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                Security
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p className="mb-4">
                  We take appropriate steps to protect the information you share
                  with us. We have implemented such technology and security
                  features and strict policy guidelines to safeguard the privacy
                  of your personally identifiable information from unauthorized
                  access and improper use or disclosure.
                </p>
                <p>
                  However, it is our constant endeavor to safeguard all your
                  personal information, but the process of flow of information
                  through usage of internet can't be made 100% secure. By using
                  this site, you agree that we will have no liability for
                  disclosure of your personal information due to errors in
                  transmission or unauthorized acts of third parties.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                How can you correct inaccuracies in the information?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p>
                  To correct or update any information you have provided, our
                  sites allow you to do it online. In the event of loss of
                  access details you can use any of the following options:
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-7"
              className="border border-primary/10 rounded-lg mb-4 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-foreground hover:bg-background-light">
                Revisions Modifications/Amendments to the Privacy Policy
              </AccordionTrigger>
              <AccordionContent className="px-6 text-foreground-muted">
                <p>
                  This privacy policy may be revised/modified/amended at any
                  point of time and the revised/modified/amended policy will be
                  placed on the site. Such revision/modification/amendment will
                  be effective from the date as may be decided.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="border-primary/10 shadow-md bg-gradient-to-r from-background-light to-background">
            <CardHeader>
              <CardTitle className="text-primary">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-accent mr-3 mt-0.5" />
                  <p className="text-foreground">
                    B-11 Qutab Institutional Area New Delhi | 110016
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-accent mr-3" />
                  <p className="text-foreground">+91-11-2652-0894/96</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-accent mr-3" />
                  <p className="text-foreground">info@immindia.com</p>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/contact-us">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
