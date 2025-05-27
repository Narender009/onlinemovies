import { NextResponse } from "next/server"

const API_KEY = "a306f6ab5d09bef9530951ee7289f8be"
const BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"

    const response = await fetch(
      `${BASE_URL}/discover/movie?with_original_language=hi&sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`,
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
    console.error("Error fetching Bollywood movies:", error)
    return NextResponse.json({ error: "Failed to fetch Bollywood movies" }, { status: 500 })
  }
}
