import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import SendBird from 'sendbird'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      phone: ''

    }
  }


  handleChangeUsername(value) {
    this.setState({username: value})
  }

  handleChangePhone(value) {
    this.setState({phone: value})
  }

  handleLogin() {
    sb = new SendBird({
      appId: '6042A607-C497-460C-B8E8-9934DF5D8529'
    })
    var _self = this
    sb.connect(_self.state.phone, function (user, error) {});

    sb.updateCurrentUserInfo(this.state.username, '', function(response, error) {
    });

    fetch('https://temo-api.herokuapp.com/users', {
      method: 'post',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({
      username: this.state.username,
      phone: this.state.phone
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.created_at != null) {
      console.log(responseJson)
      this.props.navigator.push({name: 'contacts'})
    } else {
      console.log("no  invalid phone number")
    }

  })
  }

 render() {
  var Contacts = require('react-native-contacts')

  Contacts.getAll((err, contacts) => {
    if(err && err.type === 'permissionDenied'){

    } else {
    }
  })

   return (
     <View style={styles.container}>
       <Text style={{ fontSize: 50}}>
        Temo
       </Text>
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangeUsername.bind(this)}
         value={this.state.username}
         />
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangePhone.bind(this)}
         value={this.state.phone}
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
    backgroundColor: 'white',
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
