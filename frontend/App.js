import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import rootReducer from './reducer/index';
import Geolocation from '@react-native-community/geolocation';
import { positionContain } from './reducer/index';
const store = createStore(rootReducer);

// Geolocation.watchPosition(
//   position => {
//     store.dispatch(positionContain(position.coords.latitude, position.coords.longitude));
//     console.log(store)
//   },
//   error => {
//     // See error code charts below.
//     console.log(error.code, error.message);
//   },
//   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
// );

// messaging().onMessage(async remoteMessage => {
//   // Get the message body
//   let message_body = remoteMessage.notification.body;

//   // Get the message title
//   let message_title = remoteMessage.notification.title;

//   // Get message image
//   let avatar = remoteMessage.notification.android.imageUrl;

//   // Show an alert to the user
//   Alert.alert(message_title, message_body);
// });


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
