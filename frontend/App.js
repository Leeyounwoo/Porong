import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {reducer} from './reducer';

messaging().onMessage(async remoteMessage => {
  // Get the message body
  let message_body = remoteMessage.notification.body;

  // Get the message title
  let message_title = remoteMessage.notification.title;

  // Get message image
  let avatar = remoteMessage.notification.android.imageUrl;

  // Show an alert to the user
  Alert.alert(message_title, message_body);
});

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
