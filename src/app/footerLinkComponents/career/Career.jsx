"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  Filter,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_ENDPOINTS } from "@/lib/api";

const API_URL = API_ENDPOINTS.CAREER;

export default function Career() {
  const [jobListings, setJobListings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (Array.isArray(data)) {
          setJobListings(data);
          const uniqueDepartments = [
            "All Departments",
            ...new Set(data.map((job) => job.department)),
          ];
          const uniqueLocations = [
            "All Locations",
            ...new Set(data.map((job) => job.location)),
          ];
          setDepartments(uniqueDepartments);
          setLocations(uniqueLocations);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.description &&
        job.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      job.department === selectedDepartment;

    const matchesLocation =
      selectedLocation === "All Locations" || job.location === selectedLocation;

    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-pink-100">
        <div className="container sm:max-w-6xl md:max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6 text-pink-900">
              Join our team
            </h1>
            <p className="text-xl text-pink-700 mb-8">
              We're on a mission to build the future of technology. Join us and
              work on projects that matter.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#positions">
                <Button
                  size="lg"
                  className="group bg-pink-600 hover:bg-pink-700 text-white"
                >
                  View open positions
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-600 text-pink-600 hover:bg-pink-50"
              >
                About our culture
              </Button>
            </div>
          </div>
        </div>

        {/* Abstract background pattern */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-50 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Job Listings Section */}
      <section
        className="py-16 container sm:max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        id="positions"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-pink-900">
            Open Positions
          </h2>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search positions..."
                className="pl-10 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="md:hidden border-pink-300 text-pink-600 hover:bg-pink-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <X size={18} /> : <Filter size={18} />}
                <span className="ml-2">
                  {showFilters ? "Hide Filters" : "Filters"}
                </span>
              </Button>

              <div
                className={`flex-col md:flex-row gap-2 ${
                  showFilters ? "flex" : "hidden md:flex"
                }`}
              >
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-full md:w-[180px] border-pink-200">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full md:w-[180px] border-pink-200">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border border-pink-100 rounded-lg p-6">
                  <Skeleton className="h-8 w-2/3 mb-4 bg-pink-100" />
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-6 w-24 bg-pink-100" />
                    <Skeleton className="h-6 w-32 bg-pink-100" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2 bg-pink-100" />
                  <Skeleton className="h-4 w-5/6 bg-pink-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-pink-100 rounded-lg p-6 transition-all hover:shadow-md"
                  >
                    <Link to={`/career/${job.slug}`} className="block group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-pink-800 group-hover:text-pink-600 group-hover:underline">
                          {job.title}
                        </h3>
                        <ArrowUpRight className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-wrap gap-3 mb-4">
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
                      <p className="text-pink-700 mb-2">{job.description}</p>
                      <p className="text-sm text-pink-400">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-pink-500 mb-4">
                    No positions found matching your criteria
                  </p>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDepartment("All Departments");
                      setSelectedLocation("All Locations");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-pink-900">
              Don't see the right position?
            </h2>
            <p className="text-lg text-pink-700 mb-8">
              We&apos;re always looking for talented individuals to join our
              team. Send us your resume and we&apos;ll keep you in mind for
              future opportunities.
            </p>
            <a href="mailto:hr@imm.edu.in">
              <Button
                size="lg"
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                Submit your resume
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
