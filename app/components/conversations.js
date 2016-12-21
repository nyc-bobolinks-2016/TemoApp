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

import strftime from 'strftime';
import SendBird from 'sendbird';
import NavMenu from './navMenu';
const PULLDOWN_DISTANCE = 40;
const Contacts = require('react-native-contacts');

export default class Conversations extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
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
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        // x.x
      } else {
        console.log(contacts)
      }
    })

    fetch('https://temo-api.herokuapp.com/users/conversations', {
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: currentPhone
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({conversations: responseJSON.conversations})
    })
    .catch((error)=>{
    });
  }



  onConversationPress(url, secondUser) {
   global.secondUser = secondUser
   var _self = this
   var chs = sb.OpenChannel.createOpenChannelListQuery();

    sb.OpenChannel.getChannel(url, function (channel, error) {
     if (error) {
         return;
     }

     channel.enter(function(response, error){
         if (error) {
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
   return (
     <View style={styles.listContainer}>
       <View style={{ height: 5}}>
        <NavMenu navigator={this.props.navigator}/>
       </View>
      <ListView
      style={{height: 100, top: 57}}
      enableEmptySections
      conversations={this.state.conversations}
      onEndReachedThreshold={PULLDOWN_DISTANCE}
      dataSource={dataSource}
      renderRow={(rowData, sectionID, rowID) =>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.onConversationPress(rowData[0], rowData[1][0].username)}
        >
        <View style={{ marginRight: 5, marginBottom: 10, height: 35}}>
          <Image source={require('../../images/bg.jpg')} style={styles.userPic}>

          </Image>
        </View>
        <View style={{flexDirection: 'column', flex: 1, paddingBottom: 5}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, fontSize: 17, color: '#00b0ff', fontWeight: "600", fontFamily: 'Helvetica-Bold'}}>
              {rowData[1][0].username}
            </Text>
            <Text style={{ flex: 1, fontSize: 17, color: '#00b0ff', fontWeight: "400", fontFamily: 'Helvetica-Bold'}}>
               {strftime('%A')}
            </Text>
          </View>
          <Text style={{ height: 35, paddingTop: 2, fontSize: 15, color: '#212121', fontWeight: "200", fontFamily: 'AppleSDGothicNeo-Thin'}}>
            this will be text of the message this will be text of the message this will be text of the message this will be text of the message this will be text of the message this will be text of the message this will be text of the message this will be text of the message v this will be text of the message this will be text of the message this will be text of the message...
          </Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 20, color: 'green'}}>
            80%
          </Text>
        </View>
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
  listContainer: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    height: 90,
    padding: 5,
  },
  listIcon: {
    color: '#00b0ff',
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: '#00b0ff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  userPic: {
    borderRadius: 20,
    height: 45,
    width: 45,
    resizeMode: 'stretch'
  }
});
