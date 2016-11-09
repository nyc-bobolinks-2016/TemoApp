import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const sendbird = require('sendbird')


export default class Login extends Component {

navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  constructor() {
    super();
    this.state = {
      username: '',
      phone: ''
    }
  }

  onPress() {
    sendbird.init({
      app_id: '6042A607-C497-460C-B8E8-9934DF5D8529',
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

  handleChangeUsername(value) {
    this.setState({username: value})
    global.testusername = value
  }

  handleChangePassword(value) {
    this.setState({password: value})
  }

  // handleLogin() {
  //     global.currentUser = this.state.username
  //     console.log(currentUser)

  // }

 render() {

   return (
     <View>
       <Text style={{ fontSize: 50}}>
        Temo
       </Text>
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangeUsername.bind(this)}
         value={this.state.username}/>
       <TextInput
         style={{height: 40, borderWidth: 1}}
         onChangeText={this.handleChangePassword.bind(this)}
         value={this.state.password}/>





       <TouchableOpacity onPress={this.navigate.bind(this, 'conversations')}
       text='Conversations'
       >
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
