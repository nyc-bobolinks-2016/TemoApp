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
  Image
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
      userMessages: [],
      messageList: [],
      dataSource: ds.cloneWithRows([]),
      userMessage: false,
    }
    messageCheck = this.state.userMessages
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
          _self.setState({ messageList: _messageList.concat(_self.state.messageList, userMessage: false,)});
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
    _self = this
    currentChannel.sendUserMessage(this.state.message, '', function(message, error){
      console.log("helloooo from here")
        if (error) {
            console.error(error);
            return;
        }

        console.log("message", message.message);
        messages.push(message.message)
        _self.state.userMessages.push(message.message)
    });
    if (this.state.align == 'right') {
      var dir = 'left'
    } else {
      var dir = 'right'
    }
    this.setState({userMessage: true, align: dir, message: '', messageList: this.state.messageList.concat([messages])});
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
      if(messageCheck.includes(rowData[0])){
    return <View style={{flexDirection: 'row'}}>
      <View style={{ marginRight: 5, marginBottom: 10, height: 25}}>
        <Image source={require('../../images/bg.jpg')} style={styles.userPic}>
        </Image>
      </View>
      <Text style={styles.rightContain}>{rowData}</Text>
    </View>
      } else {
     return <View style={{flexDirection: 'row'}}>
         <Text style={styles.leftContain}>{rowData}</Text>
         <View style={{ marginRight: 5, marginBottom: 10, height: 25}}>
           <Image source={require('../../images/bg.jpg')} style={styles.userPic}>
           </Image>
         </View>
       </View>
     }
  }




 render() {
   const data = this.state.dataSource.cloneWithRows(this.state.messageList || [])
   return (
     <View style={{flex: 1}}>
       <View style={styles.outerContainer}>
          <TouchableOpacity
          underlayColor={'#4e4273'}
          onPress={this.onBackPress.bind(this)}
          style={{marginLeft: 15}}
          >
          <Text style={{color: "#000", top: 20}}>&lt; Back</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, top: 5}}>
            <Text style={{textAlign: 'center'}}>Contact Name</Text>
              <ListView
                style={{backgroundColor: 'white'}}
                enableEmptySections
                dataSource={data}
                renderRow={this.renderRow}
            />
            </View>
              <View style={{backgroundColor: this.state.color , width: this.state.width*4, height: 5}}>
            </View>

            </View>
            <View style={{bottom: 0, flexDirection: 'row'}}>
             <TextInput
               style={styles.textInput}
               value={this.state.message}
               onKeyPress={this.handleKey.bind(this)}
               onChangeText={this.handleChange.bind(this)}
             />
           <View>
             <TouchableOpacity
               style={{ borderWidth: 1, borderRadius: 5, width: 70, height: 44, backgroundColor: '#00b0ff'}}
                 onPress={() => this.onSendPress()}
              >
              <Text style={{color: 'white', fontSize: 33, fontWeight: "100", fontFamily: 'AppleSDGothicNeo-Thin'}}>Send</Text>
             </TouchableOpacity>
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
    flex: 1,
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: 305,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  rightContain: {
    flex: 0,
    justifyContent: 'flex-end',
    backgroundColor: '#e0e0e0',
    flexDirection: 'column',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 3,
  },
  leftContain: {
    flex: 0,
    backgroundColor: '#64b5f6',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 3,
  },
  userPic: {
    borderRadius: 15,
    height: 35,
    width: 35,
    resizeMode: 'stretch'
  }
});
