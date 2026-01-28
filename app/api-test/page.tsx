'use client'

import { fetchRandoMovies } from "@/src/services/omdbApi";
import { Movie } from "@/src/types/movie";
import { useEffect, useState } from "react";

export default function ApiTest() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRandoMovies().then(data => {
            setMovies(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                Loading...
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">{movies.length} Movies Loaded</h1>
            <div className="grid grid-cols-4 gap-4">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="border p-2">
                        <img src={movie.Poster} alt={movie.Title} className="w-full" />
                        <p className="mt-2 text-sm">{movie.Title}</p>
                        <p className="text-xs text-gray-500">{movie.Year}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}