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
        navigation.navigate('LoginStack');
      })
      .catch(err => {
        console.log('remove user error', err);
      });
  };

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
          <View>
            {user ? (
              <Image
                source={{uri: user.profileUrl}}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  margin: 10,
                }}
              />
            ) : null}
          </View>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 21,
              color: '#595959',
              marginTop: 20,
            }}>
            안녕하세요 <Text style={{fontWeight: '900'}}>{user.nickname}</Text>
            님!
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
            backgroundColor: '#7aaf91',
            width: 160,
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={logout}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            로그아웃
          </Text>
          <Image
            source={require('../assets/icons/logout.png')}
            style={{
              width: 15,
              height: 15,
              tintColor: 'white',
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
