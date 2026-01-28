import { Movie } from "@/src/types/movie";

interface MovieCardProps {
    movie: Movie;
    onFavouriteToggle?: (movie: Movie) => void;
    isFavourite?: boolean;
}

export default function MovieCard({ movie, onFavouriteToggle, isFavourite }: MovieCardProps) {
    return (
        <div className="movie-card group relative shrink-0 w-48 cursor-pointer">
            <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-gray-800">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 duration-300 flex items-end p-4">
                    <div className="text-white">
                        <h3 className="font-semibold text-sm line-clamp-2">{movie.Title}</h3>
                        <p className="text-xs text-gray-300 mt-1">{movie.Year}</p>
                    </div>
                </div>

                {onFavouriteToggle && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavouriteToggle(movie);
                        }}
                        className="absolute top-2 right-2 bg-black/50 hoved:bg-black/70 rounded-full p-2 transition-all duration-200 z-10"
                        aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    >
                        {isFavourite ? '❤️' : '🤍'}

                    </button>
                )}
            </div>
        </div>
    )
}