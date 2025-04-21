"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function PlacementPieChart() {
  const [activeFinalIndex, setActiveFinalIndex] = useState(0)
  const [activeInternIndex, setActiveInternIndex] = useState(0)

  // Data for Final Placements chart
  const finalPlacementsData = [
    { name: "Consulting", value: 21, color: "hsl(262, 80%, 50%)" },
    { name: "Banking & Finance", value: 20.5, color: "hsl(220, 70%, 50%)" },
    { name: "Ecommerce", value: 20.1, color: "hsl(190, 90%, 40%)" },
    { name: "Manufacturing", value: 12.9, color: "hsl(150, 60%, 40%)" },
    { name: "Others", value: 5.3, color: "hsl(280, 50%, 60%)" },
    { name: "Conglomerate", value: 4.6, color: "hsl(320, 70%, 50%)" },
    { name: "IT", value: 4.7, color: "hsl(200, 80%, 50%)" },
    { name: "Retail", value: 4.7, color: "hsl(30, 90%, 60%)" },
    { name: "Healthcare", value: 3.7, color: "hsl(340, 80%, 65%)" },
    { name: "Telecom", value: 2.9, color: "hsl(170, 70%, 45%)" },
  ]

  // Data for Summer Internships chart
  const summerInternshipsData = [
    { name: "Ecommerce", value: 31.2, color: "hsl(0, 80%, 60%)" },
    { name: "Consulting", value: 18.4, color: "hsl(260, 70%, 65%)" },
    { name: "Finance", value: 9.7, color: "hsl(220, 80%, 45%)" },
    { name: "Retail", value: 8.4, color: "hsl(30, 90%, 60%)" },
    { name: "Sports", value: 6.7, color: "hsl(120, 50%, 50%)" },
    { name: "Manufacturing", value: 6.7, color: "hsl(150, 60%, 40%)" },
    { name: "FMCG", value: 6.7, color: "hsl(280, 70%, 45%)" },
    { name: "Automobiles", value: 2.1, color: "hsl(200, 80%, 50%)" },
    { name: "Conglomerate", value: 1.7, color: "hsl(320, 70%, 50%)" },
    { name: "Supply Chain & Logistics", value: 8.4, color: "hsl(180, 60%, 50%)" },
  ]

  // Create chart configs for shadcn ChartContainer
  const finalPlacementsConfig = finalPlacementsData.reduce((acc, item) => {
    acc[item.name.toLowerCase().replace(/\s+/g, "_")] = {
      label: item.name,
      color: item.color,
    }
    return acc
  }, {})

  const summerInternshipsConfig = summerInternshipsData.reduce((acc, item) => {
    acc[item.name.toLowerCase().replace(/\s+/g, "_")] = {
      label: item.name,
      color: item.color,
    }
    return acc
  }, {})

  // Active shape renderer for interactive pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-lg bg-white font-medium" style={{ backgroundColor: 'white' }}>
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-xl font-bold">
          {`${value}%`}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#666" className="text-sm">
          {`(${(percent * 100).toFixed(1)}% of total)`}
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
    )
  }

  return (
    <div className="flex flex-col w-full  mx-auto max-w-7xl pt-4 sm:py-10">
      <div className="bg-gradient-to-r from-[#9c3353] to-[#b23f63] text-white p-6 mx-4 sm:mx-0 text-center mb-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">IMM CORPORATE RESOURCE CENTRE</h1>
        <p className="mt-2 text-white/80">Sector-wise placement and internship statistics</p>
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
                <CardTitle className="text-xl text-center text-[#9c3353]">Final Placements</CardTitle>
                <CardDescription className="text-center">Sector-wise percentage breakdown [2022-2024]</CardDescription>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-[350px] sm:h-[450px] grid justify-center ">
                  <ChartContainer config={finalPlacementsConfig}>
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
                          innerRadius={100}
                          outerRadius={150}
                          paddingAngle={2}
                          onMouseEnter={(_, index) => setActiveFinalIndex(index)}
                        >
                          {finalPlacementsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
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
                      onMouseEnter={() => setActiveFinalIndex(index)}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="truncate">{entry.name}</span>
                      <span className="font-medium">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-center text-[#9c3353]">Summer Internships</CardTitle>
                <CardDescription className="text-center">Sector-wise percentage breakdown [2023-2025]</CardDescription>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-[350px] sm:h-[450px] grid justify-center ">
                  <ChartContainer config={summerInternshipsConfig}>
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
                          innerRadius={100}
                          outerRadius={150}
                          paddingAngle={2}
                          onMouseEnter={(_, index) => setActiveInternIndex(index)}
                        >
                          {summerInternshipsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
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
                      onMouseEnter={() => setActiveInternIndex(index)}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
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
                <CardTitle className="text-xl text-[#9c3353]">Final Placements Data [2022-2024]</CardTitle>
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
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            {item.name}
                          </td>
                          <td className="text-right py-2 px-4 font-medium">{item.value}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#9c3353]">Summer Internships Data [2023-2025]</CardTitle>
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
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            {item.name}
                          </td>
                          <td className="text-right py-2 px-4 font-medium">{item.value}%</td>
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
  )
}
