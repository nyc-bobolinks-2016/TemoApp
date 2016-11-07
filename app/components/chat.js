import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';


import SendBird from 'sendbird'

const windowSize = Dimensions.get('window');

export default class Chat extends Component {
  constructor() {
    super();
    sb = SendBird.getInstance();
    self = this
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      message: '',
      messageList: [],
      dataSource: ds.cloneWithRows([]),
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentWillMount() {

  };

  componentWillUnmount() {
    sb.removeChannelHandler('MessageHandler');
  }

  getMessages() {
    sb.getMessagesLoadMore({
      limit: 100,
      successFunc: (data) => {
        data.messages.reverse().forEach(function(msg, index){
          if(sb.isMessage(msg.cmd)) {
            _messageList.push(msg.payload);
          }
        });
        _self.setState({ messageList: _messageList.concat(_self.state.messageList) });
      },
      errorFunc: (status, error) => {
        console.log(status, error);
      }
    });
  }

  onSendPress() {
    this.state.channel.sendUserMessage(this.state.message, DATA, function(message, error){
        if (error) {
            console.error(error);
            return;
        }
        console.log(message);
    });

    sb.message(_self.state.message);
    _self.setState({message: ''});
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
       style={styles.container}
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
   sb.disconnect();
   _self.props.navigator.pop();
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
