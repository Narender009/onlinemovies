"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StreamingPlayer from "@/components/streaming-player"
import { IMG_URL } from "@/lib/api"

interface TVShow {
  id: number
  name: string
  poster_path: string
  overview: string
  first_air_date: string
  vote_average: number
  genre_ids: number[]
}

interface TVCardProps {
  show: TVShow
}

export default function TVCard({ show }: TVCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState("1")
  const [selectedEpisode, setSelectedEpisode] = useState("1")

  const posterUrl = show.poster_path ? `${IMG_URL}${show.poster_path}` : "/placeholder.svg?height=400&width=300"

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        <div className="relative">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={show.name}
            width={300}
            height={400}
            className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={() => setShowDetails(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
              size="sm"
            >
              View Details
            </Button>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-xs sm:text-sm mb-2 line-clamp-2 leading-tight">{show.name}</h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{show.first_air_date?.split("-")[0]}</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span>{show.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold pr-8">{show.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="order-2 md:order-1">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={show.name}
                width={300}
                height={400}
                className="w-full max-w-sm mx-auto md:max-w-none rounded-lg"
              />
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Badge variant="secondary" className="text-xs">
                  {show.first_air_date?.split("-")[0]}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{show.vote_average?.toFixed(1)}/10</span>
                </div>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{show.overview}</p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Season</label>
                    <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)} className="text-xs">
                            Season {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Episode</label>
                    <Select value={selectedEpisode} onValueChange={setSelectedEpisode}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)} className="text-xs">
                            Episode {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowPlayer(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-sm sm:text-base"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPlayer} onOpenChange={setShowPlayer}>
        <DialogContent className="bg-black border-gray-700 max-w-[95vw] sm:max-w-6xl max-h-[90vh] p-2 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-white text-sm sm:text-base">
              {show.name} - S{selectedSeason}E{selectedEpisode}
            </DialogTitle>
          </DialogHeader>
          <StreamingPlayer movieId={show.id} type="tv" season={selectedSeason} episode={selectedEpisode} />
        </DialogContent>
      </Dialog>
    </>
  )
}
