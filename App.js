// @flow
import './src/vendor';
import React, { Component, PureComponent } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Provider, connect } from 'react-redux';

import { RootNavigation } from './src/navigation';
import { Store, FetchMovies } from './src/state';

type State = {
  isLoadingComplete: boolean,
}

export default class AppContainer extends PureComponent<any> {
  render() {
    return (
      <Provider store={Store}>
        <App {...this.props} />
      </Provider>
    )
  }
}

@connect()
class App extends Component<any, State> {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    ['mostPopularMovies', 'topRatedMovies', 'bestMoviesYear']
    .forEach(path => this.props.dispatch({ ...new FetchMovies({ path }) }))
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
          <RootNavigation />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/tmdb-logo.png'),
      ]),
      Font.loadAsync({
        'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-semibold': require('./src/assets/fonts/OpenSans-SemiBold.ttf'),
        ...Ionicons.font,
      }),
    ]);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}