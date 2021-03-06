import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, Text, Button, Image} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function MapTest({totalpos, mark}) {
  const checkreceive = e => {
    console.log("check1");
    mark(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
  };
  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapview}
        region={{
          latitude: totalpos.lat,
          longitude: totalpos.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={ checkreceive}>
        {totalpos ? (
          <Marker
            coordinate={{
              latitude: totalpos.lat,
              longitude: totalpos.lng,
            }}></Marker>
        ) : null}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    marginBottom: 10,
  },
  mapview: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 300,
  },
});
