import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';


const sendbird = require('sendbird');
const windowSize = Dimensions.get('window');

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messageList: []
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }
  
componentWillMount() {
  sendbird.events.obMessageRecieved = (obj) => {
    this.setState({messageList: this.state.messageList.concat([obj])})
  };
  this.getMessage();
};

getMessages() {
  sendbird.getMessagesLoadMore({
    limit: 100,
    successFunc: (data) => {
      data.messages.reverse().forEach(function(msg, index){
        if(sendbird.isMessage(msg.cmd)) {
          _messageList.push(msg.payload);
        }
      });
      this.setState({ messageList: _messageList.concat(this.state.messageList) });
    },
    errorFunc: (status, error) => {
      console.log(status, error);
    }
  });
}

onSendPress() {
  sendbird.message(this.state.message);
  this.setState({message: ''});
}


 render() {
   return (
     <View style={styles.container}>
        <TouchableHighlight
        underlayColor={'#4e4273'}
        onPress={this.onBackPress}
        style={{marginLeft: 15}}
        >
        <Text style={{color: "#000"}}>&lt; Back</Text>
        </TouchableHighlight>
        <Text>Chat</Text>
       <TextInput
       style={styles.input}
       value={this.state.mesage}
       onChangeText={(text) => this.setState({message: text})}
       />
       <TouchableHighlight
        underlayColor={'#4e4273'}
        onPress={() => this.onSendPress()}
        >
        <Text style={styles.sendLabel}>send</Text>
       </TouchableHighlight>
     </View>
   );
 }

 onBackPress() {
   sendbird.disconnect();
   this.props.navigator.pop();
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
