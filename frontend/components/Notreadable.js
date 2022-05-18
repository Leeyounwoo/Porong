import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useStore} from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';

const icon = require('../assets/icons/letter.png');

//데이터의 위치를
export default function Nodereadable({
  amISend,
  nickName,
  time,
  place,
  latitude,
  longitude,
}) {
  const [toFrom, setToFrom] = useState('false');
  console.log(
    'Notreadable',
    amISend,
    nickName,
    time,
    place,
    latitude,
    longitude,
  );
  useEffect(() => {
    if (amISend === true) {
      setToFrom('에게');
    } else {
      setToFrom('님이');
    }
  }, []);

  console.log(toFrom);

  return (
    <View>
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 15,
          alignSelf: 'baseline',
        }}>
        <Text style={{fontSize: 15, color: 'black'}}>
          <Text style={{color: '#0075FF', fontWeight: 'bold'}}>{nickName}</Text>
          {toFrom}
        </Text>
      </View>
      <View
        style={{alignItems: 'center', borderRadius: 15, overflow: 'hidden'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 200}}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          pitchEnabled={false}>
          <Marker
            title="test"
            icon={icon}
            coordinate={{latitude: latitude, longitude: longitude}}
          />
        </MapView>
      </View>
      <View style={{marginTop: 15, marginLeft: 20, alignSelf: 'baseline'}}>
        <Text style={{color: 'black'}}>
          <Text style={{color: '#0075FF', fontWeight: 'bold'}}>{time}</Text>{' '}
          확인 가능합니다
        </Text>
        <Text style={{color: 'black'}}>
          <Text
            style={{
              color: '#0075FF',
              fontWeight: 'bold',
              alignSelf: 'baseline',
            }}>
            {place}
          </Text>
          <Text style={{alignSelf: 'flex-end'}}>에서 확인할 수 있습니다</Text>
        </Text>
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
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  timeContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
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
