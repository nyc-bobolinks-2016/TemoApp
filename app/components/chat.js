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
    console.disableYellowBox = true;
    sb = SendBird.getInstance();
    self = this
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      msgColor:  '#00b0ff',
      counter: 0,
      align: 'right',
      color: 'white',
      width: 0,
      percentage: '',
      fullWord: false,
      message: '',
      messageList: [],
      dataSource: ds.cloneWithRows([]),
      userMessage: false,
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
          _self.setState({userMessage: _self.state.userMessage = false, messageList: _messageList.concat(_self.state.messageList)});
          // , userMessage: _self.state.userMessage = false
        });
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
    if (this.state.align == 'right') {
      var dir = 'left'
    } else {
      var dir = 'right'
    }
    this.setState({userMessage: this.state.userMessage = true, align: dir, message: '', messageList: this.state.messageList.concat([messages])});
  }
  // , userMessage: this.state.userMessage = true

  handleKey(e) {
    var n = 0
    if (this.state.counter === 3 || e.nativeEvent.key === " ") {
      this.setState({fullWord: true, counter: 0})
    }
    else {
      n = this.state.counter + 1
      this.setState({counter: n})
    }
  }

  handleChange(value) {
    _self = this
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
            this.setState({width: Math.floor(this.state.percentage * 100)})
            if (this.state.percentage > .66) {
              this.setState({color: 'green'})
            } else if (this.state.percentage > .33) {
              this.setState({color: 'orange'})
            } else if ((this.state.percentage < .33)) {
              this.setState({color: 'red'})
            }
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
     <View>
     <View style={styles.outerContainer}>
        <TouchableOpacity
        underlayColor={'#4e4273'}
        onPress={this.onBackPress.bind(this)}
        style={{marginLeft: 15}}
        >
        <Text style={{color: "#000", padding: 20}}>&lt; Back</Text>
        </TouchableOpacity>
        <View style={{ height: 500}}>
          <Text style={{textAlign: 'center'}}>Chat</Text>
            <ListView
              style={{backgroundColor: '#e3f2fd'}}
              enableEmptySections
              dataSource={data}
              renderRow={this.renderRow}
          />
          </View>
            <View style={{backgroundColor: this.state.color , width: this.state.width*4, height: 5}}>
          </View>


          <View style={{flex: 1, flexDirection: 'row', height: 300}}>
           <TextInput
             style={styles.textInput}
             value={this.state.message}
             onKeyPress={this.handleKey.bind(this)}
             onChangeText={this.handleChange.bind(this)}
           />
         <View>
           <TouchableOpacity
             style={{borderWidth: 1, borderRadius: 5, width: 70, height: 44, backgroundColor: '#00b0ff'}}
               onPress={() => this.onSendPress()}
            >
            <Text style={{color: 'white', fontSize: 33, fontWeight: "100", fontFamily: 'AppleSDGothicNeo-Thin'}}>Send</Text>
           </TouchableOpacity>
         </View>
        </View>
     </View>
     <KeyboardSpacer/>
     </View>
   );
 }

 onBackPress() {
   this.props.navigator.pop();
 }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 200,

  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: 305,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  segment: {
    marginBottom: 10,
  },
  sendLabel: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
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
