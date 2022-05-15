import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
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
import Geolocation from '@react-native-community/geolocation';
import {positionContain} from './reducer/index';
const store = createStore(rootReducer);

// async function saveTokenToDatabase(token) {
//   console.log('토큰', token);
// }
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

  // 이미 Async Storage에 존재하는 데이터 가져올 때 비동기문제 해결하기 위한 함수
  const updateMessageLocations = (keys, stores) => {
    stores.map((store, idx) => {
      const key = store[0];
      const value = JSON.parse(store[1]);
      setMessageLocations(prevMessageLocations => {
        return {...prevMessageLocations, [key]: value};
      });
    });
  };

  // 메세지 상태 관리 (Async Storage)
  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      const messageKeys = keys.filter(key => key[0] === 'M');
      console.log('in app', messageKeys);
      AsyncStorage.multiGet(messageKeys, async (err, stores) => {
        await updateMessageLocations(messageKeys, stores);
        await setMessageIdList(messageKeys);
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
      case 'time_satisfaction':
        console.log('time_satisfaction Alert');
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
        console.log('message_receive Alert');

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

  // 임의로 메세지 보내는 코드
  useEffect(async () => {
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

    const tempRemoteMessage21 = {
      data: {
        alertId: 'A202205091951004',
        messageId: 'M202205091951002',
        alertType: 'time_satisfaction',
        senderNickname: '윤설1',
        place: '장덕동 1333',
        latitude: 38.190589347561485,
        longitude: 129.81490193851873,
      },
    };
    const tempRemoteMessage22 = {
      notification: {
        body: '내용',
        title: '제목',
      },
      data: {
        alertId: 'A202205091951014',
        messageId: 'M202205091951012',
        alertType: 'time_satisfaction',
        senderNickname: '윤설2',
        place: '장덕동 1333',
        latitude: 38.190589347561485,
        longitude: 129.81490193851873,
      },
    };

    const tempRemoteMessage3 = {
      data: {
        alertId: 'A202205091951015',
        messageId: 'M202205091951012',
        alertType: 'message_receive',
        senderNickname: '윤설',
        place: '장덕동 1333',
      },
    };

    const tempRemoteMessage31 = {
      data: {
        alertId: 'A202205091951016',
        messageId: 'M202205091951013',
        alertType: 'message_receive',
        senderNickname: '윤설',
        place: '장덕동 1333',
      },
    };

    // await getAlert(tempRemoteMessage22);
    // manageMessageState(tempRemoteMessage22);
    // await getAlert(tempRemoteMessage3);
    // manageMessageState(tempRemoteMessage3);
    await getAlert(tempRemoteMessage31);
    manageMessageState(tempRemoteMessage31);
    // getAlert(tempRemoteMessage1);
    // await getAlert(tempRemoteMessage22);
    // manageMessageState(tempRemoteMessage22);
    // getAlert(tempRemoteMessage3);
  }, []);

  // 메세지 상태가 잘 바뀌는지 확인할 수 있는 코드
  useEffect(() => {
    console.log('메세지 수', messageIdList.length);
    messageIdList.map((messageId, idx) => {
      if (messageLocations[messageIdList[idx]]) {
        console.log('1messageId: ', messageIdList[idx]);
        console.log('total: ', messageLocations[messageIdList[idx]]);
        console.log(
          '1latitude: ',
          messageLocations[messageIdList[idx]]['latitude'],
        );
        console.log(
          '1longitude: ',
          messageLocations[messageIdList[idx]]['longitude'],
        );
      }
    });
  }, [updateCnt]);

  // // 토큰을 생성하는 코드
  // useEffect(() => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       return saveTokenToDatabase(token);
  //     });
  // });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
