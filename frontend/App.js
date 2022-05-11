import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {AsyncStorage} from 'react-native';
import {reducer} from './reducer';
import {Notifications} from 'react-native-notifications';
import {getAlert} from './functions/getAlert';

messaging().onMessage(async remoteMessage => {
  // Get the message body
  let message_body = remoteMessage.notification.body;

  // Get the message title
  let message_title = remoteMessage.notification.title;

  // Get message image
  let avatar = remoteMessage.notification.android.imageUrl;

  // getAlert(remoteMessage);

  // Show an alert to the user
  Alert.alert(message_title, message_body);
});

const store = createStore(reducer);

async function saveTokenToDatabase(token) {
  console.log('토큰', token);
}

const App = () => {
  useEffect(() => {
    const tempRemoteMessage1 = {
      data: {
        alertId: 'A202205091951001',
        messageId: 'M202205091951001',
        alertType: 'message_condition',
        senderNickname: '윤설',
        place: '장덕동 1333',
        time: '2022년 4월 20일 00시 01분',
      },
    };

    const tempRemoteMessage2 = {
      data: {
        alertId: 'A202205091951002',
        messageId: 'M202205091951001',
        alertType: 'time_satisfaction',
        senderNickname: '윤설',
        place: '장덕동 1333',
        latitude: '37.439801',
        longitude: '127.127730',
      },
    };

    const tempRemoteMessage3 = {
      data: {
        alertId: 'A202205091951003',
        messageId: 'M202205091951001',
        alertType: 'message_receive',
        senderNickname: '윤설',
        place: '장덕동 1333',
      },
    };

    getAlert(tempRemoteMessage1);
    getAlert(tempRemoteMessage2);
    getAlert(tempRemoteMessage3);
  }, []);
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
