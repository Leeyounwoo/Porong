import React, {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer} from './reducer';
import {Notifications} from 'react-native-notifications';
import {getAlert} from './functions/getAlert';
import rootReducer from './reducer/index';
import Geolocation from 'react-native-geolocation-service';
import {positionContain} from './reducer/index';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Signin from './screens/Signin';
import PhoneForm from './screens/PhoneForm';

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

  // 지도상의 두 좌표간의 거리 계산
  function calcDistance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) return 0;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let distance =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (distance > 1) distance = 1;

    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515 * 1.609344 * 1000;
    if (distance < 100) distance = Math.round(distance / 10) * 10;
    else distance = Math.round(distance / 100) * 100;
    return distance;
  }

  const loginProcess = () => {
    return (
      <init.Navigator initialRouteName="Login">
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
        console.log('err', err);
      });

    return (
      <Stack.Navigator
        initialRouteName={isLogin ? 'Main' : 'login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="login" component={loginProcess} />
      </Stack.Navigator>
    );
  };

  // 사용자가 50m 이동할 때마다 거리 계산
  // 메세지와의 거리가 50m 이내인 경우, 메세지 받기 API 호출 + Async Storage 에서 삭제 + 받은 메세지 Set에 추가
  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        const messageDistances = {};
        const userLatitude = position.coords.latitude; // 위도
        const userLongitude = position.coords.longitude; // 경도
        messageIdList.map((messageId, idx) => {
          if (messageLocations[messageIdList[idx]]) {
            if (
              flag &&
              messageLocations[messageIdList[idx]]['latitude'] !== undefined &&
              messageLocations[messageIdList[idx]]['longitude'] !== undefined
            ) {
              const tempMessageId = messageIdList[idx];
              const distance = calcDistance(
                userLatitude,
                userLongitude,
                messageLocations[messageIdList[idx]]['latitude'],
                messageLocations[messageIdList[idx]]['longitude'],
              );
              console.log('거리', distance);
              if (messageDistances[distance] === undefined) {
                messageDistances[distance] = [tempMessageId];
              } else {
                messageDistances[distance].push(tempMessageId);
              }
            }
          }
        });
        console.log('거리들', messageDistances);
        const minDistance = Math.min(Object.keys(messageDistances));
        console.log('가장 짧은 거리', minDistance);
        if (minDistance <= 50) {
          console.log('50m 이내에 있습니다.');
        }
      },
      err => console.warn(err),
      {distanceFilter: 0.5},
    );
  }, [flag]);

  // 메세지 위치 동기화 함수
  const updateMessageLocations = stores => {
    stores.map((store, idx) => {
      const key = store[0];
      const value = JSON.parse(store[1]);
      setMessageLocations(prevMessageLocations => {
        return {...prevMessageLocations, [key]: value};
      });
    });
  };

  // 메세지 ID 리스트 동기화 함수
  const updateMessageIdList = messageKeys => {
    messageKeys.map((messageKey, kidx) => {
      setMessageIdList(prev => [...prev, messageKeys[kidx]]);
    });
  };

  // 메세지 상태 관리 (Async Storage)
  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      const messageKeys = keys.filter(key => key[0] !== 'A');
      AsyncStorage.multiGet(messageKeys, async (err, stores) => {
        await updateMessageLocations(stores);
        await updateMessageIdList(messageKeys);
        await setUpdateCnt(prev => prev + 1);
        await setFlag(true);
      });
    });
  }, []);

  // 메세지 상태 관리 (새로운 알림)
  const manageMessageState = async remoteMessage => {
    const alertType = remoteMessage.data.alertType;
    const messageId = remoteMessage.data.messageId;
    switch (alertType) {
      case 'message_condition':
        const latitude = remoteMessage.data.latitude;
        const longitude = remoteMessage.data.longitude;
        await setMessageLocations(prevMessageLocations => {
          return {
            ...prevMessageLocations,
            [messageId]: {latitude: latitude, longitude: longitude},
          };
        });
        await setMessageIdList(prevMessageIdList => [
          ...prevMessageIdList,
          messageId,
        ]);
        setUpdateCnt(prev => prev + 1);
        break;

      case 'message_receive':
        const tempMessageLocations = messageLocations;
        await delete tempMessageLocations[messageId];
        await setMessageLocations(tempMessageLocations);
        setMessageIdList(
          messageIdList.filter(tempMessageId => tempMessageId !== messageId),
        );
        break;
    }
  };

  // 새로운 알림 왔을 때
  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      console.log('async Keys', keys);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await getAlert(remoteMessage);
      manageMessageState(remoteMessage);

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
