'us eclient';

import { useEffect, useState } from "react";
import { Movie } from "../types/movie";

const STORAGE_KEY = 'movie-favourites';

export function useFavourites() {
    const [favourites, setFavourites] = useState<Movie[]>([]);
    const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed: Movie[] = JSON.parse(stored);
                setFavourites(parsed); // yolo
                setFavouriteIds(new Set(parsed.map(m => m.imdbID)));
            } catch (error) {
                console.log('Error loading favourites:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (favourites.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [favourites]);

    const toggleFavourite = (movie: Movie) => {
        setFavourites(prev => {
            const exists = prev.find(m => m.imdbID === movie.imdbID);

            if (exists) {
                const updated = prev.filter(m => m.imdbID !== movie.imdbID);
                setFavouriteIds(new Set(updated.map(m => m.imdbID)));
                return updated;
            } else {
                const updated = [...prev, movie];
                setFavouriteIds(new Set(updated.map(m => m.imdbID)));
                return updated;
            }
        });
    };

    const clearAllFavourites = () => {
        if (confirm('Are you sure you want to clear all favourites?')) {
            setFavourites([]);
            setFavouriteIds(new Set());
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return {
        favourites,
        favouriteIds,
        toggleFavourite,
        clearAllFavourites
    }
}