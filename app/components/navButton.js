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
    height: 20,
    marginBottom: 0,
  },
  buttonText: {
    color: "#00b0ff",
    width: 190,
    fontSize: 30,
    borderWidth: 1,
    marginRight: 2,
    marginBottom: 0,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 5,
    fontWeight: "100",
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Thin',
  }
})
