/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {AsyncStorage} from 'react-native';
import {getAlert} from './functions/getAlert';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // getAlert(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
