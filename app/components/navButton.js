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
    height: 35,
    backgroundColor: '#e0e0e0',
    flex: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontFamily: 'SnellRoundhand-Bold',
  }
})
