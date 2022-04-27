import React, { useEffect, useState } from 'react';
import {StyleSheet,Dimensions, View, Text,Button } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapTest({ totalpos, pressTest }) {

    const checkreceive = (e) => {
        pressTest(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
    }
    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 400 }}
                region={{
                    latitude: totalpos.lat,
                    longitude: totalpos.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onPress={checkreceive}
            > 
                <Marker coordinate={{ latitude: totalpos.lat, longitude: totalpos.lng }} />
            </MapView> 
        </View>
    )

}