import React, { Component } from 'react';

import { ActivityIndicator, StyleSheet, ListView, Text, View } from 'react-native';

import { users } from '../config/data';
import Row from './Row';
import * as firebase from 'firebase';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }, separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAh8D8OcCeDa01G_AWjfWU0wwaqcbcpkJg",
  authDomain: "cudaustream.firebaseapp.com",
  databaseURL: "https://cudaustream.firebaseio.com",
  storageBucket: "cudaustream.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);



class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

  }
  getLinkAvatarFromUserName(nickname) {
    return firebase.database().ref(`/userList/${nickname}`).once('value')
      .then(snapshot => {
        if(snapshot.val().avatar){
          return this.getAvatar(snapshot.val().avatar);
        }
      });
  }
  getAvatar(response) {
    return firebase.storage().ref(response).getDownloadURL().then((url) => {
      return url;
    });
  }

  componentDidMount() {
    return fetch('https://sb-api.vndirect.com.vn/api/posts/query?type=community&page_index=70&lastUpdated=1498457689447', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 'Authorization': 'e66becd26f3a44b792f2e55524031f55'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var arr = [];
        for (var key in responseJson) {
          if (responseJson.hasOwnProperty(key)) {
            // console.log(responseJson[key].createdBy);
            this.getLinkAvatarFromUserName(responseJson[key].createdBy).then((linkAvatar)=>{
              if(linkAvatar){
                responseJson[key].linkAvatar = linkAvatar;
              } else {
                responseJson[key].linkAvatar = '';
              }
            });
            responseJson[key].key = key;
          }
        }
        
        console.log(responseJson);
        // this.getLinkAvatarFromUserName(responseJson.)
        // this.getAvatar(responseJson);
        var hello = responseJson;
        console.log(hello)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson)
        })
      })

  }
  

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

export default Feed;
