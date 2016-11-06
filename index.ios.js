'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Temo from './app/components/temo';
import Contacts from './app/components/contacts';
import Welcome from './app/components/welcome';
import Conversations from './app/components/conversations';



export default class TemoApp extends Component {


    renderScene(route, navigator) {
      if(route.name === 'contacts') {
        return <Contacts navigator={navigator} />
      }
      if(route.name === 'conversations') {
        return <Conversations navigator={navigator} />
      }
      if(route.name === 'temo') {
        return <Temo navigator={navigator} />
      }
      if(route.name === 'welcome') {
        return <Welcome navigator={navigator} />
      }
    }

    render() {
      return (
        <Navigator
          initialRoute = {{name: 'welcome'}}
          renderScene = {this.renderScene}
        />
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });

AppRegistry.registerComponent('TemoApp', () => TemoApp);
