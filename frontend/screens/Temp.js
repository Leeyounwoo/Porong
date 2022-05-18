import React, {useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notreadable from '../components/Notreadable';
import Readable from '../components/Readable';
import {useStore, useSelector} from 'react-redux';

const icon = require('../assets/icons/letter.png');
function dateTrans(day) {
  return ('00' + day).slice(-2);
}

//데이터의 위치를
export default function Temp({navigation, route}) {
  const store = useStore();
  const {messageId, amISend} = route.params;
  const [flag, setFlag] = useState(false);
  const [senderNickName, setSenderNickName] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('장덕동 1333');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [context, setContext] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const user = store.getState().userreducer;

  const isAlreadyReceived = () => {
    AsyncStorage.getItem('receivedMessages', (err, result) => {
      const receivedMessagesSet = new Set(JSON.parse(result));
      console.log('메세지 ID', typeof messageId, receivedMessagesSet);
      if (receivedMessagesSet.has(String(messageId))) {
        console.log('있음');
        setFlag(true);
      } else {
        console.log('없음');
      }
    });
  };

  useEffect(async () => {
    console.log(user);
    await isAlreadyReceived();
    const now = new Date();
    const time = `${now.getFullYear()}-${dateTrans(
      now.getMonth() + 1,
    )}-${dateTrans(now.getDate())}T${dateTrans(now.getHours())}:${dateTrans(
      now.getMinutes(),
    )}:${dateTrans(now.getSeconds())}`;
    console.log('memberId', user.memberId);
    console.log('mesageId ', messageId);
    console.log('time : ', time);
    axios
      .post('http://k6c102.p.ssafy.io:8080/v1/message/getmessage', null, {
        params: {
          memberId: user.memberId,
          messageId: messageId,
          timeNow: time,
        },
      })
      .then(res => {
        console.log('getMessage 요청 성공', res);
        const date = `${parseInt(res.data.dueTime[0])}년${parseInt(
          res.data.dueTime[1],
        )}월${parseInt(res.data.dueTime[2])}일${parseInt(
          res.data.dueTime[3],
        )}시${parseInt(res.data.dueTime[4])}분${parseInt(
          res.data.dueTime[5],
        )}초`;
        console.log('date', date);
        setTime(date);
        setSenderNickName(res.data.senderName);
        setPlace(res.data.location);
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        setContext(res.data.contentText);
        setContentUrl(res.data.contentUrl);
      }).catch(err => {
        console.log("axios temp error    ",err);
      });
  }, [user.memberId]);

  return (
    <View>
      {(amISend === true || (amISend === false && flag === true)) && (
        <Readable
          amISend={amISend}
          nickName={senderNickName}
          time={time}
          place={place}
          context={context}
          latitude={latitude}
          longitude={longitude}
          contentUrl={ contentUrl}
        />
      )}
      {amISend === false && flag === false && (
        <Notreadable
          amISend={amISend}
          nickName={senderNickName}
          time={time}
          place={place}
          latitude={latitude}
          longitude={longitude}
        />
      )}
    </View>
  );
}
