// @flow
import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';

import { RegularText } from './StyledText';
import { Colors, FontSize } from '../constants';

type Props = {
  isEmpty: boolean;
  isLoading: boolean;
  scrollable: boolean;
  text: string;
  children: any;
  style: any;
}

export class Container extends PureComponent<Props> {
  render() {
    if (this.props.isLoading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.loadingIndicator, this.props.style]}>
          <ActivityIndicator />
        </View>
      )
    }

    if (this.props.isEmpty) {
      return (
        <View style={[styles.container, styles.emptyContainer, this.props.style]}>
          <RegularText style={styles.text}>{ this.props.text }</RegularText>
        </View>
      )
    }

    if (this.props.scrollable) {
      return (
        <ScrollView
          keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always"
          style={[styles.container, this.props.style]}>
          {this.props.children}
        </ScrollView>
      )
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkerBlack,
  },
  loadingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  text: {
    textAlign: 'center',
    fontSize: FontSize.big,
  }
})