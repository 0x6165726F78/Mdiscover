import { THE_MOVIE_DB_API_KEY } from './env';

const API_BASE_PATH = 'https://api.themoviedb.org/3'

export const ApiPaths = {
  'mostPopularMovies':        `${API_BASE_PATH}/discover/movie?sort_by=popularity.desc&api_key=${THE_MOVIE_DB_API_KEY}&include_adult=false&include_video=true`,
  'topRatedMovies':           `${API_BASE_PATH}/discover/movie?sort_by=vote_average.desc&api_key=${THE_MOVIE_DB_API_KEY}&include_adult=false&include_video=true`,
  'bestMoviesYear':           `${API_BASE_PATH}/discover/movie?sort_by=vote_average&primary_release_year=2017&api_key=${THE_MOVIE_DB_API_KEY}&include_adult=false&include_video=true`,
  'imagesBase':               'https://image.tmdb.org/t/p/w342/',
  'searchResultsMovies':      (query) => `${API_BASE_PATH}/search/movie?api_key=${THE_MOVIE_DB_API_KEY}&query=${query}&page=1&include_adult=false`,
  'moviePath':                (id) => `${API_BASE_PATH}/movie/${id}?api_key=${THE_MOVIE_DB_API_KEY}`,
}