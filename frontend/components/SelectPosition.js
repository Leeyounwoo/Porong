import React, { useEffect, useState } from 'react';
import {StyleSheet,Dimensions, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default function SelectPosition() {
    const [selectlat, setSelectlat] = useState(0);
    const [selectlng, setSelectlng] = useState(0);
    
    const pressTest = (e) => {
        // console.log("test", e.nativeEvent.coordinate);
        setSelectlat(e.nativeEvent.coordinate.latitude);
        setSelectlng(e.nativeEvent.coordinate.longitude);
    }
    let selectTest = <Text>원하시는 장소를 선택해주세요!</Text>;
    useEffect(() => {
        console.log("check", selectlat);
        if (selectlat) {
            selectTest = <Text>선택했습니다.</Text>;
        } else {
            selectTest = <Text>원하시는 장소를 선택해주세요!</Text>
        } 
    },[selectlat])
    return (
        <View>
            <Text>상대가 메세지를 확인할 수 있는 장소를 선택해주세요!</Text>
            <Text>선택한 장소에서 메세지 열람이 가능해요!</Text>
            <MapView
                provider={PROVIDER_GOOGLE}
                minZoomLevel={5}
                maxZoomLevel={5}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 200 }}
                initialRegion={{
                    latitude: 37.21313,
                    longitude: 125.1313,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onPress={pressTest}
            >
                <Marker></Marker>
            </MapView>
            <Text>{ selectlat }</Text>
        </View>
    )

}