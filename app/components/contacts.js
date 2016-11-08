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
    sb = SendBird.getInstance();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      contactList: [],
      page: 0,
      next: 0,
    }
  }

  navigate() {
    this.props.navigator.pop()
  }

  componentWillMount(){
    ContactsList.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){

      } else {
        contacts.forEach((contact)=>{
          fetch('https://temo-api.herokuapp.com/users/show', {
              method: 'post',
              headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
              body: JSON.stringify({
              phone: contact.phoneNumbers[0].number,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.created_at) {
              this.setState({contactList: this.state.contactList.concat(contact)})
            }
          })
        })
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.contactList)})
    })
  }

  render() {
    console.log(this.state.contactList)
   return (
     <View>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
         <TouchableOpacity onPress={() => this.onContactPress(rowData.phoneNumbers[0].number)}>
           <Text style={styles.container}>{rowData.familyName}</Text>
         </TouchableOpacity>
       }
       />
     <NavButton
       onPress={this.navigate.bind(this)}
       text='Back'
       style={{ fontSize: 20, color: "grey"}}
     />
     <NavMenu
     style={styles.container}
     navigator={this.props.navigator}
     />
     </View>
   );
  }


    onContactPress(usertwo_phone){
      console.log("in there")

      var _self = this
      sb.OpenChannel.createChannel("rand", "", "", [sb.currentUser.userId], function (channel, error) {
        console.log("in here")

          if (error) {
              console.error(error);
              return;
          }
          channel.enter(function(response, error){
            console.log("now here")
              if (error) {
                  console.error(error);
                  return;
              }
              fetch('https://temo-api.herokuapp.com/conversations', {
                method: 'post',
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({
                channel_url: channel,
                user_one: sb.currentUser.nickname,
                user_two: usertwo_phone,
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                _self.props.navigator.push({name: 'chat', route: channel, usertwo: usertwo});
              } else {
                "invalid phone number"
              }

            })
          });
      });
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
