"use client"

import { useState, useEffect } from "react"
import { Search, Film, Tv, Globe, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import MovieCard from "@/components/movie-card"
import TVCard from "@/components/tv-card"
import GenreFilter from "@/components/genre-filter"
import Pagination from "@/components/pagination"
import {
  getPopularMovies,
  getPopularTVShows,
  getBollywoodMovies,
  getBollywoodTVShows,
  searchMovies,
  searchTVShows,
} from "@/lib/api"

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [tvShows, setTVShows] = useState([])
  const [bollywoodMovies, setBollywoodMovies] = useState([])
  const [bollywoodTVShows, setBollywoodTVShows] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState({ movies: [], tvShows: [] })
  const [activeTab, setActiveTab] = useState("movies")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState({
    movies: 1,
    tv: 1,
    bollywoodMovies: 1,
    bollywoodTV: 1,
    searchMovies: 1,
    searchTV: 1,
  })
  const [totalPages, setTotalPages] = useState({
    movies: 1,
    tv: 1,
    bollywoodMovies: 1,
    bollywoodTV: 1,
    searchMovies: 1,
    searchTV: 1,
  })
  const [paginationLoading, setPaginationLoading] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [moviesData, tvData, bollywoodMoviesData, bollywoodTVData] = await Promise.all([
        getPopularMovies(1),
        getPopularTVShows(1),
        getBollywoodMovies(1),
        getBollywoodTVShows(1),
      ])

      if (moviesData.error || tvData.error || bollywoodMoviesData.error || bollywoodTVData.error) {
        setError("Some content failed to load. Please refresh the page.")
      }

      setMovies(moviesData.results || [])
      setTVShows(tvData.results || [])
      setBollywoodMovies(bollywoodMoviesData.results || [])
      setBollywoodTVShows(bollywoodTVData.results || [])

      setTotalPages({
        movies: moviesData.total_pages || 1,
        tv: tvData.total_pages || 1,
        bollywoodMovies: bollywoodMoviesData.total_pages || 1,
        bollywoodTV: bollywoodTVData.total_pages || 1,
        searchMovies: 1,
        searchTV: 1,
      })
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Failed to load content. Please check your internet connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (page: number, type: string) => {
    setPaginationLoading(true)
    try {
      let data
      switch (type) {
        case "movies":
          data = await getPopularMovies(page)
          setMovies(data.results || [])
          break
        case "tv":
          data = await getPopularTVShows(page)
          setTVShows(data.results || [])
          break
        case "bollywoodMovies":
          data = await getBollywoodMovies(page)
          setBollywoodMovies(data.results || [])
          break
        case "bollywoodTV":
          data = await getBollywoodTVShows(page)
          setBollywoodTVShows(data.results || [])
          break
        case "searchMovies":
          data = await searchMovies(searchQuery, page)
          setSearchResults((prev) => ({ ...prev, movies: data.results || [] }))
          break
        case "searchTV":
          data = await searchTVShows(searchQuery, page)
          setSearchResults((prev) => ({ ...prev, tvShows: data.results || [] }))
          break
      }

      setCurrentPage((prev) => ({ ...prev, [type]: page }))

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Error loading page:", error)
    } finally {
      setPaginationLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setError(null)
      const [movieResults, tvResults] = await Promise.all([searchMovies(searchQuery, 1), searchTVShows(searchQuery, 1)])

      if (movieResults.error || tvResults.error) {
        setError("Search failed. Please try again.")
        return
      }

      setSearchResults({
        movies: movieResults.results || [],
        tvShows: tvResults.results || [],
      })

      setTotalPages((prev) => ({
        ...prev,
        searchMovies: movieResults.total_pages || 1,
        searchTV: tvResults.total_pages || 1,
      }))

      setCurrentPage((prev) => ({
        ...prev,
        searchMovies: 1,
        searchTV: 1,
      }))
    } catch (error) {
      console.error("Error searching:", error)
      setError("Search failed. Please try again.")
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults({ movies: [], tvShows: [] })
    setError(null)
    setCurrentPage((prev) => ({
      ...prev,
      searchMovies: 1,
      searchTV: 1,
    }))
  }

  const TabNavigation = () => (
    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-800 mb-6 sm:mb-8 h-auto">
      <TabsTrigger value="movies" className="data-[state=active]:bg-red-600 text-xs sm:text-sm p-2 sm:p-3">
        <Film className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Movies</span>
        <span className="sm:hidden">Movies</span>
      </TabsTrigger>
      <TabsTrigger value="tv" className="data-[state=active]:bg-red-600 text-xs sm:text-sm p-2 sm:p-3">
        <Tv className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">TV Shows</span>
        <span className="sm:hidden">TV</span>
      </TabsTrigger>
      <TabsTrigger value="bollywood-movies" className="data-[state=active]:bg-red-600 text-xs sm:text-sm p-2 sm:p-3">
        <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Bollywood Movies</span>
        <span className="sm:hidden">B-Movies</span>
      </TabsTrigger>
      <TabsTrigger value="bollywood-tv" className="data-[state=active]:bg-red-600 text-xs sm:text-sm p-2 sm:p-3">
        <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Bollywood TV</span>
        <span className="sm:hidden">B-TV</span>
      </TabsTrigger>
    </TabsList>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-white text-lg sm:text-xl text-center">Loading MovieStream...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              <h1 className="text-xl sm:text-3xl font-bold">MovieStream</h1>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search movies and TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm sm:text-base"
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-3 sm:px-4">
              <Search className="h-4 w-4" />
            </Button>
            {searchQuery && (
              <Button type="button" onClick={clearSearch} variant="outline" className="px-3 sm:px-4 text-xs sm:text-sm bg-red-600">
                Clear
              </Button>
            )}
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-4 sm:mb-6 bg-red-900/20 border-red-900/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200 text-sm">
              {error}
              <Button onClick={loadInitialData} variant="outline" size="sm" className="ml-2 h-6 text-xs">
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Search Results */}
        {searchQuery && (searchResults.movies.length > 0 || searchResults.tvShows.length > 0) && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Search Results for "{searchQuery}"</h2>
            <Tabs defaultValue="movies" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-4">
                <TabsTrigger value="movies" className="data-[state=active]:bg-red-600 text-sm">
                  Movies ({searchResults.movies.length})
                </TabsTrigger>
                <TabsTrigger value="tv" className="data-[state=active]:bg-red-600 text-sm">
                  TV Shows ({searchResults.tvShows.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="movies">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {searchResults.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage.searchMovies}
                  totalPages={totalPages.searchMovies}
                  onPageChange={(page) => handlePageChange(page, "searchMovies")}
                  loading={paginationLoading}
                />
              </TabsContent>
              <TabsContent value="tv">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {searchResults.tvShows.map((show) => (
                    <TVCard key={show.id} show={show} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage.searchTV}
                  totalPages={totalPages.searchTV}
                  onPageChange={(page) => handlePageChange(page, "searchTV")}
                  loading={paginationLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Main Content */}
        {!searchQuery && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabNavigation />

            <TabsContent value="movies">
              <div className="space-y-6 sm:space-y-8">
                <GenreFilter type="movie" onGenreSelect={(movies) => setMovies(movies)} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Movies</h2>
                  {movies.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                        {movies.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                      <Pagination
                        currentPage={currentPage.movies}
                        totalPages={totalPages.movies}
                        onPageChange={(page) => handlePageChange(page, "movies")}
                        loading={paginationLoading}
                      />
                    </>
                  ) : (
                    <div className="text-center text-gray-400 py-8 text-sm sm:text-base">
                      No movies found. Please try refreshing the page.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tv">
              <div className="space-y-6 sm:space-y-8">
                <GenreFilter type="tv" onGenreSelect={(shows) => setTVShows(shows)} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular TV Shows</h2>
                  {tvShows.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                        {tvShows.map((show) => (
                          <TVCard key={show.id} show={show} />
                        ))}
                      </div>
                      <Pagination
                        currentPage={currentPage.tv}
                        totalPages={totalPages.tv}
                        onPageChange={(page) => handlePageChange(page, "tv")}
                        loading={paginationLoading}
                      />
                    </>
                  ) : (
                    <div className="text-center text-gray-400 py-8 text-sm sm:text-base">
                      No TV shows found. Please try refreshing the page.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bollywood-movies">
              <div className="space-y-6 sm:space-y-8">
                <GenreFilter type="bollywood-movie" onGenreSelect={(movies) => setBollywoodMovies(movies)} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Bollywood Movies</h2>
                  {bollywoodMovies.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                        {bollywoodMovies.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                      <Pagination
                        currentPage={currentPage.bollywoodMovies}
                        totalPages={totalPages.bollywoodMovies}
                        onPageChange={(page) => handlePageChange(page, "bollywoodMovies")}
                        loading={paginationLoading}
                      />
                    </>
                  ) : (
                    <div className="text-center text-gray-400 py-8 text-sm sm:text-base">
                      No Bollywood movies found. Please try refreshing the page.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bollywood-tv">
              <div className="space-y-6 sm:space-y-8">
                <GenreFilter type="bollywood-tv" onGenreSelect={(shows) => setBollywoodTVShows(shows)} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Bollywood TV Shows</h2>
                  {bollywoodTVShows.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                        {bollywoodTVShows.map((show) => (
                          <TVCard key={show.id} show={show} />
                        ))}
                      </div>
                      <Pagination
                        currentPage={currentPage.bollywoodTV}
                        totalPages={totalPages.bollywoodTV}
                        onPageChange={(page) => handlePageChange(page, "bollywoodTV")}
                        loading={paginationLoading}
                      />
                    </>
                  ) : (
                    <div className="text-center text-gray-400 py-8 text-sm sm:text-base">
                      No Bollywood TV shows found. Please try refreshing the page.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
