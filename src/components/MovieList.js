// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { type Movie, FetchMovie } from '../state';
import { RegularText, MovieCard } from '../components';
import { Gutter } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  movies: Movie[],
  navigation: any,
  dispatch: any,
  title: string,
  type: 'grid' | 'horizontal'
}

@connect()
@withNavigation
export class MovieList extends PureComponent<Props> {
  handleSelectMovie = (movie: Movie) => {
    this.props.dispatch({...new FetchMovie({ id: movie.id })})
    this.props.navigation.navigate('Details', { movieId: movie.id }); // TODO: Move router state into redux
  }

  render () {
    const isHorizontalList = this.props.type === 'horizontal';

    return (
      <View>
      { this.props.title
        ? <RegularText style={{ padding: Gutter.small }}>{ this.props.title }</RegularText>
        : null
      }
      { /*$FlowFixMe */ }
      <FlatList
        horizontal={isHorizontalList}
        contentContainerStyle={{ flexDirection: isHorizontalList ? 'row' : 'column' }}
        data={this.props.movies}
        renderItem={this._renderItem}
        keyExtractor={this._extractKey}
        { ...(isHorizontalList ? {} : { numColumns: 3 })}
      />
      </View>
    )
  }

  _extractKey = ({ id }) => id

  _renderItem = ({ item }) => {
    let style = {};

    if (this.props.type === 'horizontal') {
      style = { marginLeft: Gutter.small, marginBottom: Gutter.small };
    }

    if (this.props.type === 'grid') {
      style = {
        width: screenWidth / 3,
        borderWidth: 0,
      }
    }

    return (
      <MovieCard
        movie={item}
        selectMovie={this.handleSelectMovie}
        style={style}
      />
    )
  }
}