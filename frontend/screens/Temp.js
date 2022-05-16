import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notreadable from '../components/Notreadable';
import Readable from '../components/Readable';
import {useStore} from 'react-redux';

const icon = require('../assets/icons/letter.png');
function dateTrans(day) {
  return ('00' + day).slice(-2);
}

//데이터의 위치를
export default function Temp({navigation, route}) {
  const store = useStore();
  const {messageId} = route.params;
  const [flag, setFlag] = useState(false);
  const [senderNickName, setSenderNickName] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('장덕동 1333');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [context, setContext] = useState('');

  useEffect(() => {
    const now = new Date();
    const time = `${now.getFullYear()}-${dateTrans(
      now.getMonth() + 1,
    )}-${dateTrans(now.getDate())}T${dateTrans(now.getHours())}:${dateTrans(
      now.getMinutes(),
    )}:${dateTrans(now.getSeconds())}`;
    axios
      .post('http://k6c102.p.ssafy.io:8080/v1/message/getmessage', null, {
        params: {
          memberId: store.getState().userreducer.memberId,
          messageId: messageId,
          memberId: 11,
          messageId: 35,
          timeNow: time,
        },
      })
      .then(res => {
        console.log('getMessage 요청 성공');
        const date = `${parseInt(res.data.dueTime[0])}년${parseInt(
          res.data.dueTime[1] - 1,
        )}월${parseInt(res.data.dueTime[2])}일${parseInt(
          res.data.dueTime[3],
        )}시${parseInt(res.data.dueTime[4])}분${parseInt(
          res.data.dueTime[5],
        )}초`;
        setTime(date);
        setSenderNickName(res.data.senderName);
        // setPlace(res.data.place)
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        // setContext(res.data.contentText);
        setContext("asdflhjkfasdjkhlasdflhjkasdfhjklsdfahjklsdfahjklsdfajkhdfshkjdsfhkjdsfhjksdfhkjsdfhkjsdfkhjsdfhjksdfkhj\nhkjsdfkhj\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\nsdfhkjsdfkhjs\ndfkhjskdfhjdfhsjs\nfdhkjsdfkhjsdfhsfdhhkj");
      });

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
      {flag === true && (
        <Readable
          amISend={false}
          nickName={senderNickName}
          time={time}
          place={place}
          context={context}
          latitude={latitude}
          longitude={longitude}
        />
      )}
      {flag === false && (
        <Notreadable
          amISend={false}
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
