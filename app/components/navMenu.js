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

  render(){
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 50}}>Temo</Text>
        <NavButton
          onPress={this.navigate.bind(this, 'conversations')}
          text='Conversation'/>
        <NavButton
          onPress={this.navigate.bind(this, 'contacts')}
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
