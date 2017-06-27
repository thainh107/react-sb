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
  apiKey: "AIzaSyCoPVnk7mhwow2VdhqEnAVigK3Xyllm6A4",
  authDomain: "cudauuat.firebaseapp.com",
  databaseURL: "https://cudauuat.firebaseio.com",
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

  componentDidMount() {
    return fetch('https://sb-api.vndirect.com.vn/api/posts/query?type=community&page_index=70&lastUpdated=1498457689447', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 'Authorization': 'e66becd26f3a44b792f2e55524031f55'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson)
        })
      })
    // firebaseApp.database().ref(`postsByNickname/HaoHaoChuaCay`).once('value')
    //   .then((snap) => {
    //     console.log(snap.val());
    //     this.setState({
    //       isLoading: false,
    //       dataSource: ds.cloneWithRows(snap.val()),
    //     }, function () {
    //       // do something with new state
    //     });
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  render() {
    
    if (this.state.isLoading) {
      return (
        <View styls={{ flex: 1, paddingTop: 20 }}>
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
