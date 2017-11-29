// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import { Gutter, Colors } from '../constants';
import { Container, MovieList } from '../components';
import {
  type Movie, type State,
  getFavouriteMovies,
  ClearFavouriteMovies } from '../state';

type Props = {
  favouriteMovies: Movie[],
  areMoviesReady: boolean,
  dispatch: any,
}

@connect()
class TrashButton extends PureComponent<any> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.props.dispatch({...new ClearFavouriteMovies()})}
      >
        <Entypo
          name="trash"
          size={28}
          style={{ marginRight: Gutter.small, backgroundColor: 'transparent', }}
          color={Colors.grey}
        />
      </TouchableOpacity>
    )
  }
}

@connect(data => FavouriteListScreen.getDataProps)
export class FavouriteListScreen extends PureComponent<Props> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      headerRight: <TrashButton />
    }
  }

  static getDataProps(state: State) {
    return {
      favouriteMovies: getFavouriteMovies(state),
    }
  }

  render() {
    return (
      <Container scrollable isEmpty={!this.props.favouriteMovies.length} text="No movies added yet" >
        <MovieList type="grid" movies={this.props.favouriteMovies} />
      </Container>
    )
  }
}