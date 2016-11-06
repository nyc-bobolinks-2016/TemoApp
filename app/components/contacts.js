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

const PULLDOWN_DISTANCE = 40;
const sendbird = require('sendbird');
const ContactsList = require('react-native-contacts');


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

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
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
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text style={styles.container}>{rowData.familyName}</Text>}
      />
   );
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
