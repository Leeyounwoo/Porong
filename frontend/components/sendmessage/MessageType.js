import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';
import {imageContain, typeContain} from '../../reducer';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
export default function MessageType({navigation}) {
  const store = useStore();
  const normal = () => {
    Alert.alert('Alert', '일반 메시지로 보내시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed');
        },
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          // axios
          //   .post(`http://k6c102.p.ssafy.io:8080/v1/member/updateFCMToken`, {
          //     fcmToken: fcmToken,
          //     memberId: res.data.memberId,
          //   })
          //   .then(res => {
          //     console.log('FCM 토큰 저장 성공');
          //   })
          //   .catch(err => console.log(err));
          alert('전송 완료!');

          axios
            .post(
              'http://k6c102.p.ssafy.io:8080/v1/message/',
              store.getState().reducer,
            )
            .then(res => {
              console.log("success test : ",res);
              navigation.navigate('Main');
            })
            .catch(err => {
              console.log("fail test : ",err);
            });
        },
      },
    ]);
  };

  const secret = () => {
    Alert.alert('Alert', '비밀 메시지로 보내시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed');
        },
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          alert('전송 완료!');
          store.dispatch(typeContain());
          axios
            .post(
              'http://k6c102.p.ssafy.io:8080/v1/message/',
              store.getState().reducer,
            )
            .then(res => {
              console.log(res);
              navigation.navigate('Main');
            })
            .catch(err => {
              console.log(err);
            });

        },
      },
    ]);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fbfaf4',
      }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>
          메세지 유형을 선택해주세요
        </Text>

      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={{...styles.btn, backgroundColor:'#7aaf91'}} onPress={normal}>
          <Text style={{color: 'white', fontSize: 20}}>일반메시지</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 14, marginLeft: 10, marginTop: 10}}>
          상대방이 정해진 조건을 볼 수 있습니다
        </Text>
      </View>
      <View
        style={{
          flex: 1.2,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity style={styles.btn} onPress={secret}>
          <Text style={{color: 'white', fontSize: 20}}>비밀메시지</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 14, marginLeft: 10, marginTop: 5, color:'#FD8787'}}>
          조건이 맞춰지기 전까지 메세지를 볼 수 없습니다
        </Text>
      </View>
      <View
        style={{
          flex: 1.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{...styles.dateBtn, backgroundColor: 'grey'}}
          onPress={() => navigation.goBack()}>
          <Text style={styles.dateText}>이전</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateBtn: {
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#335342',
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
