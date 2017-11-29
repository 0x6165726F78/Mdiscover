// @flow
import { ActionsObservable } from 'redux-observable';

import { ApiPaths } from '../constants';
import {
  type MoviesActions,
  FETCH_MOVIE,
  FETCH_COMPLETE_MOVIE,
  FETCH_FAIL_MOVIE,
  FETCH_MOVIES,
  FETCH_COMPLETE_MOVIES,
  FETCH_FAIL_MOVIES,
  FetchMovies,
  } from './moviesActions';
import { type Movie, type MoviesData, isValidMovie } from './moviesModels';

/*
  TODO: Perform retry, error handling, logging for FETCH_MOVIE, FETCH_MOVIES
*/

const fetchMovie = (action$: ActionsObservable<MoviesActions>) =>
  action$
  .ofType(FETCH_MOVIE)
  .switchMap(({ id }) => ActionsObservable.fromPromise(
    fetch(ApiPaths.moviePath(id))
    .then(data => data.json())
  ))
  .map((movie: Movie) => ({ type: FETCH_COMPLETE_MOVIE, payload: movie }))



const fetchMovies = (action$: ActionsObservable<MoviesActions>) =>
  action$ // TODO: Move search logic outside and apply: distinctUntilChanged, debounceTime + switchMap
  .ofType(FETCH_MOVIES)
  .mergeMap((action: MoviesActions) => ActionsObservable.fromPromise(
    fetch(action.searchTerm ? ApiPaths[action.path](action.searchTerm) : ApiPaths[action.path])
    .then(data => data.json())
    .then((data: MoviesData) => (data.results = data.results.filter(isValidMovie), data))
    .then(data => ({ path: action.path, data }))
  ))
  .map(({ path, data }) => ({ type: FETCH_COMPLETE_MOVIES, payload: data, path, }))

export const MoviesEpic = [
  fetchMovie,
  fetchMovies
];