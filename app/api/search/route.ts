import { NextResponse } from "next/server"

const API_KEY = "a306f6ab5d09bef9530951ee7289f8be"
const BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const type = searchParams.get("type") || "movie"
    const page = searchParams.get("page") || "1"

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const response = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}
