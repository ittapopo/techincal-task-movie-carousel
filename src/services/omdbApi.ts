import axios from "axios";
import { Movie, OMDbSearchResponse } from "../types/movie";

const API_KEY = '2489a68e'// process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';


async function searchMovies(searchTerm: string): Promise<Movie[]> {
    try {
        const { data } = await axios.get<OMDbSearchResponse>(BASE_URL, {
            params: {
                apikey: API_KEY,
                s: searchTerm,
                type: 'movie',
            },
        });

        return data.Search?.filter(movie => movie.Poster !== 'N/A') || [];
    } catch (error) {
        console.error(`Error searching "${searchTerm}":`, error);
        return [];
    }
}

export async function fetchRandoMovies(): Promise<Movie[]> {
    const terms = ['love', 'war', 'time', 'dark', 'ghost', 'king', 'night', 'star'];
    const movies: Movie[] = [];
    const seen = new Set<string>();

    for (const term of terms) {
        const results = await searchMovies(term);

        for (const movie of results) {
            if (!seen.has(movie.imdbID)) {
                seen.add(movie.imdbID);
                movies.push(movie);
                if (movies.length >= 20) {
                    return movies;
                }
            }
        }
    }

    return movies;
}