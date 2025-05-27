"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
  getGenres,
  getMoviesByGenre,
  getTVShowsByGenre,
  getBollywoodMoviesByGenre,
  getBollywoodTVShowsByGenre,
} from "@/lib/api"

interface Genre {
  id: number
  name: string
}

interface GenreFilterProps {
  type: "movie" | "tv" | "bollywood-movie" | "bollywood-tv"
  onGenreSelect: (results: any[]) => void
}

export default function GenreFilter({ type, onGenreSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGenres()
  }, [type])

  const loadGenres = async () => {
    try {
      setError(null)
      const genreType = type.includes("movie") ? "movie" : "tv"
      const data = await getGenres(genreType)

      if (data.error) {
        setError(data.error)
        return
      }

      setGenres(data.genres || [])
    } catch (error) {
      console.error("Error loading genres:", error)
      setError("Failed to load genres. Please try again later.")
    }
  }

  const handleGenreSelect = async (genreId: number) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null)
      return
    }

    setSelectedGenre(genreId)
    setLoading(true)
    setError(null)

    try {
      let data
      switch (type) {
        case "movie":
          data = await getMoviesByGenre(genreId)
          break
        case "tv":
          data = await getTVShowsByGenre(genreId)
          break
        case "bollywood-movie":
          data = await getBollywoodMoviesByGenre(genreId)
          break
        case "bollywood-tv":
          data = await getBollywoodTVShowsByGenre(genreId)
          break
        default:
          data = { results: [] }
      }

      if (data.error) {
        setError(data.error)
        return
      }

      onGenreSelect(data.results || [])
    } catch (error) {
      console.error("Error loading content by genre:", error)
      setError("Failed to load content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-900/50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-red-200">
          {error}
          <Button onClick={loadGenres} variant="outline" size="sm" className="ml-2 h-6 text-xs">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (genres.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold">Filter by Genre</h3>
        <div className="text-gray-400 text-sm">Loading genres...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold">Filter by Genre</h3>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleGenreSelect(genre.id)}
            disabled={loading}
            className={`text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8 bg-red-600 ${
              selectedGenre === genre.id ? "bg-red-600 hover:bg-red-700" : ""
            }`}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      {loading && <div className="text-center text-gray-400 text-sm">Loading...</div>}
    </div>
  )
}
