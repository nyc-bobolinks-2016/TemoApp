'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      phone: ''
    }
  }


  

  handleNewPhone(value) {
    this.setState({phone: value})
  }

  handleSignup() {
    fetch('https://temo-api.herokuapp.com/users', { 
    method: 'POST',
    body: JSON.stringify( {
                                  username: this.state.username,
                                  phone: this.state.phone
                              }),
    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}
  })
     .then((response) => response.json())
     .then((responseJSON) => console.log(responseJSON))
      .catch((error)=>{
     console.log("Api call error");
     alert(error.message);
  });
}





  handleNewUsername(value) {
    this.setState({username: value})
  }

 render() {
   return (
     <View style={styles.container}>
     <Text style={{ fontSize: 50,fontFamily: 'chalkduster'}}>
        Signup
       </Text>
       <Text style={{ fontSize: 20}}>
        New email
       </Text>
       <TextInput style={{height: 40, borderWidth: 1}}
         placeholder="username"
         value={this.state.username}
         onChangeText={this.handleNewUsername.bind(this)} />
         <Text style={{ fontSize: 20, color: "#03a9f4"}}>
          New password
         </Text>
       <TextInput style={{height: 40, borderWidth: 1}}
         placeholder="phone"
         value={this.state.password}
         onChangeText={this.handleNewPhone.bind(this)}  />
       <TouchableOpacity onPress={this.handleSignup.bind(this)}>
        <Text style={{ fontSize: 20, color: "#03a9f4"}}>Create Acount</Text>
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
    backgroundColor: '#03a9f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#e0e0e0',
    marginBottom: 5,
  },
});
