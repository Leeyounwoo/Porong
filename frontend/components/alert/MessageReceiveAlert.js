import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default function MessageReceiveAlert({
  senderNickname,
  place,
  isChecked,
  senderProfile,
}) {
  return (
    <View style={styles.alarmcompletion}>
      <View style={styles.alarmcontainer}>
        <View style={styles.profilebox}>
          <Image
            source={
              senderProfile === undefined
                ? require('../../assets/icons/user.png')
                : {uri: senderProfile}
            }
            style={styles.profileimage}
          />
        </View>
        <View style={styles.textbox}>
          <Text style={styles.text}>
            <Text style={styles.textbold}>{`[${place}]`}</Text>
            <Text> 에서 </Text>
            <Text style={styles.textbold}>{`${senderNickname}`}</Text>
            <Text> 님이 보낸 메세지를 받았습니다.</Text>
          </Text>
        </View>
        {!isChecked && <View style={styles.circle}></View>}
      </View>
      {/* <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: 'grey',
          marginHorizontal: 30,
        }}></View> */}
    </View>
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
    width: 60,
    height: 60,
    borderRadius: 70,
    marginLeft: 12,
    overflow: 'hidden',
    elevation: 5,
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
    fontWeight: '500',
    color: '#595959',
  },
  textbold: {
    fontWeight: 'bold',
    color: '#335342',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'skyblue',
    alignItems: 'center',
  },
});
