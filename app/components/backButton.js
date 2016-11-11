'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';

import NavButton from './navButton';


export default class BackButton extends Component {
  render(){
    return(
      <NavButton
        onPress={this.props.navigate.bind(this)}
        text='Back'
        style={{ fontSize: 20}}
      />
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: 'grey',
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: '500',
  }
})
