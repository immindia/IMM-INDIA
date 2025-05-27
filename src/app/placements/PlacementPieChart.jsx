"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function PlacementPieChart() {
  const [activeFinalIndex, setActiveFinalIndex] = useState(0);
  const [activeInternIndex, setActiveInternIndex] = useState(0);

  // Data for Final Placements chart
  const finalPlacementsData = [
    { name: "Banking & Finance", value: 14.2, color: "hsl(0, 80%, 60%)" }, // Red
    { name: "Consulting", value: 14.2, color: "hsl(260, 70%, 65%)" }, // Purple
    { name: "EdTech", value: 10.05, color: "hsl(30, 90%, 60%)" }, // Orange
    { name: "FMCG/FMCD", value: 3.55, color: "hsl(280, 70%, 45%)" }, // Dark Purple
    {
      name: "Insurance & Healthcare",
      value: 4.14,
      color: "hsl(200, 80%, 50%)",
    }, // Blue
    { name: "Human Resource", value: 3.55, color: "hsl(320, 70%, 50%)" }, // Pink
    { name: "IT & Telecom", value: 14.2, color: "hsl(180, 60%, 50%)" }, // Teal
    { name: "Manufacturing", value: 8.87, color: "hsl(150, 60%, 40%)" }, // Dark Green
    { name: "Media & Advertising", value: 3.55, color: "hsl(210, 70%, 55%)" }, // Different Blue
    {
      name: "Operation & Supply Chain",
      value: 7.69,
      color: "hsl(120, 50%, 50%)",
    }, // Green
    { name: "Real Estate", value: 4.73, color: "hsl(120, 40%, 60%)" }, // Lighter Green
    { name: "Research", value: 2.95, color: "hsl(126, 50%, 55%)" }, // Slightly different Green
    { name: "Retail", value: 2.36, color: "hsl(45, 85%, 55%)" }, // Yellow-Orange
    { name: "Sports & Energy", value: 2.36, color: "hsl(60, 70%, 50%)" }, // Yellow
    { name: "Travel & Hospitality", value: 3.55, color: "hsl(90, 60%, 50%)" }, // Lime Green
  ];

  // Data for Summer Internships chart
  const summerInternshipsData = [
    { name: "Banking & Finance", value: 14.28, color: "hsl(0, 80%, 60%)" }, // Red
    { name: "Consulting", value: 11.42, color: "hsl(260, 70%, 65%)" }, // Purple
    { name: "E-Commerce", value: 8.57, color: "hsl(220, 80%, 45%)" }, // Dark Blue
    { name: "Edtech", value: 7.14, color: "hsl(30, 90%, 60%)" }, // Orange
    { name: "Fashion", value: 1.42, color: "hsl(150, 60%, 40%)" }, // Dark Green
    { name: "FMCG", value: 5.71, color: "hsl(280, 70%, 45%)" }, // Dark Purple
    { name: "Healthcare", value: 1.42, color: "hsl(200, 80%, 50%)" }, // Blue
    { name: "HR", value: 11.42, color: "hsl(320, 70%, 50%)" }, // Pink
    {
      name: "IT & Telecommunication",
      value: 5.71,
      color: "hsl(180, 60%, 50%)",
    }, // Teal
    { name: "Manufacturing", value: 4.28, color: "hsl(160, 50%, 45%)" }, // Different Dark Green
    { name: "Media & Advertising", value: 7.14, color: "hsl(210, 70%, 55%)" }, // Different Blue
    { name: "NGO", value: 1.42, color: "hsl(120, 50%, 50%)" }, // Green
    { name: "Real Estate", value: 7.14, color: "hsl(120, 40%, 60%)" }, // Lighter Green
    { name: "Research", value: 1.42, color: "hsl(126, 50%, 55%)" }, // Slightly different Green
    { name: "Retail", value: 7.14, color: "hsl(45, 85%, 55%)" }, // Yellow-Orange
    { name: "Travel & Hospitality", value: 4.28, color: "hsl(90, 60%, 50%)" }, // Lime Green
  ];

  // Create chart configs for shadcn ChartContainer
  const finalPlacementsConfig = finalPlacementsData.reduce((acc, item) => {
    acc[item.name.toLowerCase().replace(/\s+/g, "_")] = {
      label: item.name,
      color: item.color,
    };
    return acc;
  }, {});

  const summerInternshipsConfig = summerInternshipsData.reduce((acc, item) => {
    acc[item.name.toLowerCase().replace(/\s+/g, "_")] = {
      label: item.name,
      color: item.color,
    };
    return acc;
  }, {});

  // Active shape renderer for interactive pie chart
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-7}
          textAnchor="middle"
          fill="#333"
          className="text-lg bg-white font-medium"
          style={{ backgroundColor: "white" }}
        >
          {payload.name}
        </text>
        {/* <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-xl font-bold">
          {`${value}%`}
        </text> */}
        <text
          x={cx}
          y={cy}
          dy={30}
          textAnchor="middle"
          fill="#666"
          className="text-sm"
        >
          {/* {`(${(percent * 100).toFixed(1)}% of total)`} */}
          {`(${value}% of total)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 5}
          outerRadius={innerRadius - 2}
          fill={fill}
        />
      </g>
    );
  };

  const handleFinalPieEnter = useCallback((_, index) => {
    setActiveFinalIndex(index);
  }, []);

  const handleInternPieEnter = useCallback((_, index) => {
    setActiveInternIndex(index);
  }, []);

  const handleFinalLegendEnter = useCallback(
    (index) => {
      setActiveFinalIndex(index);
    },
    [setActiveFinalIndex]
  );

  const handleInternLegendEnter = useCallback(
    (index) => {
      setActiveInternIndex(index);
    },
    [setActiveInternIndex]
  );

  return (
    <div className="flex flex-col w-full  mx-auto max-w-7xl pt-4 sm:py-10">
      <div className="bg-gradient-to-r from-[#9c3353] to-[#b23f63] text-white p-6 mx-4 sm:mx-0 text-center mb-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          IMM CORPORATE CONNECT HUB
        </h1>
        <p className="mt-2 text-white/80">
          Sector-wise placement and internship statistics
        </p>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="data">Data Tables</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-center text-[#9c3353]">
                  Final Placements
                </CardTitle>
                <CardDescription className="text-center">
                  Sector-wise percentage breakdown [2022-2024]
                </CardDescription>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent className="pt-1">
                <div className="w-full h-[350px] sm:h-[350px]">
                  <ChartContainer config={finalPlacementsConfig}
                  className='w-full h-full'>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          activeIndex={activeFinalIndex}
                          activeShape={renderActiveShape}
                          data={finalPlacementsData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={window.innerWidth < 768 ? 90 : 100}
                          outerRadius={window.innerWidth < 768 ? 150 : 150}
                          paddingAngle={2}
                          onMouseEnter={handleFinalPieEnter}
                          isAnimationActive={true}
                        >
                          {finalPlacementsData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {finalPlacementsData.map((entry, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center gap-2 text-sm"
                      onMouseEnter={() => handleFinalLegendEnter(index)}
                    >
                      <div
                        className="w-3 h-3 min-w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="truncate">{entry.name}</span>
                      <span className="font-medium">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-center text-[#9c3353]">
                  Summer Internships
                </CardTitle>
                <CardDescription className="text-center">
                  Sector-wise percentage breakdown [2023-2025]
                </CardDescription>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent className="pt-1">
                <div className="w-full h-[350px] sm:h-[350px]">
                  <ChartContainer config={summerInternshipsConfig} className='w-full h-full'>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          activeIndex={activeInternIndex}
                          activeShape={renderActiveShape}
                          data={summerInternshipsData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={window.innerWidth < 768 ? 90 : 100}
                          outerRadius={window.innerWidth < 768 ? 150 : 150}
                          paddingAngle={2}
                          onMouseEnter={handleInternPieEnter}
                          isAnimationActive={true}
                        >
                          {summerInternshipsData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {summerInternshipsData.map((entry, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center gap-2 text-sm"
                      onMouseEnter={() => handleInternLegendEnter(index)}
                    >
                      <div
                        className="w-3 h-3 min-w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="truncate">{entry.name}</span>
                      <span className="font-medium">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#9c3353]">
                  Final Placements Data [2022-2024]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Sector</th>
                        <th className="text-right py-2 px-4">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalPlacementsData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-4 flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {item.name}
                          </td>
                          <td className="text-right py-2 px-4 font-medium">
                            {item.value}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#9c3353]">
                  Summer Internships Data [2023-2025]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Sector</th>
                        <th className="text-right py-2 px-4">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summerInternshipsData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-4 flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {item.name}
                          </td>
                          <td className="text-right py-2 px-4 font-medium">
                            {item.value}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
