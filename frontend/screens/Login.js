import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

export default function Login({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, backgroundColor: 'blue', width: '100%'}}>
        <Text>hello</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'green', width: '100%'}}>
        <Text>hello</Text>
      </View>
    </View>
  );
}
