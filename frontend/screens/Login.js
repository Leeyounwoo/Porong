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

          // navigation.navigate('Signin', {
          //   properties: profile.properties,
          //   id: res.data.authMember.kakaoId,
          // });
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
        backgroundColor: '#335342',
      }}>
      <View
        style={{
          flex: 1.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{width: 300, height: 300}}
        />
      </View>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fbfaf4', fontSize: 18, fontWeight: 'bold'}}>
          마음 사서함에 오신걸 환영합니다!
        </Text>
      </View>
      <TouchableOpacity
        style={{flex: 0.5, alignItems: 'center'}}
        onPress={Login}>
        <Image source={require('../assets/images/kakao_login.png')} />
      </TouchableOpacity>
    </View>
  );
}
