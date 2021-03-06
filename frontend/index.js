/**
 * @format
 */

import { AppRegistry } from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {getAlert} from './functions/getAlert';
import MessageDetail from './screens/MessageDetail';
import Readable from './components/Readable';
import Nodereadable from './components/Notreadable';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
  // getAlert(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
