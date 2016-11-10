'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Temo from './components/temo';
import Contacts from './components/contacts';
import Welcome from './components/welcome';
import Conversations from './components/conversations';
import Login from './components/login';
import Signup from './components/signup';
import Chat from './components/chat';


export default class Main extends Component {


    renderScene(route, navigator) {
      if(route.name === 'contacts') {
        return <Contacts navigator={navigator} />
      }
      if(route.name === 'conversations') {
        return <Conversations navigator={navigator} />
      }
      if(route.name === 'temo') {
        return <Temo navigator={navigator} />
      }
      if(route.name === 'welcome') {
        return <Welcome navigator={navigator} />
      }
      if(route.name === 'login') {
        return <Login navigator={navigator} />
      }
      if(route.name === 'signup') {
        return <Signup navigator={navigator} />
      }
      if(route.name === 'chat') {
        return <Chat navigator={navigator} />
      }
    }

    render() {
      return (
        <Navigator


        navigationBar={
             <Navigator.NavigationBar
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                  { return (<Text>Contacts</Text>); },
                 RightButton: (route, navigator, index, navState) =>
                   { return (<Text>Messages</Text>); },
                 Title: (route, navigator, index, navState) =>
                   { return (<Text>Temo</Text>); },
               }}
             />
          }


          style={{flex: 1, backgroundColor: '#eeeeee'}}
          initialRoute = {{name: 'welcome'}}
          renderScene = {this.renderScene}

        />
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eeeeee',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
