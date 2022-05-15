import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const icon = require('../assets/icons/letter.png');

//데이터의 위치를
export default function Temp({navigation, route}) {
  const {messageId} = route.params;
  const [flag, setFlag] = useState(false);
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('receivedMessages', (err, result) => {
      const receivedMessagesSet = new Set(JSON.parse(result));
      console.log(receivedMessagesSet);
      if (receivedMessagesSet.has(messageId)) {
        setFlag(true);
        console.log('있음');
      } else {
        console.log('없음');
      }
    });
  }, []);

  return (
    <View>
      {flag === true && <Text>열람한 메세지</Text>}
      {flag === false && <Text>아직 열람하지 못한 메세지</Text>}
    </View>
  );
}
