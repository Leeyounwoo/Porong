import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  Platform,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Animated} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useStore} from 'react-redux';
const secret = require('../assets/icons/question.png');
const Home = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [temp, setTemp] = useState(null);
  const markerRef = useRef();

  const [user, setUser] = useState({
    name: 'yunseol',
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    setMarkers([
      {
        messageID: 1231123,
        type: 1,
        due_time: 1231231,
        lat: 37.231,
        lng: 126.33434,
        sender: 3,
      },
      {
        messageID: 22133,
        type: 0,
        due_time: 1231231,
        lat: 37.231,
        lng: 127.33434,
        sender: 3,
      },
      {
        messageID: 3144123,
        type: 0,
        due_time: 1231231,
        lat: 37.231,
        lng: 128.33434,
        sender: 3,
      },
      {
        messageID: 11115,
        type: 0,
        due_time: 1231231,
        lat: 37.231,
        lng: 129.33434,
        sender: 3,
      },
    ]);
    console.log(user.name);
  }, []);

  useEffect(() => {
    //마커 확인용.
    markers.map((single, idx) => {
      console.log('idx : ', idx, ' ', single.lat, ' ', single.lng);
    });
  }, [markers]);

  return (
    <View style={styles.allcontainer}>
      <View style={styles.headcontainer}>
        <Image style={styles.imgstyle} source={require('../imgtest.jpg')} />
        <Text style={{marginTop: 5, alignSelf: 'center'}}>{user.name}</Text>
      </View>

      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showUserLocation={true}>
          {markers.map((single, idx) => {
            return (
              <Marker
                ref={markerRef}
                key={idx}
                title="test"
                icon={single.type == 0 ? secret : null}
                coordinate={{
                  latitude: single.lat,
                  longitude: single.lng,
                }}></Marker>
            );
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
