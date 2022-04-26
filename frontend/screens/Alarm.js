import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';

export default function Alarm() {
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
  });

  return (
    <View style={styles.allcontainer}>
      <View style={styles.alarmcontainer}>
        <View style={styles.profilebox}>
          {/* <Text>{alarms.alarmcode1.profileImageUrl}</Text> */}
          <Image
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={styles.profileimage}
          />
        </View>
        <View>
          <Text>{`${alarms.alarmcode1.username}님이 [${alarms.alarmcode1.time}] [${alarms.alarmcode1.place}] 에서`}</Text>
          <Text>볼 수 있는 메세지를 보냈습니다.</Text>
        </View>
        <View style={styles.circle}></View>
      </View>
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
    alignSelf: 'flex-start',
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#4385E0',
    alignItems: 'center',
  },
});
