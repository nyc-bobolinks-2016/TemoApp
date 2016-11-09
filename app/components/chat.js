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
      channel: this.props.channel,
      userOne: this.props.userOne,
      userTwo: this.props.userOne,
      message: '',
      messageList: [],
      dataSource: ds.cloneWithRows([]),
      fullWord: false,
      percentage: '',
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name : routeName
    })
  }

  componentWillUnmount() {
    sb.removeChannelHandler('MessageHandler');
  }


  componentDidMount(){
    var ChannelHandler = new sb.ChannelHandler();
    var _messages = [];
    ChannelHandler.onMessageReceived = function(channel, message){
    console.log(channel, message);
    _messages.push(message);
    };
    this.setState({
      messageList: this.state.messageList.concat(_messages),
      dataSource: this.state.dataSource.cloneWithRows(this.messageList)
    })
    sb.addChannelHandler("MessageHandler", ChannelHandler);
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
    var messages = []
    this.props.channel.sendUserMessage(this.state.message, DATA, function(message, error){
        if (error) {
            console.error(error);
            return;
        }
        console.log(message);
        messages.push(message)
    });

    this.setState({message: '', messageList: this.messageList.concat([messages])});
  }


  handleKey(e) {
    if (e.nativeEvent.key == " ") {
      this.setState({fullWord: true})
    } else {
      this.setState({fullWord: false})
    }
  }


  handleChange(value) {
   this.setState({message: value})
   console.log(this.state.message)

   if (this.state.full_word == true) {
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
           return responseJson.documents[0].score;
         };
         })
         .catch((error) => {
           console.error(error);
         });
       }
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
        <Text style={styles.welcome}>send</Text>
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
