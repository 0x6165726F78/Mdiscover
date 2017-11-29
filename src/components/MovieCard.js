// @flow
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Colors, Border, ApiPaths } from '../constants';
import { type Movie } from '../state';

type Props = {
  movie: Movie,
  selectMovie: (movie: Movie) => void,
}

export class MovieCard extends PureComponent<Props> {
  render() {
    const { movie, selectMovie } = this.props;

    return (
      <TouchableOpacity onPress={() => selectMovie(movie)}
        style={[styles.container, this.props.style]} activeOpacity={0.6}>
        <Image
          style={styles.image}
          source={{ uri: `${ApiPaths.imagesBase}${movie.poster_path}` }} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 132,
    height: 189,
    borderRadius: Border.small,
    borderWidth: Border.smaller,
    borderColor: Colors.grey,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  }
})