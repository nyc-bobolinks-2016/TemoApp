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
      headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: currentPhone
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      this.setState({conversations: responseJSON.conversations})
    })
    .catch((error)=>{
      console.log("Api call error");
      alert(error.message);
    });
  }


  onConversationPress(url) {
    var _self = this
   console.log(url)
   var chs = sb.OpenChannel.createOpenChannelListQuery();
   console.log(chs)

    sb.OpenChannel.getChannel(url, function (channel, error) {
     if (error) {
         console.error(error);
         return;
     }

     channel.enter(function(response, error){
         if (error) {
             console.error(error);
             return;
         } else {
           _self.props.navigator.push({name: 'chat', channel: channel.url});
         }
       });
     });
   }

 render() {
   const dataSource = this.state.dataSource.cloneWithRows(this.state.conversations || [])
   return (
     <View style={styles.container}>
      <ListView
      conversations={this.state.conversations}
      onEndReachedThreshold={PULLDOWN_DISTANCE}
      dataSource={dataSource}
      renderRow={(rowData, sectionID, rowID) =>
        <TouchableOpacity
          onPress={() => this.onConversationPress(rowData.channel_url)}
        >
        <Text style={{padding: 10}}>{rowData.channel_url}</Text>
        </TouchableOpacity>
        }
      />
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
   listView: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   }
 });
