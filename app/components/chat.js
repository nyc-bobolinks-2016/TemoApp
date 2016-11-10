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
      percentage: '',
      fullWord: false,
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

  componentDidMount() {
    var ChannelHandler = new sb.ChannelHandler();
    var _self = this
    var __messages = []
    ChannelHandler.onMessageReceived = function(channel, message){
      console.log(channel, message)
      __messages.push(message)
      _self.setState({ messageList: _self.state.messageList.concat(message.message)});
    }
    sb.addChannelHandler("MessageHandler", ChannelHandler)
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.messageList || [])})
  }

  componentWillUnmount() {
    sb.removeChannelHandler('MessageHandler');
  }

  getMessages() {
    _messageList = []
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
    var messages = []

    currentChannel.sendUserMessage(this.state.message, '', function(message, error){
      console.log("helloooo from here")
        if (error) {
            console.error(error);
            return;
        }

        console.log("message", message.message);
        messages.push(message.message)
    });

    this.setState({message: '', messageList: this.state.messageList.concat([messages])});
  }

  handleKey(e) {
    if (e.nativeEvent.key === " ") {
      this.setState({fullWord: true})
    } else {
      this.setState({fullWord: true})
    }
  }

  handleChange(value) {
  this.setState({message: value})
  if (this.state.fullWord === true) {
    return fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', {
      method: 'POST',
      body: JSON.stringify({
    "documents": [
      {
        "language": "en",
        "id": "0",
        "text": this.state.message
      }
    ]
  }),
      headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': 'c629cc2e0c134d1cad4a33b8cb376462'}
    })
   .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.documents) {
            console.log(responseJson.documents[0].score)
            this.setState({percentage: responseJson.documents[0].score})
          return responseJson.documents[0].score;
        };
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }


 render() {
   const data = this.state.dataSource.cloneWithRows(this.state.messageList || [])

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
        <ListView
        enableEmptySections
        dataSource={data}
        renderRow={(rowData, sectionID, rowID) => (
          <Text>{rowData}</Text>
        )}
        />
       <TextInput
         style={{flex: 2, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}
         value={this.state.message}
         onKeyPress={this.handleKey.bind(this)}
         onChangeText={this.handleChange.bind(this)}
       />
       <Text>
        {Math.floor(this.state.percentage * 100)}
       </Text>
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
