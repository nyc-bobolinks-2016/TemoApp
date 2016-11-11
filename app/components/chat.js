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
  Modal,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import SendBird from 'sendbird';

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
      userMessage: true,
    }
    messageCheck = this.state.userMessage
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
        _self.setState({ messageList: _messageList.concat(_self.state.messageList), userMessage: _self.state.userMessage = false });
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
    this.setState({message: '', messageList: this.state.messageList.concat([messages]), userMessage: this.state.userMessage = false})
  }

  handleKey(e) {
    if (e.nativeEvent.key === " ") {
      this.setState({fullWord: true})
    }
    else if (e.nativeEvent.keyCode === 13) {
      console.log("this is an enter press")
    }
    else {
      this.setState({fullWord: false})
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

  renderRow(rowData, sectionID, rowID){
      if(messageCheck){
    return <Text style={styles.rightContain}>{rowData}</Text>
      } else {
     return <Text style={styles.leftContain}>{rowData}</Text>
     }
  }



 render() {
   const data = this.state.dataSource.cloneWithRows(this.state.messageList || [])
   return (
     <View style={styles.outerContainer}>
        <TouchableHighlight

        underlayColor={'#4e4273'}
        onPress={this.onBackPress.bind(this)}
        style={{marginLeft: 15}}
        >
        <Text style={{color: "#000", padding: 20}}>&lt; Back</Text>
        </TouchableHighlight>
        <Text>Chat</Text>
          <ListView
            enableEmptySections
            dataSource={data}
            renderRow={this.renderRow}
        />
       <TextInput
         style={styles.textInput}
         value={this.state.message}
         onKeyPress={this.handleKey.bind(this)}
         onChangeText={this.handleChange.bind(this)}
       />
     <Text style={{color: "#e040fb", height: 20, padding: 25}}>
        Sentiment : {Math.floor(this.state.percentage * 100)}%
       </Text>
       <TouchableHighlight
         underlayColor={'#4e4273'}
         onPress={() => this.onSendPress()}
        >
        <Text style={styles.sendLabel}>send</Text>
       </TouchableHighlight>
       <KeyboardSpacer/>
     </View>
   );
 }

 onBackPress() {
   sb.disconnect();
   this.props.navigator.pop();
 }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  segment: {
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  rightContain: {
    flex: 0,
    // backgroundColor: '#90caf9',
    justifyContent: 'flex-end',
    borderColor: '#c5cae9',
    flexDirection: 'column',
    borderWidth:4,
    borderRadius: 10,
    width: 200,
    padding: 5,
    margin: 3,
  },
  leftContain: {
    flex: 0,
    // backgroundColor: '#ce93d8',
    borderColor: '#0277bd',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    borderWidth:4,
    borderRadius: 10,
    width: 200,
    padding: 5,
    margin: 3,
  },
});
