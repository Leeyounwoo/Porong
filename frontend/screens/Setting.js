import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Setting({navigation}) {
  const user = useSelector(state => state.userreducer);
  const logout = () => {
    AsyncStorage.removeItem('user')
      .then(sucess => {
        console.log('로그아웃 완료', sucess);
        navigation.navigate('LoginStack');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // useLayoutEffect(() => {
  //   axios({
  //     url: `http://k6c102.p.ssafy.io:8080/v1/oauth/convert/kakaoId/${user.kakaoId}`,
  //     method: 'get',
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity>
            <Image
              source={{uri: user.profileUrl}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 21,
              color: 'black',
              marginTop: 20,
            }}>
            {user.nickname}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: 120,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4385E0',
            width: 180,
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={logout}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
