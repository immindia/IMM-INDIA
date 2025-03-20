"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

export default function VideoDialog({ videoId, title, thumbnailUrl, className,videoSrc }) {
  const [open, setOpen] = useState(false)

  // Use provided thumbnail or fallback to YouTube's thumbnail
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <>
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div className=" w-full overflow-hidden">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title || "Video thumbnail"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Animated play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-90 transition-all duration-300 group-hover:bg-black/50">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <Play size={30} className="ml-1" fill="currentColor" />

            {/* Animated ring effect */}
            <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-0 group-hover:opacity-100"></span>
          </div>
        </div>

        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 className="font-medium">{title || "Video Title"}</h3>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-w-[90vw] p-0 overflow-hidden rounded-xl border-none shadow-2xl animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200">
          <DialogHeader className="absolute right-4 top-4 z-10">
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-105"
            >
              <X size={18} />
            </button>
          </DialogHeader>

          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className=""
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
