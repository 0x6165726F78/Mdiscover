// @flow
export type Genre = {
  id: number;
  name: string;
}

export type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
  genre_ids: number[];
  poster_path: string;
  video: boolean | string;
}

export type MoviesData = {
  page: number;
  total_results: number;
  results: Movie[];
}

export type Error = string;

export function isValidMovie (movie: Movie) {
  return !!(
    movie.genre_ids
    && movie.genre_ids.length
    && movie.title
    && movie.vote_average
    && movie.overview
    && movie.poster_path
  )
}