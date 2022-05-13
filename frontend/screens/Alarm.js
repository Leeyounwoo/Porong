import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSatisfactionAlert from '../components/alert/TimeSatisfactionAlert';
import MessageReceiveAlert from '../components/alert/MessageReceiveAlert';
import MessageConditionAlert from '../components/alert/MessageConditionAlert';

export default function Alarm({navigation}) {
  const [keys, setKeys] = useState([]);
  const [alertLocations, setAlertLocations] = useState({});

  const [ready, setReady] = useState(false);

  const goToMessageDetail = () => {
    console.log('메세지 디테일로 가기');
    navigation.navigate('Temp');
  };

  const deleteAll = () => {
    const a = ['A202205091951001'];
    console.log(keys);
    AsyncStorage.multiRemove(keys)
      .then(res => {
        AsyncStorage.getAllKeys((err, keys) => {
          console.log('삭제 후', keys);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAlertLocations = (keys, stores) => {
    stores.map((store, idx) => {
      const key = store[0];
      const value = JSON.parse(store[1]);
      setAlertLocations(prevAlertLocations => {
        return {...prevAlertLocations, [key]: value};
      });
    });
  };

  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      console.log('in alert', keys);
      AsyncStorage.multiGet(keys, async (err, stores) => {
        await updateAlertLocations(keys, stores);
        setKeys(keys);
      });
    });
  }, []);

  return (
    <View style={styles.allcontainer}>
      <Button onPress={goToMessageDetail} title={'지우기'}></Button>

      {keys.map((key, idx) => {
        if (alertLocations[keys[idx]]['alertType'] === 'message_condition') {
          return (
            <MessageReceiveAlert
              key={idx}
              goToMessageDetail={goToMessageDetail}
              senderNickname={alertLocations[keys[idx]]['senderNickname']}
              time={alertLocations[keys[idx]]['time']}
              place={alertLocations[keys[idx]]['place']}
              isChecked={alertLocations[keys[idx]]['isChecked']}
            />
          );
        } else if (
          alertLocations[keys[idx]]['alertType'] === 'time_satisfaction'
        ) {
          return (
            <TimeSatisfactionAlert
              key={idx}
              goToMessageDetail={goToMessageDetail}
              senderNickname={alertLocations[keys[idx]]['senderNickname']}
              place={alertLocations[keys[idx]]['place']}
              isChecked={alertLocations[keys[idx]]['isChecked']}
            />
          );
        } else if (
          alertLocations[keys[idx]]['alertType'] === 'message_receive'
        ) {
          return (
            <MessageConditionAlert
              key={idx}
              goToMessageDetail={goToMessageDetail}
              senderNickname={alertLocations[keys[idx]]['senderNickname']}
              place={alertLocations[keys[idx]]['place']}
              isChecked={alertLocations[keys[idx]]['isChecked']}
            />
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
