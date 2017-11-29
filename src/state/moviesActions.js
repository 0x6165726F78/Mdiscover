// @flow
import type { MoviesData, Movie, Error } from './moviesModels';

export const FETCH_MOVIE =             '[Movies] Fetch Movie details'
export const FETCH_COMPLETE_MOVIE =    '[Movies] Fetch Movie details Complete'
export const FETCH_FAIL_MOVIE =        '[Movies] Fetch Movie details Failed'

export const ADD_FAVOURITE_MOVIE =     '[Movies] Add a movie to the favourite list'
export const DELETE_FAVOURITE_MOVIE =  '[Movies] Delete a movie off the favourite list'
export const CLEAR_FAVOURITE_MOVIES =  '[Movies] Clear favourites list'

export const FETCH_MOVIES =            '[Movies] Fetch Movies';
export const FETCH_COMPLETE_MOVIES =   '[Movies] Fetch Movies Complete';
export const FETCH_FAIL_MOVIES =       '[Movies] Fetch Movies Failed';

export const RESET_SEARCH_RESULTS =     '[Movies] Reset Search Results';

export class FetchMovie {
  type = FETCH_MOVIE;
  id: number;

  constructor({ id } : { id: number }) {
    this.id = id;
  }
}

export class FetchCompleteMovie {
  type = FETCH_COMPLETE_MOVIE;
  payload: Movie;

  constructor({ payload }: { payload: Movie }) {
    this.payload = payload;
  }
}

export class FetchFailMovie {
  type = FETCH_FAIL_MOVIE;
  payload: Error;

  constructor(payload: Error) { this.payload = payload; };
}

export class AddFavouriteMovie {
  type = ADD_FAVOURITE_MOVIE;
  id: number;

  constructor({ id } : { id: number }) {
    this.id = id;
  }

}

export class DeleteFavouriteMovie {
  type = DELETE_FAVOURITE_MOVIE;
  id: number;

  constructor({ id } : { id: number }) {
    this.id = id;
  }
}

export class ClearFavouriteMovies {
  type = CLEAR_FAVOURITE_MOVIES;
}

export class FetchMovies {
  type = FETCH_MOVIES;
  path: string;
  searchTerm: string;

  constructor({ path, searchTerm }: { path: string, searchTerm: string }) {
    this.path = path;
    this.searchTerm = searchTerm;
  };
}

export class FetchCompleteMovies {
  type = FETCH_COMPLETE_MOVIES;
  payload: MoviesData;
  path: string;

  constructor({ payload, path }: { payload: MoviesData, path: string }) {
    this.payload = payload;
    this.path = path;
  };
}

export class FetchFailMovies  {
  type = FETCH_FAIL_MOVIES;
  payload: Error;

  constructor(payload: Error) { this.payload = payload; };
}

export class ResetSearchResults {
  type = RESET_SEARCH_RESULTS;
}

export type MoviesActions = {
  type: string,
  path: string,
  searchTerm: string,
  payload: MoviesData & Movie & Error,
  id: number,
}