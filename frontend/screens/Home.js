import React, {useEffect, useState, useRef} from 'react';
import {  StyleSheet,  Text,  View,  Image,   Animated} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import {positionContain} from '../reducer';
const secret = require('../assets/icons/question.png');

const Home = ({navigation}) => {
  const store = useStore();
  const position = useSelector((state) => state.posreducer );
  const [markers, setMarkers] = useState([]);
  const markerRef = useRef();
  const user = useSelector((state) => state.userreducer);

  useEffect(() => {
    axios.get('http://k6c102.p.ssafy.io:8080/v1/message/11/fetchUncheckedMesaages')
      .then(json => {
        let received = [];
        // console.log("markers test : ",json);
        json.data.map((single) => {
          received.push(single);
        });
        setMarkers(received);
      })
      .catch(err => {
        console.log(err);
      })
    
    
      Geolocation.getCurrentPosition(
        position => {
          store.dispatch(positionContain(position.coords.latitude, position.coords.longitude))
        },
       error => {
          // See error code charts below.
          console.log(error.code, error.message);
        }, 
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
  }, []);

  useEffect(() => {
    //마커 확인용.
    markers.map((single, idx) => {
      console.log("idx : ",idx," ",single.latitude," ", single.longitude);
    })
  }, [markers])

  useEffect(() => {
    console.log(position);
  },[position])

  function clicktest(e, id) {
    console.log(id);
  }
  
  function displayedAt(createdAt) {
    console.log(createdAt);
    const duedate = new Date(createdAt[0],createdAt[1],createdAt[2],createdAt[3],createdAt[4],createdAt[5]);
    const milliSeconds = duedate - new Date(); 
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `잠시 뒤에 확인할 수 있습니다!`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 후 확인할 수 있습니다!`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 후 확인할 수 있습니다!`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 후 확인할 수 있습니다!`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 후 확인할 수 있습니다!`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 후 확인할 수 있습니다!`
    const years = days / 365
    return `${Math.floor(years)}년 후 확인할 수 있습니다!`
  }
  let rotateValueHolder = new Animated.Value(0);
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })



  return (
    <View style={styles.allcontainer}>
      <View style={styles.headcontainer}>
        <Animated.Image source={require('../assets/icons/update-arrows.png')}
          style={{
            width: 30,
            height: 30,
            tintColor: 'white',
            transfrom: [{rotate: RotateData}]
          }}
        />
      <Image style={styles.imgstyle} source={{ uri: user ? user.profileUrl : ``}} />
        <Text style={{marginTop: 5,alignSelf: 'center'}}>{ user? user.nickname : `로그인 처리가 안됬습니다.`}</Text>
      </View>

      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: position.lat,
            longitude: position.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          followsUserLocation={ true}
        >
          {markers.map((single, idx) => {
            //제약 시간 - 현재 시간을 표시
            return <Marker ref={markerRef} key={idx}
              onPress={(e) => { clicktest(e.currentTarget, single.messageId) }}
              title={`제목 : ${single.title}`}
              description={displayedAt(single.dueTime)}
              icon={single.type == 0 ? secret : null}
              coordinate={{ latitude: single.latitude, longitude: single.longitude }}>
             <Image source={{ uri: single.senderProfileUrl }} style={{ height: 35, width: 35, borderRadius: 100 }} /></Marker>
          })}
        </MapView>
      </View>
      <View style={styles.messageContainer}>
        {markers.length != 0 ? (
          <Text style={{alignSelf: 'center', marginTop: 5}}>
            확인 안한 메세지가 {markers.length}개 있습니다
          </Text>
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 5}}>
            메세지를 기다리는 중이에요
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mapcontainer: {
    height: 300,
    width: 350,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnContainer: {
    marginTop: 30,
  },
  headcontainer: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  messageContainer: {
    position: 'absolute',
    borderRadius: 20,
    width: 220,
    height: 30,
    top: 150,
    backgroundColor: '#FDE1E3',
  },
  imgstyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  newmessage: {
    position: 'absolute',
    bottom: 300,
  },
});

export default Home;
