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
import NavMenu from './navMenu';
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
    });
  }


  onConversationPress(url, secondUser) {
   global.secondUser = secondUser
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
           global.currentChannel = channel
           _self.props.navigator.push({name: 'chat', channel: channel.url});
         }
       });
     });
   }

 render() {
   const dataSource = this.state.dataSource.cloneWithRows(this.state.conversations || [])
   console.log(dataSource)
   return (
     <View style={styles.listContainer}>
      <ListView
      enableEmptySections
      conversations={this.state.conversations}
      onEndReachedThreshold={PULLDOWN_DISTANCE}
      dataSource={dataSource}
      renderRow={(rowData, sectionID, rowID) =>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.onConversationPress(rowData[0], rowData[1][0].username)}
        >
        <Text style={styles.listIcon}>
          {rowData[1][0].username}
        </Text>
        </TouchableOpacity>
        }
      />
      <View style={{flex: 1}}>
       <NavMenu navigator={this.props.navigator}/>
      </View>
     </View>
   );
 }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  listContainer: {
    top: 10,
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 0.5,
    borderColor: '#757575',
    padding: 5,
    height: 50
  },
  listIcon: {
    justifyContent: 'flex-start',
    color: '#00b0ff',
    paddingLeft: 15,
    paddingRight: 15,
  }
});
