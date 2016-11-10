'use strict'

import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: ''
    }
  }

  handleNewEmail(value) {
    this.setState({email: value})
  }

  handleNewPassword(value) {
    this.setState({password: value})
  }

  handleLogin() {
    realm.write(() => {
      realm.create('User', {email: this.state.email, password: this.state.password});
    });
  }

 render() {
   return (
     <View style={styles.container}>
       <Text style={{ fontSize: 50}}>
        Login
       </Text>
       <Text style={{ fontSize: 20}}>
        New email
       </Text>
       <TextInput style={{height: 40, borderWidth: 1}}
         placeholder="email"
         value={this.state.email}
         onChangeText={this.handleNewEmail.bind(this)}
         />

         <Text style={{ fontSize: 20}}>
          New password
         </Text>
       <TextInput style={{height: 40, borderWidth: 1}}
         placeholder="password"
         value={this.state.password}
         onChangeText={this.handleNewPassword.bind(this)}
         />
       <TouchableOpacity onPress={this.handleLogin.bind(this)}>
        <Text style={{ fontSize: 20, color: "grey"}}>Create Acount</Text>
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
