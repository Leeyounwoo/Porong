import React, {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {markerContain, reducer} from './reducer';
import {Notifications} from 'react-native-notifications';
import {getAlert} from './functions/getAlert';
import rootReducer from './reducer/index';
import Geolocation from 'react-native-geolocation-service';
import {positionContain} from './reducer/index';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Signin from './screens/Signin';
import PhoneForm from './screens/PhoneForm';
import axios from 'axios';

const store = createStore(rootReducer);
const init = createStackNavigator();
const Stack = createStackNavigator();
async function requestCameraPermission() {
  //Calling the permission function
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'AndoridPermissionExample App Camera Permission',
      message: 'AndoridPermissionExample App needs access to your camera ',
    },
  );
}

// 지도상의 두 좌표간의 거리 계산
function calDistance(lat1, long1, lat2, long2) {
  // var startLatRads = degreesToRadians(lat1);
  // var startLongRads = degreesToRadians(long1);
  // var destLatRads = degreesToRadians(lat2);
  // var destLongRads = degreesToRadians(long2);

  var Radius = 6371; //지구의 반경(km)

  var dLat = degreesToRadians(lat1 - lat2);
  var dLng = degreesToRadians(long1 - long2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = Radius * c; // Distance in km
  return d * 1000;

  // var distance =
  //   Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads),
  //   ) * Radius;
}

function degreesToRadians(degrees) {
  radians = degrees * (Math.PI / 180);
  return radians;
}

requestCameraPermission();
Geolocation.watchPosition(
  position => {
    store.dispatch(
      positionContain(position.coords.latitude, position.coords.longitude),
    );
  },
  error => {
    // See error code charts below.
    console.log(error.code, error.message);
  },
  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
);

const App = () => {
  const [messageIdList, setMessageIdList] = useState([]);
  const [messageLocations, setMessageLocations] = useState({});
  const [flag, setFlag] = useState(false);
  const [updateCnt, setUpdateCnt] = useState(0);
  const pos = null;
  const [userLat, setUserLat] = useState(0); // 위도
  const [userLng, setUserLng] = useState(0); // 경도

  useEffect(() => {
    console.log('position test ', userLat, userLng);

    // if (userLat && userLng) {
    //   console.log("check11");
    AsyncStorage.getAllKeys((err, keys) => {
      const messageKeys = keys.filter(key => key[0] !== 'A');
      AsyncStorage.multiGet(messageKeys, async (err, results) => {
        results.map((result, idx) => {
          console.log('yrdy :        ', result);
          const key = results[idx][0];
          const value = JSON.parse(results[idx][1]);

          if (key !== 'user' && key !== 'receivedMessages') {
            const latitude = parseFloat(value['latitude']);
            const longitude = parseInt(value['longitude']);
            const distance = calDistance(userLat, userLng, latitude, longitude);

            if (distance <= 100000) {
              console.log('check!!0');
              axios
                .post(
                  'http://k6c102.p.ssafy.io:8080/v1/message/postSatisfyFCM',
                  null,
                  {
                    params: {
                      messageId: parseInt(key),
                    },
                  },
                )
                .catch(err => {
                  console.log(err);
                });
            }
          }
        });
      });
    });
    // }
  }, [userLat, userLng]);

  const LoginProcess = () => {
    return (
      <init.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <init.Screen name="Login" component={Login} />
        <init.Screen name="Signin" component={Signin} />
        <init.Screen name="Phone" component={PhoneForm} />
      </init.Navigator>
    );
  };

  const Stacks = () => {
    const [isLogin, setIsLogin] = React.useState(false);
    AsyncStorage.getItem('user')
      .then(info => {
        if (info !== null) {
          setIsLogin(true);
        }
      })
      .catch(err => {
        console.log('AsyncStorage getUser err', err);
      });

    return (
      <Stack.Navigator
        initialRouteName={isLogin ? 'Main' : 'login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginStack" component={LoginProcess} />
        <Stack.Screen name="Main" component={Tabs} />
      </Stack.Navigator>
    );
  };

  // 사용자가 50m 이동할 때마다 거리 계산
  // 메세지와의 거리가 50m 이내인 경우, FCM 요청
  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        setUserLat(position.coords.latitude); // 위도
        setUserLng(position.coords.longitude); // 경도
      },
      err => console.warn(err),
      {distanceFilter: 0.5},
    );
  }, []);

  // 새로운 알림 왔을 때
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await getAlert(remoteMessage);

      if (store.getState().userreducer.memberId) {
        axios
          .get(
            `http://k6c102.p.ssafy.io:8080/v1/message/${
              store.getState().userreducer.memberId
            }/fetchUncheckedMesaages`,
          )
          .then(json => {
            let received = [];
            console.log(json);
            json.data.map(single => {
              received.push(single);
            });
            store.dispatch(markerContain(received));
          })
          .catch(err => {
            console.log('data error ', err);
          });
      }
      // Show an alert to the user
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
