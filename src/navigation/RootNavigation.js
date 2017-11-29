import { StackNavigator } from 'react-navigation';

import { DetailsScreen, SearchScreen } from '../screens';
import { MainTabNavigator } from '../navigation';

export const RootNavigation = StackNavigator(
  {
    Details: {
      screen: DetailsScreen
    },
    Search: {
      screen: SearchScreen
    },
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    initialRouteName: 'Main'
  }
);