import { NextResponse } from "next/server"

const API_KEY = "a306f6ab5d09bef9530951ee7289f8be"
const BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const genreId = searchParams.get("genreId")
    const bollywood = searchParams.get("bollywood") === "true"
    const page = searchParams.get("page") || "1"

    if (!genreId) {
      return NextResponse.json({ error: "Genre ID is required" }, { status: 400 })
    }

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`

    if (bollywood) {
      url += "&with_original_language=hi"
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching movies by genre:", error)
    return NextResponse.json({ error: "Failed to fetch movies by genre" }, { status: 500 })
  }
}
