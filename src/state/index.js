// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createSelector } from 'reselect';
import { Constants } from 'expo';

import { MoviesEpic } from './moviesEpic'
import * as fromMovies from './moviesReducer';

const rootEpic = combineEpics(
  ...MoviesEpic,
);

const rootReducer = combineReducers({
  movies: fromMovies.reducer,
});

const middlwares = [
  createEpicMiddleware(rootEpic)
];

if (!Constants.isDevice) {
  middlwares.push(createLogger())
}

// TODO: Add redux persist or custom middleware/metareducer for the favouritesMovies

export const Store = createStore(
  rootReducer,
  applyMiddleware(...middlwares)
)

export type State = {
  movies: fromMovies.State,
}

export * from './moviesActions';
export * from './moviesModels';

export const getMoviesState = (state: State) => state.movies;

export const getMoviesIds = createSelector(getMoviesState, fromMovies.getIds);

export const getMoviesEntities = createSelector(getMoviesState, fromMovies.getEntities);

export const getSearchResultsMoviesIds = createSelector(getMoviesState, fromMovies.getSearchResultsMoviesIds);
export const getSearchResultsMovies = createSelector(getMoviesState, fromMovies.getSearchResultsMovies);

export const getFavouriteMoviesIds = createSelector(getMoviesState, fromMovies.getFavouriteMoviesIds);
export const getFavouriteMovies = createSelector(getMoviesState, fromMovies.getFavouriteMovies);

export const getMostPopularMoviesIds = createSelector(getMoviesState, fromMovies.getMostPopularMoviesIds);
export const getMostPopularMovies = createSelector(getMoviesState, fromMovies.getMostPopularMovies);

export const getTopRatedMoviesIds = createSelector(getMoviesState, fromMovies.getTopRatedMoviesIds);
export const getTopRatedMovies = createSelector(getMoviesState, fromMovies.getTopRatedMovies);

export const getBestMoviesYearIds = createSelector(getMoviesState, fromMovies.getBestMoviesYearIds);
export const getBestMoviesYear = createSelector(getMoviesState, fromMovies.getBestMoviesYear);


export const getLoadingMovie = createSelector(getMoviesState, fromMovies.getLoadingMovie);

export const getLoadingMovies = createSelector(getMoviesState, fromMovies.getLoadingMovies);

export const getMoviesBootstraped = createSelector(getMoviesState, fromMovies. getBootstraped);