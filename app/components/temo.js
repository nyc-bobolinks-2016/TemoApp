import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  TouchableOpacity,
  View
} from 'react-native';

import NavMenu from './navMenu';

export default class Temo extends Component {

 render() {
  console.log(currentUser)
   return (
     <View style={styles.container}>
      <NavMenu navigator={this.props.navigator}/>
     </View>
   )
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
