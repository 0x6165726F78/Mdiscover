// @flow
import { createSelector } from 'reselect';
import type { Movie } from './moviesModels';
import {
  type MoviesActions,
  FETCH_MOVIE, FETCH_COMPLETE_MOVIE, FETCH_FAIL_MOVIE,
  ADD_FAVOURITE_MOVIE, DELETE_FAVOURITE_MOVIE, CLEAR_FAVOURITE_MOVIES,
  FETCH_MOVIES, FETCH_COMPLETE_MOVIES, FETCH_FAIL_MOVIES,
  RESET_SEARCH_RESULTS
} from './moviesActions';

export type State =  {
  ids: number[],
  entities: { [id: string]: Movie },

  searchResultsMovies: number[],
  favouriteMovies: number[],

  mostPopularMovies: number[],
  topRatedMovies: number[],
  bestMoviesYear: number[],

  loadingMovies: boolean,
  loadingMovie: boolean,
  error: null | string,
}

const initialState: State  = {
  ids: [],
  entities: {},

  searchResultsMovies: [],
  favouriteMovies: [],

  mostPopularMovies: [],
  topRatedMovies: [],
  bestMoviesYear: [],

  loadingMovies: true,
  loadingMovie: false,
  error: null,
};

export function reducer (state: State = initialState, action: MoviesActions) {
  switch (action.type) {
    case FETCH_MOVIE: {
      const newState: State = {
        ...state,
        loadingMovie: true,
      };

      return newState;
    }

    case FETCH_COMPLETE_MOVIE: {
      const movie: Movie = action.payload;

      const newState: State = {
        ...state,
        entities: { ...state.entities, [movie.id]: movie },
        loadingMovie:  false,
      };

      return newState;
    }

    case FETCH_FAIL_MOVIE: {
      const newState: State = {
        ...state,
        error: action.payload,
        loadingMovie: false,
      };

      return newState;
    }

    case ADD_FAVOURITE_MOVIE: {
      if (state.favouriteMovies.indexOf(action.id) > -1) {
        return state;
      }

      const newState: State = {
        ...state,
        favouriteMovies: [...state.favouriteMovies, action.id]
      };

      return newState;
    }

    case DELETE_FAVOURITE_MOVIE: {
      const newFavouriteMovies = state.favouriteMovies.filter((id: number) => id !== action.id);

      const newState: State = {
        ...state,
        favouriteMovies: newFavouriteMovies
      };

      return newState;
    }

    case CLEAR_FAVOURITE_MOVIES: {
      const newState: State = {
        ...state,
        favouriteMovies: [],
      };

      return newState;
    }

    case FETCH_MOVIES: {
      const newState: State = {
        ...state,
        loadingMovies: true,
      };

      return newState;
    }

    case FETCH_COMPLETE_MOVIES: {
      const movies: Movie[] = action.payload.results;
      const allIds = movies.map(({ id }) => id);

      const newMovies = movies.filter((movie: Movie) => !state.entities[String(movie.id)]);
      const newMoviesIds = newMovies.map(({ id }) => id);
      const newMoviesEntities = newMovies.reduce((entities: { [id:string]: Movie }, movie: Movie) => {
        return { ...entities, [movie.id]: movie };
      }, {});

      const newState: State = {
        ...state,
        ids: [...state.ids, ...newMoviesIds],
        [action.path]: [...allIds],
        entities: { ...state.entities, ...newMoviesEntities },
        loadingMovies: false,
      };

      return newState;
    }

    case FETCH_FAIL_MOVIES: {
      const newState: State = {
        ...state,
        error: action.payload,
        loadingMovies: false,
      };

      return newState;
    }

    case RESET_SEARCH_RESULTS: {
      const newState: State = {
        ...state,
        searchResultsMovies: [],
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}

/* UTIL */
export const extractMovies = (entities: { [key: string]: Movie}, ids: number[]) => ids.map(id => entities[String(id)]);

/* SELECTORS */
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getSearchResultsMoviesIds = (state: State) => state.searchResultsMovies
export const getFavouriteMoviesIds = (state: State) => state.favouriteMovies;
export const getSearchResultsMovies = createSelector(getEntities, getSearchResultsMoviesIds, extractMovies);
export const getFavouriteMovies = createSelector(getEntities, getFavouriteMoviesIds, extractMovies)

export const getMostPopularMoviesIds = (state: State) => state.mostPopularMovies;
export const getTopRatedMoviesIds = (state: State) => state.topRatedMovies;
export const getBestMoviesYearIds = (state: State) => state.bestMoviesYear;
export const getMostPopularMovies = createSelector(getEntities, getMostPopularMoviesIds, extractMovies)
export const getTopRatedMovies = createSelector(getEntities, getTopRatedMoviesIds, extractMovies)
export const getBestMoviesYear = createSelector(getEntities, getBestMoviesYearIds, extractMovies)

export const getLoadingMovies = (state: State) => state.loadingMovies;
export const getLoadingMovie = (state: State) => state.loadingMovie;

export const getBootstraped = createSelector(
  getMostPopularMoviesIds, getTopRatedMoviesIds, getBestMoviesYearIds,
  (mostPopularMoviesIds, topRatedMoviesIds, bestMoviesYearIds) =>
    Boolean(mostPopularMoviesIds.length && topRatedMoviesIds.length && bestMoviesYearIds.length)
)