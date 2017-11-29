// @flow
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { type Genre } from '../state';
import { SemiBoldText, RegularText } from '../components';
import { Gutter, Border, Colors } from '../constants';

type Props = {
  genres: Genre[],
  interactive: boolean,
  selectedGenres: number[],
  selectGenre: (id: number) => void
}

export class GenreList extends PureComponent<Props> {
  _renderGenres = () => {
    return (
      <View style={{ padding: Gutter.small }}>
        <SemiBoldText>Genres: </SemiBoldText>
        <View style={styles.genres}>
          {this.props.genres && this.props.genres.map((genre, i) =>
            <TouchableOpacity
              disabled={!this.props.interactive}
              onPress={() => this.props.selectGenre(genre.id)}
              activeOpacity={0.6}
              key={i}
              style={[
                styles.genre,
                this.props.interactive && (this.props.selectedGenres.indexOf(genre.id) > -1)
                  ? { borderColor: Colors.orange }
                  : null
              ]}
            >
              <RegularText style={[
                this.props.interactive && (this.props.selectedGenres.indexOf(genre.id) > -1)
                  ? { color: Colors.orange }
                  : null
              ]}>{genre.name}</RegularText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  render () {
    return this._renderGenres()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  genres: {
    marginTop: Gutter.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genre: {
    paddingHorizontal: Gutter.base,
    paddingVertical: Gutter.smaller,
    margin: Gutter.smaller,
    borderWidth: Border.smaller,
    borderRadius: Border.small,
    borderColor: Colors.grey,
  },
})