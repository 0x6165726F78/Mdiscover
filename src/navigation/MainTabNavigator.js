import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import { HomeScreen, FavouriteListScreen } from '../screens';
import { Colors, Border } from '../constants';

export const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Favourites: {
      screen: FavouriteListScreen,
    }
  },
  {
    navigationOptions: ({ navigation: { state: { routeName } } }) => ({
      title: routeName,
      headerStyle: {
        backgroundColor: Colors.black,
        borderBottomWidth: Border.smaller,
        borderBottomColor: Colors.grey,
      },
      headerTitleStyle: {
        color: Colors.grey,
        fontWeight: 'bold',
      },
      tabBarIcon: ({ focused, tintColor }) => {
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Favourites':
            iconName =
              Platform.OS === 'ios'
                ? `ios-heart${focused ? '' : '-outline'}`
                : `md-heart${focused ? '' : '-outline'}`
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={tintColor}
          />
        );
      },
    }),
    lazy: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.orange,
      inactiveTintColor: Colors.grey,
      style: {
        backgroundColor: Colors.black,
        borderTopWidth: Border.smaller,
        borderTopColor: Colors.grey,
      }
    }
  }
);
