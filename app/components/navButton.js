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
    height: 15,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 10,
  },
  buttonText: {
    color: "#00b0ff",
    fontSize: 30,
    fontWeight: "100",
    fontFamily: 'AppleSDGothicNeo-Thin',
  }
})
