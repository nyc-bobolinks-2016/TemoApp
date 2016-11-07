import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import realm from './realm'
const sendbird = require('sendbird')

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      username: ''

    }
  }

  onPress() {
    sendbird.init({
      app_id: '6042A607-C497-460C-B8E8-9934DF5D8529'
      guest_id: this.state.username,
      user_name: this.state.username,
      image_url: '',
      access_token: '',
      successFunc: (date) => {
        this.props.navigator.push({name: channels});
      },
      errorFunc: (status, error) => {
        this.setState({username: ''});
      }
    })
  }

  handleChangeEmail(value) {
    this.setState({email: value})
  }

  handleChangePassword(value) {
    this.setState({password: value})
  }

  handleLogin() {
    if (realm.objects('User').filtered('email = {this.state.email}')) {
      var user = realm.objects('User').filtered('email = {this.state.email}')
      if (user.password == this.state.password) {
        console.log("success")
      }
    } else {
      console.log("fail")
    }
  }

 render() {

  var Contacts = require('react-native-contacts')

  Contacts.getAll((err, contacts) => {
    if(err && err.type === 'permissionDenied'){
      // x.x
    } else {
      console.log(contacts)
      console.log("hello")

    }
  })

   return (
     <View style={styles.container}>
       <Text style={{ fontSize: 50}}>
        Temo
       </Text>
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangeEmail.bind(this)}
         value={this.state.email}
         />
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangePassword.bind(this)}
         value={this.state.password}
         />

       <TouchableOpacity onPress={this.handleLogin.bind(this)}>
        <Text style={{ fontSize: 20, color: "grey"}}>Login</Text>
       </TouchableOpacity>
       
       <TouchableOpacity>
        <Text style={{ fontSize: 20, color: "grey"}}>Sign Up</Text>
       </TouchableOpacity>
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
