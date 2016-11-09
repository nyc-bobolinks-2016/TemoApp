'use strict'

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';


const sendbird = require('sendbird');
const PULLDOWN_DISTANCE = 40;
const Contacts = require('react-native-contacts');

export default class Conversations extends Component {
  constructor() {
    // const datasource = []
    super();
    this.state = {
      conversationList: [],
      page: 0,
      next: 0, 
      conversations: []
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentWillMount() {
    fetch('http://localhost:3000/users/test', { 
    method: 'POST',
    headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
     body: JSON.stringify( {
                                  username: testusername
                              })
  })

     .then((response) => response.json())
     .then((responseJSON) => {this.setState({conversations: responseJSON.conversations})})
      .catch((error)=>{
     console.log("Api call error");
     alert(error.message);
  });
  }

  render() {

    
   return (
     <View>
     {this.state.conversations.map((conversation) =>
     <Text style={{padding: 50}}>{conversation.channel_url}</Text>
      )}
     </View>
   );
 }
 
    

 onConversationPress(url) {
   sendbird.joinChannel(
     url,
   {
     successFunc: (data) => {
       sendbird.connect({
         successFunc: (data) => {
           sendbird.getChannelInfo((conversation) => {
             sendbird.connect({
               successFunc: (data) => { this.props.navigator.push({ name: 'chat'}) },
               errorFunc: (status, error) => { console.log(status, error) }
             })
           });
         },
         errorFunc: (status, error) => {
           console.log(status, error);
         }
       });
     },
     errorFunc: (status, error) => {
       console.log(status, error);
     }
   });
 }

 
 }
