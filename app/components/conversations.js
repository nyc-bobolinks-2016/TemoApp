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
    const datasource = []
    super();
    this.state = {
      conversationList: [],
      page: 0,
      next: 0,
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentWillMount() {
    this.getConversationList(1);
  }

 render() {
   return (
     <View style={styles.container}>
      <ListView
      conversations={this.state.conversations}
      onEndReached={() => this.getConversationList(this.state.next)}
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
   if ( page == 0 ) {
     return;
   }
   sendbird.getChannelList({
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
