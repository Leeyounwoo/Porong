/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {AsyncStorage} from 'react-native';
import {getAlert} from './functions/getAlert';
import Geolocation from '@react-native-community/geolocation';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // getAlert(remoteMessage)
});

// function deg2rad(deg) {
//   return (deg * Math.PI) / 180;
// }
// function rad2deg(rad) {
//   return (rad * 180) / Math.PI;
// }

// function calcDistance(lat1, lon1, lat2, lon2) {
//   var theta = lon1 - lon2;
//   dist =
//     Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
//     Math.cos(deg2rad(lat1)) *
//       Math.cos(deg2rad(lat2)) *
//       Math.cos(deg2rad(theta));
//   dist = Math.acos(dist);
//   dist = rad2deg(dist);
//   dist = dist * 60 * 1.1515;
//   dist = dist * 1.609344;
//   return Number(dist * 1000).toFixed(2);
// }

const watchID = Geolocation.watchPosition(
  position => {
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
    console.log(`위도: ${latitude}, 경도: ${longitude}`);
    alert(`위도: ${latitude}, 경도: ${longitude}`);
  },
  err => console.warn(err),
  {distanceFilter: 0.5},
);

AppRegistry.registerComponent(appName, () => App);
