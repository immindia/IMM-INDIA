"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  GraduationCap,
  Building2,
  Users,
  ArrowUpDown,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";

export default function HallofFame() {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 12;
  const [viewStyle, setViewStyle] = useState("card");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexPlacement.php"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for "Hall of Fame" category only
        const hallOfFameData = data.filter(
          (item) => item.category === "Hall of Fame"
        );

        // Transform data to match component format
        const transformedData = hallOfFameData.map((item) => ({
          id: item.id,
          name: item.title,
          class: item.year,
          company: item.description,
          img: item.url,
        }));

        setAlumniData(transformedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique class years and companies for filters
  const classYears = useMemo(() => {
    return [...new Set(alumniData.map((alumni) => alumni.class))].sort();
  }, [alumniData]);

  const companies = useMemo(() => {
    return [...new Set(alumniData.map((alumni) => alumni.company))].sort();
  }, [alumniData]);

  // Filter alumni based on search query and filters
  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const matchesSearch =
        searchQuery === "" ||
        alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.class.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass =
        classFilter === "" ||
        classFilter === "all" ||
        alumni.class === classFilter;
      const matchesCompany =
        companyFilter === "" ||
        companyFilter === "all" ||
        alumni.company === companyFilter;

      return matchesSearch && matchesClass && matchesCompany;
    });
  }, [alumniData, searchQuery, classFilter, companyFilter]);

  // Sort alumni
  const sortedAlumni = useMemo(() => {
    return [...filteredAlumni].sort((a, b) => {
      const aValue = a[sortField]?.toLowerCase() || "";
      const bValue = b[sortField]?.toLowerCase() || "";

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredAlumni, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlumni = sortedAlumni.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  const resetFilters = () => {
    setSearchQuery("");
    setClassFilter("");
    setCompanyFilter("");
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const classStats = classYears
      .map((year) => ({
        year,
        count: alumniData.filter((alumni) => alumni.class === year).length,
      }))
      .sort((a, b) => b.count - a.count);

    const companyStats = companies
      .map((company) => ({
        company,
        count: alumniData.filter((alumni) => alumni.company === company).length,
      }))
      .filter((stat) => stat.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { classStats, companyStats };
  }, [alumniData, classYears, companies]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mx-auto mb-4"></div>
          <p className="text-pink-700">Loading alumni data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-pink-600 hover:bg-pink-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container sm:max-w-6xl md:max-w-7xl mx-auto py-6 px-4 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-800">
            Alumni Directory
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Connect with our global network of alumni
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg py-4 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-pink-700 text-lg sm:text-xl">
                <Search className="h-5 w-5" />
                Search & Filter
              </CardTitle>
              <CardDescription>
                Find alumni by name, company, or graduation year
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="sm:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, company or class year..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>

                <div className="">
                  <Select
                    value={classFilter}
                    onValueChange={(value) => {
                      setClassFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <SelectValue placeholder="Class Year" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="all">All Years</SelectItem>
                      {classYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* <div>
                  <Select
                    value={companyFilter}
                    onValueChange={(value) => {
                      setCompanyFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <SelectValue placeholder="Company" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

                <div className="sm:col-span-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                  >
                    <Filter className="h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="inline-flex items-center bg-white border rounded-lg overflow-hidden shadow-sm">
              <button
                className={`px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2 ${
                  viewStyle === "card"
                    ? "bg-pink-100 text-pink-700"
                    : "hover:bg-pink-50 hover:text-pink-600"
                }`}
                onClick={() => setViewStyle("card")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Card View</span>
              </button>
              <button
                className={`px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2 ${
                  viewStyle === "table"
                    ? "bg-pink-100 text-pink-700"
                    : "hover:bg-pink-50 hover:text-pink-600"
                }`}
                onClick={() => setViewStyle("table")}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Table View</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-4 sm:gap-6">
            <Card
              className={`${
                viewStyle === "table" ? "md:col-span-2" : "md:col-span-4"
              } border-none shadow-md`}
            >
              <CardHeader className="pb-3 bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg py-4 sm:py-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-pink-700 text-lg sm:text-xl">
                    <Users className="h-5 w-5" />
                    Alumni List
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-white border-pink-200 text-pink-700"
                  >
                    {filteredAlumni.length} Results
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                {viewStyle === "card" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-3 sm:gap-4">
                    {paginatedAlumni.length > 0 ? (
                      paginatedAlumni.map((alumni, index) => (
                        <div
                          key={alumni.id}
                          className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                            <img
                              src={alumni.img}
                              alt={alumni.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-3 sm:p-4">
                            <h3 className="font-semibold text-base sm:text-lg truncate">
                              {alumni.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {alumni.company}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge
                                variant="outline"
                                className="bg-pink-50 border-pink-200 text-pink-700 text-xs"
                              >
                                Class of {alumni.class}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                #{startIndex + index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12 text-gray-500">
                        No results found.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-pink-50">
                          <TableHead className="w-16">S No.</TableHead>
                          <TableHead>
                            <button
                              className="flex items-center gap-1 hover:text-pink-700"
                              onClick={() => handleSort("name")}
                            >
                              Name
                              <ArrowUpDown
                                className={`h-3 w-3 ${
                                  sortField === "name"
                                    ? "text-pink-700"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          </TableHead>
                          <TableHead>
                            <button
                              className="flex items-center gap-1 hover:text-pink-700"
                              onClick={() => handleSort("company")}
                            >
                              Company
                              <ArrowUpDown
                                className={`h-3 w-3 ${
                                  sortField === "company"
                                    ? "text-pink-700"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="w-24">
                            <button
                              className="flex items-center gap-1 hover:text-pink-700"
                              onClick={() => handleSort("class")}
                            >
                              Class
                              <ArrowUpDown
                                className={`h-3 w-3 ${
                                  sortField === "class"
                                    ? "text-pink-700"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedAlumni.length > 0 ? (
                          paginatedAlumni.map((alumni, index) => (
                            <TableRow
                              key={alumni.id}
                              className="hover:bg-pink-50"
                            >
                              <TableCell className="font-medium">
                                {startIndex + index + 1}
                              </TableCell>
                              <TableCell className="font-medium">
                                {alumni.name}
                              </TableCell>
                              <TableCell>{alumni.company}</TableCell>
                              <TableCell>{alumni.class}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No results found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2 py-4">
                    <div className="text-xs mt-3 sm:text-sm text-muted-foreground order-2 sm:order-1">
                      Showing {startIndex + 1}-
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredAlumni.length
                      )}{" "}
                      of {filteredAlumni.length} entries
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(totalPages, 3) },
                          (_, i) => {
                            let pageNum = i + 1;

                            // Adjust page numbers for when current page is near the end
                            if (totalPages > 3 && currentPage > 2) {
                              pageNum = currentPage - 2 + i;
                              if (pageNum > totalPages) {
                                return null;
                              }
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                className={`w-8 h-8 sm:w-9 ${
                                  currentPage === pageNum
                                    ? "bg-pink-600 hover:bg-pink-700"
                                    : "border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                                }`}
                                onClick={() => setCurrentPage(pageNum)}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                        {totalPages > 3 && currentPage < totalPages - 1 && (
                          <>
                            {currentPage < totalPages - 2 && (
                              <span className="mx-1">...</span>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 sm:w-9 border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {viewStyle === "table" && (
              <div className="space-y-4 sm:space-y-6 hidden">
                <Card className="border-none shadow-md">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg py-4">
                    <CardTitle className="text-pink-700 text-lg">
                      Alumni Insights
                    </CardTitle>
                    <CardDescription>Statistics and trends</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6">
                    <Tabs defaultValue="class">
                      <TabsList className="grid w-full grid-cols-2 bg-pink-50">
                        <TabsTrigger
                          value="class"
                          className="data-[state=active]:bg-white data-[state=active]:text-pink-700"
                        >
                          Class Distribution
                        </TabsTrigger>
                        <TabsTrigger
                          value="company"
                          className="data-[state=active]:bg-white data-[state=active]:text-pink-700"
                        >
                          Top Companies
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="class" className="pt-4">
                        <div className="space-y-4">
                          {stats.classStats.slice(0, 5).map((stat) => (
                            <div key={stat.year} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Class of {stat.year}</span>
                                <span className="font-medium">
                                  {stat.count} alumni
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                                  style={{
                                    width: `${
                                      (stat.count / alumniData.length) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="company" className="pt-4">
                        <div className="space-y-4">
                          {stats.companyStats.map((stat) => (
                            <div key={stat.company} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span
                                  className="truncate max-w-[180px]"
                                  title={stat.company}
                                >
                                  {stat.company}
                                </span>
                                <span className="font-medium">
                                  {stat.count} alumni
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                                  style={{
                                    width: `${
                                      (stat.count / alumniData.length) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg py-4">
                    <CardTitle className="text-pink-700 text-lg">
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-pink-50 p-4 rounded-lg text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-pink-700">
                          {alumniData.length}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Total Alumni
                        </p>
                      </div>
                      <div className="bg-pink-100 p-4 rounded-lg text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-pink-800">
                          {classYears.length}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Graduation Years
                        </p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-lg text-center col-span-2">
                        <p className="text-2xl sm:text-3xl font-bold text-pink-700">
                          {companies.length}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Different Companies
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
