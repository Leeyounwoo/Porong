import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const imgsrc = require('../imgtest.jpg');

const Home = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

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
  }, []);

  const btnclicktest = () => {
    console.log('check');
  };

  return (
    <View style={styles.allcontainer}>
      <View style={styles.headcontainer}>
        <Image style={styles.imgstyle} source={require('../imgtest.jpg')} />
      </View>
      <Text>text message</Text>
      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showUserLocation={true}></MapView>
      </View>
      <View style={styles.btncontainer}>
        <Button
          style={styles.btntest}
          title="메세지 보내러 가기"
          onPress={btnclicktest}
        />
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
    height: 350,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btncontainer: {
    marginTop: 30,
  },
  headcontainer: {
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  headcontainer2: {
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  imgstyle: {
    width: 100,
    height: 100,
  },
});

export default Home;
