
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

import SendBird from 'sendbird';
const PULLDOWN_DISTANCE = 40;
const Contacts = require('react-native-contacts');

export default class Conversations extends Component {
  constructor() {
    super();
    sb = SendBird.getInstance();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds,
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
    fetch('https://temo-api.herokuapp.com/users/conversations', {
    method: 'POST',
    headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
     body: JSON.stringify( {
                                  phone: globalphone
                              })
  })

     .then((response) => response.json())
     .then((responseJSON) => {this.setState({conversations: responseJSON.conversations})
   })
      .catch((error)=>{
     console.log("Api call error");
     alert(error.message);
  });
  }

 render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.state.conversations || [])
   return (
      <View>
      <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={(rowData, sectionID, rowID) =>
              <TouchableOpacity
                onPress={() => this.onConversationPress(rowData.channel_url)}
              >
     <Text style={{padding: 50}}>{rowData.channel_url}</Text>
     </TouchableOpacity>
          } />
     </View>
   );
 }

 onConversationPress(url) {
  console.log(url)
  var chs = sb.OpenChannel.createOpenChannelListQuery();
  console.log(chs.length)
  console.log(chs[0])

chs

   // sb.OpenChannel.getChannel({url: 'sendbird_open_channel_10291_91d839e196b4120f8fdc113f5bc4e3ebb5cf5719'}, function (channel, error) {
   //  if (error) {
   //      // console.error(error);
   //      // return;
   //  }

    chs[0].enter(function(response, error){
        if (error) {
            console.error(error);
            return;
        }
    });
// });
 }
 }
