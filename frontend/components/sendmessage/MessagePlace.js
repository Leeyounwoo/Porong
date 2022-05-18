import React, { useEffect, useState } from 'react';
import {StyleSheet,Dimensions, View, Text,Button,TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { TextInput } from 'react-native-gesture-handler';
import MapTest from '../Map';
import Geolocation from '@react-native-community/geolocation';
import { useStore } from 'react-redux';
import { placeContain } from '../../reducer';


export default function MessagePlace({ navigation}) {
    const [totalpos, setTotalpos] = useState({lat: 0, lng: 0});
    const [address, setAddress] = useState('');
    const store = useStore();
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
        if (totalpos.lat != 0 && totalpos.lng != 0) {
            Geocoder.from(totalpos).then(json => {
                setAddress(json.results[0].formatted_address);
            }).catch(err => {
                console.log("find? ====================================", err);
            })
        }
    }, [totalpos]);

    const mark = (lat, lng) => {
        setTotalpos({ ...totalpos, lat: lat, lng: lng });
    }

    const searchAddress = () => {
        Geocoder.from(address).then(json => {
            setTotalpos({...totalpos, lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng });
        })
    }

    const prev = () => {
        store.dispatch(placeContain(''));
        navigation.navigate('Time');
    }
    const next = () => {
        store.dispatch(placeContain(totalpos.lat, totalpos.lng));
        navigation.navigate('Content');
    }
    return (
        <View style={styles.selectPositionContainer}>
            <View style={styles.textContainer }>
                <Text>상대가 메세지를 확인할 수 있는 장소를 선택해주세요!</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>선택한 장소에서 메세지 열람이 가능해요!</Text>
            </View>

            <MapTest totalpos={totalpos} mark={mark} />
            <View style={styles.searchboxContainer}>
                <TextInput onChangeText={text => setAddress(text)} value={address}></TextInput>
            </View>
            
            <View style={styles.searchbtnContainer}>
                <Button  title="검색" onPress={searchAddress}></Button>
            </View>

            <View
                style={{
                flex: 1.1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginHorizontal: 10,
                marginBottom: 10,
            }}>
            <TouchableOpacity
          style={{...styles.dateBtn, backgroundColor: 'grey'}}
          onPress={() => navigation.goBack()}>
          <Text style={styles.dateText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.dateBtn, backgroundColor: '#4385E0'}}
          onPress={next}>
          <Text style={styles.dateText}>다음</Text>
        </TouchableOpacity>
            </View>
            </View>
    )

}

const styles = StyleSheet.create({
    dateBtn: {
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    },
    dateText: {
    color: 'white',
    },
    selectPositionContainer: {
        marginTop: 40
    },
    textContainer: {
      alignSelf:'center'  
    },
    inputbox: {
        position: 'absolute',
        bottom: 400,
        right: 50
    },
    searchboxContainer: {
        position: 'absolute',
        left: 30,
        bottom: 380,
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 280,
        height: 40
    },
    searchbtnContainer: {
        position: 'absolute',
        right: 30,
        bottom: 385
    }

})