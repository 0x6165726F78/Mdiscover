// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'

import { Gutter, Border, Colors, FontSize } from '../constants';
import { Container, MovieList } from '../components';
import {
  type State,
  type Movie,
  getSearchResultsMovies,
  getLoadingMovies,
  FetchMovies,
  ResetSearchResults
} from '../state';

type Props = {
  searchResultsMovies: Movie[],
  isLoading: boolean,
}

@connect(data => SearchScreen.getDataProps)
export class SearchScreen extends PureComponent<any, any> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  static getDataProps = (state: State) => {
    return {
      searchResultsMovies: getSearchResultsMovies(state),
      isLoading: getLoadingMovies(state),
    }
  }

  handleChangeText = (searchTerm: string) => {
    // TODO: Delete this code when searchResultsMovies is promoted to its own reducer & epic

    if(!searchTerm) {
      return this.props.dispatch({ ...new ResetSearchResults() })
    }

    this.props.dispatch({ ...new FetchMovies({
      searchTerm,
      path: 'searchResultsMovies',
    }) });
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
    this.props.dispatch({ ...new ResetSearchResults() })
  }

  render() {
    return (
      <Container>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.6}
          onPress={this.handleGoBack}
        >
          <Ionicons
            name="ios-arrow-back-outline"
            size={36}
            style={{ backgroundColor: 'transparent', }}
            color={Colors.darkerWhite}
          />

          <TextInput
            placeholder="Search..."
            onChangeText={this.handleChangeText}
            style={styles.textInput} />
        </TouchableOpacity>

        <Container scrollable isLoading={this.props.isLoading} isEmpty={!this.props.searchResultsMovies.length} text="No movies found">
          <MovieList type="grid" movies={this.props.searchResultsMovies} />
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: Gutter.big,
    paddingBottom: Gutter.small,
    paddingLeft: Gutter.small,
    backgroundColor: Colors.black,
    borderBottomWidth: Border.smaller,
    borderBottomColor: Colors.grey,

  },
  textInput: {
    paddingVertical: Gutter.smaller,
    paddingLeft: Gutter.small,
    marginHorizontal: Gutter.small,
    flex: 1,
    backgroundColor: Colors.darkerWhite,
    color: Colors.darkerBlack,
    fontSize: FontSize.base,
    borderWidth: Border.smaller,
    borderColor: Colors.grey,
    borderRadius: Border.big,
    margin: Gutter.small,
  },
})