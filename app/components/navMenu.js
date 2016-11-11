'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

import NavButton from './navButton';


import Conversations from './conversations';
import Contacts from './contacts';
import Chat from './chat';

export default class NavMenu extends Component {

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  backPress() {
    if (lastRoute && lastRoute == "contacts") {
    global.lastRoute = ""
    this.props.navigator.pop()
    }
  }

  forwardPress() {
    global.lastRoute = "contacts"

    this.props.navigator.push({
      name: 'contacts'
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <NavButton
          onPress={() => this.backPress()}
          text='Messages'/>
        <NavButton
          onPress={() => this.forwardPress()}
          text='Contacts' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', left: 0, right: 0, bottom: 50,
    height: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  }
});
