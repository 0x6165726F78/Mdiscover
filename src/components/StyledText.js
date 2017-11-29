import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import { Colors, FontSize } from '../constants';

export class RegularText extends PureComponent {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent', color: Colors.grey, fontSize: FontSize.base  },
          this.props.style,
          { fontFamily: 'open-sans' },
        ]}
      />
    );
  }
}

export class SemiBoldText extends PureComponent {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent', color: Colors.darkerWhite  },
          this.props.style,
          { fontFamily: 'open-sans-semibold' },
        ]}
      />
    );
  }
}

export class BoldText extends PureComponent<any> {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent', color: Colors.darkerWhite, fontSize: FontSize.bigger },
          this.props.style,
          { fontFamily: 'open-sans-bold' },
        ]}
      />
    );
  }
}
