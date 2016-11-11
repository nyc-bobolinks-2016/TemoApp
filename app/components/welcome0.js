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
import NavMenu from './navMenu';

export default class Signup extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
    global.lastRoute = ""
    this.state = {
      username: '',
      phone: ''
    }
  }


  handleChangeUsername(value) {
    this.setState({username: value})
    global.currentUser = value
  }

  handleChangePhone(value) {
    this.setState({phone: value})
    global.currentPhone = value

  }

  handleSignup() {
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
      this.props.navigator.push({name: 'conversations'})
    } else {
      console.log("no  invalid phone number")
    }
  })
  }

  handleLogin() {
    sb = new SendBird({
      appId: '6042A607-C497-460C-B8E8-9934DF5D8529'
    })
    var _self = this
    sb.connect(_self.state.phone, function (user, error) {});

    sb.updateCurrentUserInfo(this.state.username, '', function(response, error) {
    });

    fetch('https://temo-api.herokuapp.com/users/login', {
      method: 'post',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({
      username: this.state.username,
      phone: this.state.phone
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.created_at) {
      console.log(responseJson)
      this.props.navigator.push({name: 'conversations'})
    } else {
      console.log("no invalid phone number")
    }

  })
  }


 render() {
   return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Temo
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Username'}
        onChangeText={this.handleChangeUsername.bind(this)}
        value={this.state.username}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Password'}
        onChangeText={this.handleChangePhone.bind(this)}
        value={this.state.phone}
      />

      <TouchableOpacity onPress={this.handleLogin.bind(this)}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.handleSignup.bind(this)}>
        <Text style={styles.button}>Sign up</Text>
      </TouchableOpacity>
    </View>
   );
 }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    margin: 10,
  },
  header: {
    fontSize: 100,
    color: '#00b0ff',
    margin: 60,
    fontFamily: 'SnellRoundhand-Bold',
    marginBottom: 40,
  },
  button: {
    fontSize: 30,
    color: '#00b0ff',
    fontWeight: "100",
    fontFamily: 'AppleSDGothicNeo-Thin',
    margin: 5,
  },
  textInput: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: '#757575',
    marginLeft: 67,
    marginBottom: 3,
    borderRadius: 5,
    backgroundColor: '#e3f2fd'
  }
});
