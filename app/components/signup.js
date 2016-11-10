import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Login from './login';
import Signup from './signup';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Welcome extends Component {

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  render() {
    return (
    <View style={styles.container}>
        <Text style={{ fontSize: 50}}>
          Temo
        </Text>
        <TouchableOpacity
          onPress={this.navigate.bind(this, 'login')}
          text='Login'
        >
         <Text style={{ fontSize: 20, color: "grey"}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigate.bind(this, 'signup')}
          text='Signup'
        >
         <Text style={{ fontSize: 20, color: "grey"}}>Signup</Text>
        </TouchableOpacity>
        <KeyboardSpacer/>
      </View>
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
