"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ExternalLink, RefreshCw } from "lucide-react"

interface StreamingPlayerProps {
  movieId: number
  type: "movie" | "tv"
  season?: string
  episode?: string
}

export default function StreamingPlayer({ movieId, type, season, episode }: StreamingPlayerProps) {
  const [activeServer, setActiveServer] = useState("server1")
  const [iframeError, setIframeError] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  const getStreamingURL = (server: string) => {
    const isTV = type === "tv"
    const id = movieId

    if (isTV && season && episode) {
      switch (server) {
        case "server1":
          return `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`
        case "server2":
          return `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
        case "server3":
          return `https://vidsrc.xyz/embed/tv/${id}?s=${season}&e=${episode}`
        default:
          return `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`
      }
    } else {
      switch (server) {
        case "server1":
          return `https://player.smashy.stream/movie/${id}`
        case "server2":
          return `https://multiembed.mov/?video_id=${id}&tmdb=1`
        case "server3":
          return `https://vidsrc.xyz/embed/movie/${id}`
        default:
          return `https://player.smashy.stream/movie/${id}`
      }
    }
  }

  const handleServerChange = (server: string) => {
    setActiveServer(server)
    setIframeError(false)
    setIframeKey((prev) => prev + 1) // Force iframe reload
  }

  const handleIframeError = () => {
    setIframeError(true)
  }

  const refreshPlayer = () => {
    setIframeError(false)
    setIframeKey((prev) => prev + 1)
  }

  const openInNewTab = () => {
    window.open(getStreamingURL(activeServer), "_blank")
  }

  return (
    <div className="w-full">
      <Tabs value={activeServer} onValueChange={handleServerChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-4">
          <TabsTrigger value="server1" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
            Smashy
          </TabsTrigger>
          <TabsTrigger value="server2" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
            MultiEmbed
          </TabsTrigger>
          <TabsTrigger value="server3" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
            VidSrc
          </TabsTrigger>
        </TabsList>

        {iframeError && (
          <Alert className="mb-4 bg-yellow-900/20 border-yellow-900/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              Video failed to load. Try switching servers or opening in a new tab.
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button onClick={refreshPlayer} variant="outline" size="sm" className="h-8 text-xs">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
                <Button onClick={openInNewTab} variant="outline" size="sm" className="h-8 text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open in New Tab
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {["server1", "server2", "server3"].map((server) => (
          <TabsContent key={server} value={server}>
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              {!iframeError && (
                <iframe
                  key={`${server}-${iframeKey}`}
                  src={getStreamingURL(server)}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  title={`Streaming Player - ${server}`}
                  onError={handleIframeError}
                  onLoad={() => setIframeError(false)}
                />
              )}
              {iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center text-gray-400 p-4">
                    <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4" />
                    <p className="mb-4 text-sm sm:text-base">Failed to load video player</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button onClick={refreshPlayer} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                      <Button onClick={openInNewTab} variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-center text-gray-400 text-xs sm:text-sm">
            <p>If the video doesn't load, try switching to a different server.</p>
          </div>
          <Button onClick={openInNewTab} variant="outline" size="sm" className="w-full sm:w-auto">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center break-all">
          <p className="hidden sm:block">Current URL: {getStreamingURL(activeServer)}</p>
        </div>
      </div>
    </div>
  )
}
