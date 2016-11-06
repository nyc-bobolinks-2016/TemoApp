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
const ContactsList = require('react-native-contacts');


export default class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      conversationList: [],
      page: 0,
      next: 0,
      conversationList: ''
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentWillMount(){
    ContactsList.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){

      } else {
        this.setState({contacts: contacts})
      }
    })
  }

 render() {
   return (
     <View style={styles.container}>
      <ListView
      contacts={this.state.contacts}

      onEndReached={() =>this.getConversationList(this.state.next)}
      onEndReachedThreshold={PULLDOWN_DISTANCE}
      />
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

 getConversationList(page) {
   if ( age == 0 ) {
     return;
   }
   sendbird.getConversationList({
     page: page,
     limit: 20,
     successFunc(data) {
       this.setState({conversationList: this.state.conversationList.concat(data.conversations)}, () => {
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(this.state.conversationList),
           page: data.page,
           page: data.next
         });
       });
     },
     errorFunc: (status, error) => {
       console.log(status, error);
     }
   });
 }
}
