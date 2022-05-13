import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';

export default function MessageReceiveAlert({
  senderNickname,
  time,
  place,
  isChecked,
  goToMessageDetail,
}) {
  return (
    <TouchableHighlight onPress={goToMessageDetail}>
      <View style={styles.alarmcompletion}>
        <View style={styles.alarmcontainer}>
          <View style={styles.profilebox}>
            <Image
              source={{uri: 'https://reactjs.org/logo-og.png'}}
              style={styles.profileimage}
            />
          </View>
          <View style={styles.textbox}>
            <Text style={styles.text}>
              <Text style={styles.textbold}>{`${senderNickname}`}</Text>
              <Text> 님이 </Text>
              <Text style={styles.textbold}>{`[${time}] [${'place'}]`}</Text>
              <Text> 에서 볼 수 있는 메세지를 보냈습니다.</Text>
            </Text>
          </View>
          {!isChecked && <View style={styles.circle}></View>}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
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
    'object-fit': 'cover',
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
