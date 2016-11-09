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
      conversations: null
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/test', { 
    method: 'POST',
    headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
     body: JSON.stringify( {
                                  username1: testusername
                              })
  })

     .then((response) => response.json())
     .then((responseJSON) => {
        this.setState({conversations: responseJSON})

      })
      .catch((error)=>{
     console.log("Api call error", error);
     alert(error.message);
  });
  }
// // this.setState({users: responseJSON}))
//  // <ListView
//       // // conversations={this.state.conversations}
//       // onEndReached={() => this.getConversationList(this.state.next)}
//       // onEndReachedThreshold={PULLDOWN_DISTANCE}/> 



renderPlaceholder() {
    return (
      <View style={{padding:50}}>
        <Text>Loading...</Text>
      </View>
    )
  }



  render() {
    if (!this.state.conversations) {
      return this.renderPlaceholder();
    }
    console.log("I'm this.state.conversations.conversations", this.state.conversations.conversations)
    console.log("I'm the end obj supposed to be displayed", this.state.conversations.conversations[0].sentiment)
   return (
     <View>
     <Text style={{padding: 50}}>{this.state.conversations.converations}</Text>
     </View>
   );
 }
// this.state.user.users[0].username
 // <ListView
      // // conversations={this.state.conversations}
      // onEndReached={() => this.getConversationList(this.state.next)}
      // onEndReachedThreshold={PULLDOWN_DISTANCE}/> 
    

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

 // getConversationList(page) {
 //   if ( page == 0 ) {
 //     return;
 //   }
 //   sendbird.getChannelList({
 //     page: page,
 //     limit: 20,
 //     successFunc(data) {
 //       this.setState({conversationList: this.state.conversationList.concat(data.conversations)}, () => {
 //         this.setState({
 //           dataSource: this.state.dataSource.cloneWithRows(this.state.conversationList),
 //           page: data.page,
 //           page: data.next
 //         });
 //       });
 //     },
 //     errorFunc: (status, error) => {
 //       console.log(status, error);
 //     }
 //   });
 //  }
 }
