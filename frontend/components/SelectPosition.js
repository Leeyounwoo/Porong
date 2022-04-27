import React, { useEffect, useState } from 'react';
import {StyleSheet,Dimensions, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { TextInput } from 'react-native-gesture-handler';
import MapTest from './Map';
import Geolocation from '@react-native-community/geolocation';


export default function SelectPosition() {
    const [totalpos, setTotalpos] = useState({lat: 0, lng: 0});
    const [address, setAddress] = useState('');
    Geocoder.init("AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s");

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setTotalpos({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }, []);
    
    useEffect(() => {
        if (totalpos) {
            Geocoder.from(totalpos).then(json => {
                setAddress(json.results[0].formatted_address);
            })
        }
    }, [totalpos]);

    const pressTest = (lat, lng) => {
        setTotalpos({ ...totalpos, lat: lat, lng: lng });
    }

    const checkAddress = () => {
        Geocoder.from(address).then(json => {
            setTotalpos({...totalpos, lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng });
        })
    }
    return (
        <View>
            <Text>상대가 메세지를 확인할 수 있는 장소를 선택해주세요!</Text>
            <Text>선택한 장소에서 메세지 열람이 가능해요!</Text>
            <MapTest totalpos={totalpos} pressTest={pressTest } />
            <TextInput id='test' onChangeText={text => setAddress(text)} value={address}></TextInput>
            <Button title="test" onPress={checkAddress}></Button>
        </View>
    )

}

const styles = StyleSheet.create({
    inputbox: {
        position: 'absolute',
        bottom: 400,
        right: 50
    }
})