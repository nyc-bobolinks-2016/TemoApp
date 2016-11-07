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
const sendbird = require('sendbird');
const ContactsList = require('react-native-contacts');
import NavButton from './navButton';
import NavMenu from './navMenu';



export default class Contacts extends Component {
  constructor() {
    super();
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
        console.log(contacts)
        this.setState({contactList: contacts})
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.contactList)})
    })
  }

  render() {
   return (
     <View>
     <ListView
     dataSource={this.state.dataSource}
     renderRow={(rowData) =>
       <TouchableOpacity onPress={() => this.onContactPress()}>
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


  onContactPress(){
    fetch('https://api.sendbird.com/v3/open_channels', {
      method: 'POST',
      body: JSON.stringify({
    "documents": [
      {
          "cover_url": "",
      }
    ]
    }),
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Api-Token': '0542663449a1134c749ea3db0c290967722e1e26'}
    })
    .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            console.log(responseJson)
        };
        })
        .catch((error) => {
          console.error(error);
        });
    };
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
