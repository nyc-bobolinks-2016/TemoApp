'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';



export default class NavButton extends Component {
  render(){
    return(
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: 'grey',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: '500',
  }
})
