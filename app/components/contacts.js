'use strict'

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ListView,
  Navigator,
  TouchableOpacity,
} from 'react-native';

const PULLDOWN_DISTANCE = 40;
import SendBird from 'sendbird'
const ContactsList = require('react-native-contacts');
import NavButton from './navButton';
import NavMenu from './navMenu';

export default class Contacts extends Component {
  constructor() {
    super();
    global.currentChannel = ''
    sb = SendBird.getInstance();
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      contactList: []
    };
  }

  navigate() {
    this.props.navigator.pop()
  }

  componentDidMount() {
    ContactsList.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){

      } else {
        console.log('before filter', contacts);

        const contactList = this.filterContacts(contacts);

        this.setState({
          contactList: contactList
        })
      }
    })
  }

  filterContacts(contacts) {
     fetch('https://temo-api.herokuapp.com/users/show', {
        method: 'post',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({
        contacts: contacts,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson !== null) {
        this.setState({
          contactList: responseJson
        })
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
  }

  handleContactChoice(rowData){
    const number = rowData['phoneNumbers'][0]['number']
    this.onContactPress(number)
  }


  render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.state.contactList || [])
    return (
      <View style={styles.listContainer}>
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={(rowData, sectionID, rowID) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.handleContactChoice(rowData, rowData.givenName)}
              >
                <Text style={{flex: 1, fontSize: 30, color: '#00b0ff', fontFamily: 'Avenir'}}>
                  {rowData.givenName}
                </Text>
              </TouchableOpacity>
          )}
        />
      </View>
   );
  }


  onContactPress(usertwo_phone, secondUser){
    global.secondUser = secondUser
    global.userTwo = usertwo_phone
    var _self = this

      fetch('https://temo-api.herokuapp.com/conversations', {
        method: 'post',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({
        user_one: currentUser,
        user_two: usertwo_phone,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        debugger


        global.currentChannel = responseJson.channel

        sb.OpenChannel.getChannel(currentChannel.channel_url, function (channel, error) {
         if (error) {
             console.error(error);
             return;
         }

         channel.enter(function(response, error){
             if (error) {
                 console.error(error);
             } else {
               global.currentChannel = channel
               _self.props.navigator.push({name: 'chat', channel: channel.url});
             }
           });
         });
      } else {
        debugger
        console.error("bad");
        sb.OpenChannel.createChannel("rand", "", "", [sb.currentUser.userId], function (channel, error) {
          _self.setState({channel: channel})
          global.currentChannel = channel

            if (error) {
                return;
            }
            channel.enter(function(response, error){
              console.log("now here")
                if (error) {
                    return;
                }
                fetch('https://temo-api.herokuapp.com/conversations', {
                  method: 'post',
                  headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                  body: JSON.stringify({
                  channel_url: channel,
                  user_one: currentUser,
                  user_two: usertwo_phone,
                })
              })
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson) {
                  _self.props.navigator.push({name: 'chat', channel: channel.url});
                } else {
                }

              })
            });
        });
      }
    })




    }
  }


  const styles = StyleSheet.create({
    listContainer: {
      top: 10,
      flex: 11,
      justifyContent: 'center',
      backgroundColor: '#e0e0e0',
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
      height: 50,
      padding: 5,
    },
    listIcon: {
      justifyContent: 'flex-start',
      paddingLeft: 15,
      paddingRight: 15,
    }
  });
