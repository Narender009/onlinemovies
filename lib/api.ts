export const IMG_URL = "https://image.tmdb.org/t/p/w500"

// API Functions using Next.js API routes with pagination
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`/api/movies/popular?page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await fetch(`/api/tv/popular?page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching popular TV shows:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getBollywoodMovies = async (page = 1) => {
  try {
    const response = await fetch(`/api/movies/bollywood?page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Bollywood movies:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getBollywoodTVShows = async (page = 1) => {
  try {
    const response = await fetch(`/api/tv/bollywood?page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Bollywood TV shows:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const searchMovies = async (query: string, page = 1) => {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&type=movie&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error searching movies:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const searchTVShows = async (query: string, page = 1) => {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&type=tv&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error searching TV shows:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getGenres = async (type: "movie" | "tv") => {
  try {
    const response = await fetch(`/api/genres?type=${type}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching genres:", error)
    return { genres: [] }
  }
}

export const getMoviesByGenre = async (genreId: number, page = 1) => {
  try {
    const response = await fetch(`/api/movies/genre?genreId=${genreId}&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching movies by genre:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getTVShowsByGenre = async (genreId: number, page = 1) => {
  try {
    const response = await fetch(`/api/tv/genre?genreId=${genreId}&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getBollywoodMoviesByGenre = async (genreId: number, page = 1) => {
  try {
    const response = await fetch(`/api/movies/genre?genreId=${genreId}&bollywood=true&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Bollywood movies by genre:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}

export const getBollywoodTVShowsByGenre = async (genreId: number, page = 1) => {
  try {
    const response = await fetch(`/api/tv/genre?genreId=${genreId}&bollywood=true&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Bollywood TV shows by genre:", error)
    return { results: [], total_pages: 0, page: 1 }
  }
}
