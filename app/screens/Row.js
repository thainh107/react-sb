import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCoPVnk7mhwow2VdhqEnAVigK3Xyllm6A4",
//   authDomain: "cudauuat.firebaseapp.com",
//   databaseURL: "https://cudauuat.firebaseio.com",
//   storageBucket: "cudaustream.appspot.com"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// var pathReference = firebaseApp.database().ref(`avatars/HaoHaoChuaCay/thumb_1498036038668itachi-chibi-naruto-shippuuden-34225940-468-500`);
// pathReference.getDownloadURL().then((url)=>{
//     console.log(url)
// })

// avatars/HaoHaoChuaCay/thumb_1498036038668itachi-chibi-naruto-shippuuden-34225940-468-500.jpg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',

    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

const Row = (props) => (
    <View style={styles.container}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
            <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.photo} />
            <Text style={styles.text}>
                {`${props.createdByName}`}
            </Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF' }}>
            <Text style={styles.text}>
                {`${props.content}`}
            </Text>
        </View>
    </View>
);

export default Row;