import React from 'react';
import { Component } from 'react';
import { Linking, TouchableOpacity } from 'react-native';

class ExternalLink extends Component {

    _openLink = async () => {
        const { link } = this.props;
  
        if (await Linking.canOpenURL(link)) {
            Linking.openURL(link);
        }
    }
  
    render() {
        const { children } = this.props;
  
        return (
            <TouchableOpacity accessibilityRole='link' onPress={this._openLink}>
                {children}
            </TouchableOpacity>
        );
    }
  }

  export default ExternalLink;
