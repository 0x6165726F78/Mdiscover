// @flow
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { Container, MovieList } from '../components';
import { Gutter, Colors } from '../constants';

import {
  type Movie,
  type State,
  getMostPopularMovies,
  getTopRatedMovies,
  getBestMoviesYear,
  getMoviesBootstraped } from '../state';

type Props = {
  mostPopularMovies: Movie[],
  topRatedMovies: Movie[],
  bestMoviesYear: Movie[],
  areMoviesBootstraped: boolean,
}

class SearchButton extends PureComponent<{ click: (route: string) => void }> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.click}
      >
        <Ionicons
          name="ios-search"
          size={28}
          style={{ marginRight: Gutter.small, backgroundColor: 'transparent', }}
          color={Colors.grey}
        />
      </TouchableOpacity>
    )
  }
}

@connect(data => HomeScreen.getDataProps)
export class HomeScreen extends PureComponent<Props> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      headerRight: <SearchButton click={() => navigation.navigate('Search')} />
    }
  }

  static getDataProps(state: State) {
    return {
      mostPopularMovies: getMostPopularMovies(state),
      topRatedMovies: getTopRatedMovies(state),
      bestMoviesYear: getBestMoviesYear(state),
      areMoviesBootstraped: getMoviesBootstraped(state),
    }
  }

  render() {
    const { mostPopularMovies, topRatedMovies, bestMoviesYear } = this.props;

    const lists = [
      { movies: mostPopularMovies,  title: 'MOST POPULAR MOVIES'  },
      { movies: topRatedMovies,     title: 'TOP RATED MOVIES'     },
      { movies: bestMoviesYear,     title: 'BEST MOVIES 2017'     },
    ]

    return (
      <Container scrollable isLoading={!this.props.areMoviesBootstraped} style={{ backgroundColor: Colors.darkerBlack }}>
        { lists.map((list, i) => <MovieList key={i} title={list.title} movies={list.movies} type="horizontal" />) }
      </Container>
    )
  }
}