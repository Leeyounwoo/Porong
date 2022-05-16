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
import {typeContain} from '../../reducer';
import axios from 'axios';
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
          alert('전송 완료! \n메인 페이지로 이동합니다.');
          store.dispatch(typeContain(false));
          console.log(store.getState().reducer);
          axios
            .post(
              `http://k6c102.p.ssafy.io:8080/v1/message`,
              store.getState().reducer,
            )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
          navigation.reset({ routes: [{ name: 'Home' }] });
          
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
          alert('전송 완료! \n메인 페이지로 이동합니다.');
          store.dispatch(typeContain(true));
          navigation.navigate('Home');
        },
      },
    ]);
  };
  const prev = () => {
    navigation.navigate('Content');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>
          메세지 유형을 선택해주세요
        </Text>
        <Text style={{fontSize: 16, marginLeft: 10, marginTop: 10}}>
          비밀 메시지는 회원님이 선택한 조건을 만족하기 전까지{'\n'}내용을
          확인할 수 없어요!
        </Text>
      </View>
      <View
        style={{
          flex: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btn} onPress={normal}>
          <Text style={{color: 'white', fontSize: 18}}>일반메시지</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1.2,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity style={styles.btn} onPress={secret}>
          <Text style={{color: 'white', fontSize: 18}}>비밀메시지</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 130}}>
        <Button title="이전" onPress={prev} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#4385E0',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
