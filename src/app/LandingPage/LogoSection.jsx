/* eslint-disable react/prop-types */

import { Card, CardContent } from "@/components/ui/card"



export function LogoSection({ title, partners }) {
  return (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        <div className="mt-2 h-1 w-20 bg-primary"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex h-32 items-center justify-center p-4">
              <div className="relative h-full w-full">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="object-contain p-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

