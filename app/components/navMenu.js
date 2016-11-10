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
          text='Conversation'/>
        <NavButton
          onPress={() => this.forwardPress()}
          text='Contacts' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
