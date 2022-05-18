import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import KakaoSDK from '@actbase/react-kakaosdk';
import {useStore} from 'react-redux';
import axios from 'axios';
import {userContain} from '../reducer';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {
  const [fcmToken, setFfcmToken] = useState('');
  const store = useStore();
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        setFfcmToken(token);
      });
  }, []);

  const Login = async () => {
    try {
      await KakaoSDK.init('066f28139628e8b5440363889440f7be');
      const tokens = await KakaoSDK.login();
      const profile = await KakaoSDK.getProfile();
      
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/oauth/login?token=${tokens.access_token}`,
        )
        .then(res => {
          console.log(res);
          store.dispatch(
            userContain(
              res.data.memberId,
              res.data.authMember.imageUrl,
              res.data.authMember.kakaoId,
              res.data.authMember.nickName,
            ),
          );

          axios
            .post(`http://k6c102.p.ssafy.io:8080/v1/member/updateFCMToken`, {
              fcmToken: fcmToken,
              memberId: res.data.memberId,
            })
            .then(res => {
              console.log('FCM 토큰 저장 성공');
            })
            .catch(err => console.log(err));

          if (res.data.firstCheck) {
            alert('회원가입을 위해 새로운 페이지로 이동합니다.');
            navigation.navigate('Signin', {
              properties: profile.properties,
              id: res.data.authMember.kakaoId,
            });
          } else {
            AsyncStorage.setItem('user', JSON.stringify(res));
            navigation.navigate('Main');
          }
        })
        .catch(err => console.log(err));
      // alert('회원가입을 위해 새로운 페이지로 이동합니다.');
      // navigation.navigate('signin', {properties: profile.properties});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={Login}>
        <Image source={require('../assets/images/kakao_login.png')} />
      </TouchableOpacity>
    </View>
  );
}
