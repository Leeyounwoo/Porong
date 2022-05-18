import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({navigation}) {
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

  return (
    <View>
      <Text>환경설정 페이지입니다.</Text>
      <Button title="로그아웃" onPress={logout}></Button>
    </View>
  );
}
