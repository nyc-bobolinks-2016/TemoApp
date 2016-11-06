import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View} from 'react-native';

export default class Temo extends Component {

constructor() {
    super();
    this.state = {
      percentage: '',
      message: ''
    };
  }

 handleChange(value) {
  this.setState({message: value})
  console.log(this.state.message)
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Temo}>
          Temo
        </Text>
          <TextInput
          style={{height: 40}}
          placeholder="Get Sentiment"
          value={this.state.message}
          onChangeText={ this.handleChange.bind(this)} />
      </View>
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
  Temo: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Temo', () => Temo);
