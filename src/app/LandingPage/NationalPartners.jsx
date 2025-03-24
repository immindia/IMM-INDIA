/* eslint-disable react/prop-types */
import { useState } from "react"
// import img from "next/img"
import { motion } from "framer-motion"
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NationalPartners({ partners, isLoaded }) {
  const [openDialog, setOpenDialog] = useState(null)

  return (
    <section>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">National Partners</h2>
        <div className="mt-2 h-1 w-20 bg-white/80"></div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
          >
            <Card className="group h-full overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
              <CardContent className="p-0">
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-slate-100 p-6 dark:bg-slate-700">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      
                      className="object-contain"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="mb-2 font-semibold">{partner.name}</h3>
                  <Badge variant="outline" className="mb-4 w-fit bg-primary/10 text-primary dark:bg-primary/20">
                    {partner.category}
                  </Badge>

                  <Dialog
                    open={openDialog === partner.id}
                    onOpenChange={(open) => setOpenDialog(open ? partner.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-auto group w-full">
                        Read More
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-slate-100 p-2 dark:bg-slate-700">
                            <img
                              src={partner.logo || "/placeholder.svg"}
                              alt={`${partner.name} logo`}
                              
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <DialogTitle className="text-xl">{partner.name}</DialogTitle>
                            <DialogDescription>
                              <Badge variant="outline" className="mt-1 bg-primary/10 text-primary dark:bg-primary/20">
                                {partner.category}
                              </Badge>
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>

                      <div className="mt-4 grid gap-6">
                        <div>
                          <h4 className="mb-2 font-medium">About</h4>
                          <p className="text-sm text-muted-foreground">{partner.fullDescription}</p>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Partnership Details</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="h-6">
                                Established
                              </Badge>
                              <span>{partner.established}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{partner.location}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Contact Information</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{partner.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{partner.contactPhone}</span>
                            </div>
                          </div>
                        </div>

                        {partner.projects && partner.projects.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-medium">Joint Projects</h4>
                            <div className="grid gap-3">
                              {partner.projects.map((project, idx) => (
                                <div key={idx} className="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                                  <h5 className="font-medium">{project.name}</h5>
                                  <p className="text-sm text-muted-foreground">{project.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button asChild className="mt-2 w-full">
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center"
                          >
                            Visit Website
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
