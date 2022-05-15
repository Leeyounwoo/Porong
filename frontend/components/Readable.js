import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useStore} from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';

const icon = require('../assets/icons/letter.png');

//데이터의 위치를
export default function Readable({
  amISend,
  nickName,
  time,
  place,
  context,
  latitude,
  longitude,
}) {
  console.log(
    'Readable',
    amISend,
    nickName,
    time,
    place,
    context,
    latitude,
    longitude,
  );
  return (
    <View style={styles.allcontainer}>
      <View style={styles.fromtoContainer}>
        <Text style={styles.textContainer('blue')}>{nickName}</Text>
        <Text style={styles.textContainer('black')}> 님이 보낸 메세지를</Text>
      </View>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 350}}
          initialRegion={{
            latitude: latitude,
            longitude: latitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            title="test"
            icon={icon}
            coordinate={{latitude: latitude, longitude: latitude}}
          />
        </MapView>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.textContainer('blue')}>{time}</Text>
        <Text>에</Text>
        <Text style={styles.textContainer('black')}></Text>
      </View>

      <View style={styles.positionContainer}>
        <Text style={styles.textContainer('blue')}>{place}</Text>
        <Text style={styles.textContainer('black')}>에서 확인했습니다!</Text>
      </View>

      <View>
        <View style={styles.messageTitle}>
          <Text style={styles.textContainer('black')}>메세지 내용</Text>
        </View>
        <View style={styles.messageContent}>
          <Text>{context}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  fromtoContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  positionContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  timeContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  messageTitle: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageContent: {
    marginTop: 5,
    height: 150,
    width: 400,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonContainer: {
    marginTop: 10,
    width: 100,
  },
  textContainer: mycolor => {
    return {
      fontWeight: 'bold',
      color: mycolor,
      fontSize: 15,
    };
  },
});
