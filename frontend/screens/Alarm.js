import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Alarm(navigation) {
  const [alarms, setAlarms] = useState({
    alarmcode1: {
      alarmType: 'condition',
      profileImageUrl:
        'https://namu.wiki/jump/7A3wXEd3D%2BOBAt7GFPJVY5shxo%2BU9y9ogf9dpQppCeVy4zJ3lJHgTnsemMUmSYJ8Sjsssa5DlhRPfupGdkgzCS%2B%2FYhREcen24GMFTIWLUZI%3D',
      time: '2022년 04월 30일',
      place: '장덕동 1333',
      username: '윤설',
      check: false,
    },
    alarmcode2: {
      alarmType: 'condition',
      profileImageUrl:
        'https://namu.wiki/jump/7A3wXEd3D%2BOBAt7GFPJVY5shxo%2BU9y9ogf9dpQppCeVy4zJ3lJHgTnsemMUmSYJ8Sjsssa5DlhRPfupGdkgzCS%2B%2FYhREcen24GMFTIWLUZI%3D',
      time: '2022년 04월 30일',
      place: '장덕동 1333',
      username: '윤설',
      check: false,
    },
  });

  const alarmsKeys = Object.keys(alarms);

  return (
    <View style={styles.allcontainer}>
      {alarmsKeys.map((key, keyidx) => {
        return (
          <View style={styles.alarmcontainer}>
            <View style={styles.profilebox}>
              <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.profileimage}
              />
            </View>
            <View style={styles.textbox}>
              <Text>{alarms[alarmsKeys[keyidx]].alarmType}</Text>
              <Text>{`${alarms[alarmsKeys[keyidx]].username}님이 [${
                alarms[alarmsKeys[keyidx]].time
              }] [${alarms[alarmsKeys[keyidx]].place}] 에서`}</Text>
              <Text>볼 수 있는 메세지를 보냈습니다.</Text>
            </View>
            <View style={styles.circle}></View>
          </View>
        );
      })}
      <Button
        title="메세지 보내기"
        onPress={() => navigation.navigate('Messege')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  alarmcontainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  profilebox: {
    width: 70,
    height: 70,
    borderRadius: 70,
    overflow: 'hidden',
  },
  profileimage: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover',
  },
  textbox: {
    marginHorizontal: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#4385E0',
    alignItems: 'center',
  },
});
