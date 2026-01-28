'use client'

import { useDragScroll } from "@/src/hooks/useDragScroll";
import { Movie } from "@/src/types/movie";
import MovieCard from "./MovieCard";

interface CarouselProps {
    movies: Movie[];
    title?: string;
    onFavouriteToggle?: (movie: Movie) => void;
    favouriteIds?: Set<string>;
}

export default function Carousel({
    movies,
    title,
    onFavouriteToggle,
    favouriteIds
}: CarouselProps) {
    const {
        scrollRef,
        isDragging,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        handleMouseLeave
    } = useDragScroll();

    if (movies.length === 0) {
        return null;
    }

    return (
        <div className="carousel-container mb-8">
            {title && (
                <h2 className="text-2xl font-bold text-white mb-4 px-4">{title}</h2>
            )}

            <div
                ref={scrollRef}
                className="carousel-scroll flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide cursor-grab select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    scrollBehavior: isDragging ? 'auto' : 'smooth'
                }}
            >
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        onFavouriteToggle={onFavouriteToggle}
                        isFavourite={favouriteIds?.has(movie.imdbID)}
                    />
                ))}
            </div>
        </div>
    );
}