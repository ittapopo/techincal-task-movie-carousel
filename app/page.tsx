'use client'

import Carousel from "@/src/components/Carousel/Carousel";
import { useFavourites } from "@/src/hooks/useFavourites";
import { fetchRandoMovies } from "@/src/services/omdbApi";
import { Movie } from "@/src/types/movie";
import { useEffect, useState } from "react"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { favourites, favouriteIds, toggleFavourite, clearAllFavourites } = useFavourites();

  const loadMovies = async () => {
    setLoading(true);
    const data = await fetchRandoMovies();
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies(); // yolo
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="px-4 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Movie Carousel</h1>
        <p className="text-gray-400">Drag to scroll, click ❤️ to favourite</p>
      </div>

      {favourites.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-2xl font-bold text-white">My Favourites</h2>
            <button
              onClick={clearAllFavourites}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
              Clear all
            </button>
          </div>
          <Carousel
            movies={favourites}
            onFavouriteToggle={toggleFavourite}
            favouriteIds={favouriteIds}
          />
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-2xl font-bold text-white">All Movies</h2>
          <button
            onClick={loadMovies}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
          >
            Generate New Movies
          </button>
        </div>
        <Carousel
          movies={movies}
          onFavouriteToggle={toggleFavourite}
          favouriteIds={favouriteIds}
        />
      </div>
    </main>
  )
}