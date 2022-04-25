import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';

export default function Header({showLeft, name, navigation}) {
  return (
    <View
      style={{
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4385E0',
      }}>
      <View style={{flex: 1}}>
        {showLeft ? (
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/previous.png')}
              style={{
                width: 25,
                height: 25,
                marginLeft: 10,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={navigation.navigate('alarm')}>
          <Image
            source={require('../assets/icons/menu.png')}
            style={{width: 25, height: 25, marginRight: 10, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
