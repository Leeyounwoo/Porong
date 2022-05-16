import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSatisfactionAlert from '../components/alert/TimeSatisfactionAlert';
import MessageReceiveAlert from '../components/alert/MessageReceiveAlert';
import MessageConditionAlert from '../components/alert/MessageConditionAlert';

export default function Alarm({navigation}) {
  const [alertKeys, setAlertKeys] = useState([]);
  const [alertLocations, setAlertLocations] = useState({});
  const [ready, setReady] = useState(false);

  // 알림 클릭시 메세지 디테일로 이동
  const goToMessageDetail = key => {
    console.log(alertLocations[key]['messageId']);
    navigation.push('Temp', {
      messageId: alertLocations[key]['messageId'],
    });
  };

  // 알림 객체 업데이트
  const updateAlertLocations = stores => {
    stores.map((store, idx) => {
      const key = store[0];
      const value = JSON.parse(store[1]);
      setAlertLocations(prevAlertLocations => {
        return {...prevAlertLocations, [key]: value};
      });
    });
  };

  // 알림ID 배열 업데이트
  const updateAlertKeys = keys => {
    keys.map((key, idx) => {
      setAlertKeys(prev => [...prev, keys[idx]]);
    });
  };

  // Async Storage에 있는 데이터 가져오기
  useEffect(() => {
    AsyncStorage.getItem('receivedMessages', (err, result) => {
      console.log('receivedMessages', result);
    });
    AsyncStorage.getAllKeys((err, keys) => {
      const talertKeys = [];
      keys.map((key, idx) => {
        if (keys[idx][0] === 'A') {
          talertKeys.push(keys[idx]);
        }
      });
      AsyncStorage.multiGet(keys, async (err, stores) => {
        await updateAlertLocations(stores);
        await updateAlertKeys(talertKeys);
      });
    });
  }, []);

  const deleteAll = () => {
    AsyncStorage.getAllKeys((err, tkeys) => {
      AsyncStorage.multiRemove(tkeys)
        .then(res => {
          AsyncStorage.getAllKeys((err, alertKeys) => {
            console.log('삭제 후', alertKeys);
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  return (
    <View style={styles.allcontainer}>
      <Button onPress={deleteAll} title={'지우기'}></Button>

      {alertKeys.map((key, idx) => {
        if (
          alertLocations[alertKeys[idx]]['alertType'] === 'message_condition'
        ) {
          return (
            <TouchableHighlight
              onPress={() => {
                goToMessageDetail(alertKeys[idx]);
              }}
              key={idx}>
              <MessageReceiveAlert
                senderNickname={
                  alertLocations[alertKeys[idx]]['senderNickname']
                }
                time={alertLocations[alertKeys[idx]]['time']}
                place={alertLocations[alertKeys[idx]]['place']}
                isChecked={alertLocations[alertKeys[idx]]['isChecked']}
              />
            </TouchableHighlight>
          );
        } else if (
          alertLocations[alertKeys[idx]]['alertType'] === 'time_satisfaction'
        ) {
          return (
            <TouchableHighlight
              onPress={() => {
                goToMessageDetail(alertKeys[idx]);
              }}
              key={idx}>
              <TimeSatisfactionAlert
                senderNickname={
                  alertLocations[alertKeys[idx]]['senderNickname']
                }
                place={alertLocations[alertKeys[idx]]['place']}
                isChecked={alertLocations[alertKeys[idx]]['isChecked']}
              />
            </TouchableHighlight>
          );
        } else if (
          alertLocations[alertKeys[idx]]['alertType'] === 'message_receive'
        ) {
          return (
            <TouchableHighlight
              onPress={() => {
                goToMessageDetail(alertKeys[idx]);
              }}
              key={idx}>
              <MessageConditionAlert
                senderNickname={
                  alertLocations[alertKeys[idx]]['senderNickname']
                }
                place={alertLocations[alertKeys[idx]]['place']}
                isChecked={alertLocations[alertKeys[idx]]['isChecked']}
              />
            </TouchableHighlight>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  alarmcompletion: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  alarmcontainer: {
    paddingLeft: 8,
    paddingRight: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  profilebox: {
    width: 70,
    backgroundColor: 'blue',
    height: 70,
    borderRadius: 70,
    marginLeft: 12,
    overflow: 'hidden',
  },
  profileimage: {
    width: '100%',
    height: '100%',
    // 'object-fit': 'cover',
  },
  textbox: {
    width: '80%',
    padding: 20,
    marginHorizontal: 20,
  },
  text: {
    // whiteSpace: 'nowrap',
  },
  textbold: {
    fontWeight: 'bold',
    color: '#FF9292',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#FF9292',
    alignItems: 'center',
  },
});
