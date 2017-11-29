// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import { RegularText, BoldText, SemiBoldText, Container, GenreList } from '../components';
import {
  type Movie,
  type State,
  getMoviesEntities,
  AddFavouriteMovie,
  DeleteFavouriteMovie,
  ClearFavouriteMovies,
  getFavouriteMoviesIds,
  getLoadingMovie
} from '../state';
import { Colors, ApiPaths, Border, Gutter, StackOrder } from '../constants'

@connect(data => DetailsScreen.getDataProps)
@withNavigation
export class DetailsScreen extends PureComponent<any> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  static getDataProps = (state: State, props: any) => {
    const { movieId } = props.navigation.state.params;

    return {
      isLoading: getLoadingMovie(state),
      movie: getMoviesEntities(state)[movieId],
      isInFavouritesList: getFavouriteMoviesIds(state).indexOf(movieId) > -1
    }
  }

  _renderMovieInfo = () => {
    return (
      <View key="movieInfo" style={{ padding: Gutter.small }}>
        <BoldText>{this.props.movie.title}</BoldText>
        <RegularText>{this.props.movie.overview}</RegularText>
      </View>
    )
  }

  _renderMovieVotes = () => {
    return (
      <View key="movieVotes" style={{ flexDirection: 'row', justifyContent: 'center', padding: Gutter.small }}>
        <BoldText>Score: </BoldText>
        <BoldText>{this.props.movie.vote_average}</BoldText>
        <Image
          style={styles.tmdbLogo}
          source={require('../assets/images/tmdb-logo.png')}
        />
      </View>
    )
  }

  _renderMovieGenres = () => {
    return (
      <View key="movieGenres" style={{ padding: Gutter.small }}>
        <SemiBoldText>Genres: </SemiBoldText>
        <View style={styles.genres}>
          {this.props.movie.genres.map((genre, i) =>
            <View key={i} style={styles.genre}>
              <RegularText>{genre.name}</RegularText>
            </View>
          )}
        </View>
      </View>
    )
  }

  _renderBtn = ({ name, color, onPress, text }) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center',}}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Entypo
          name={name}
          size={44}
          style={{ backgroundColor: 'transparent', }}
          color={color}
        />
        <RegularText>{ text }</RegularText>
      </TouchableOpacity>
  )
  }

  _renderButtons = () => {
    const removeBtnInfo = {
      text: 'Remove from Favourites',
      name: 'cross',
      color: Colors.red,
      onPress: () => this.props.dispatch({ ...new DeleteFavouriteMovie({ id: this.props.movie.id }) })
    };

    const addBtnInfo = {
      text: 'Add to Favourites',
      name: 'plus',
      color: Colors.green,
      onPress: () => this.props.dispatch({ ...new AddFavouriteMovie({ id: this.props.movie.id }) })
    }

    return (
      <View key="buttons" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: Gutter.base, paddingRight: Gutter.base }}>
        { this.props.isInFavouritesList
          ? this._renderBtn(removeBtnInfo)
          : this._renderBtn(addBtnInfo)
        }
      </View>
    )
  }

  _renderHeader = () => {
    return (
      <ImageBackground
        style={styles.hero}
        source={{ uri: `${ApiPaths.imagesBase}${this.props.movie.poster_path}` }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={{zIndex: StackOrder.navigationLinks}}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-back-outline"
            size={36}
            style={{ marginTop: Gutter.big, marginLeft: Gutter.small, backgroundColor: 'transparent', }}
            color={Colors.darkerWhite}
          />
        </TouchableOpacity>
        <LinearGradient
          colors={[Colors.black, 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
      </ImageBackground>
    )
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Container scrollable isLoading={this.props.isLoading}>
          { !this.props.loading
            ? [this._renderMovieInfo(), this._renderMovieVotes(),
              <GenreList key="genres" genres={this.props.movie.genres} />, this._renderButtons(), ]
            : null
          }
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  hero: {
    width: null,
    height: 200,
  },
  tmdbLogo: {
    marginLeft: Gutter.big,
    width: 40,
    height: 40,
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