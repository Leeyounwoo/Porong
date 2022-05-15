import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useStore } from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';

const icon = require('../assets/icons/letter.png');

function calcDistance(lat, lon) {

    // const current = useStore().getState().posreducer;
    const current = { lat:37, lng:126};
    if (current.lat == lat && current.lng == lon) return 0;

    const radLat1 = (Math.PI * current.lat) / 180;
    const radLat2 = (Math.PI * lat) / 180;
    const theta = current.lng - lon;
    const radTheta = (Math.PI * theta) / 180;
    let distance = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (distance > 1) distance = 1;

    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515 * 1.609344 * 1000;
    if (distance < 100) distance = Math.round(distance / 10) * 10;
    else distance = Math.round(distance / 100) * 100;

    return distance;
}
function displayedAt(createdAt) {
    console.log(createdAt);
    const duedate = new Date(createdAt[0],createdAt[1],createdAt[2],createdAt[3],createdAt[4],createdAt[5]);
    const milliSeconds = duedate - new Date(); 
    if (milliSeconds <= 0) return ``; 
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
//데이터의 위치를 
export default function Nodereadable({ route }) {
    //데이터 셋을 받는다는 가정.
    const [isAfter, setIsAfter] = useState(false);
    const [isInrange, setIsInrange] = useState(false);
    const time = new Date(2022, 4, 13, 12, 13, 22);
    const [data, setData] = useState({
        nick: 'test',
        time: 'test',
        place: '흑석동 어딘가',
        lat: 37,
        lng: 126
    });
    useLayoutEffect(() => {
        // setData({ nick: route.nickname, time: route.time, place: route.place, lat: latitude, lng: longitude });
        // setData({  nick: 'inputnick', time: 'inputtime', place: 'inputplace', lat: 37, lng: 126 });  
        // if (displayedAt(route.time) == ``) {
        let tempdate = [2022, 5, 15, 1, 3, 2];
    
        let timeTest = displayedAt(tempdate);
        let rangeTest = calcDistance(37,126);
        
        if (timeTest != ``) {
            setIsAfter(true);
        } else {
            setData({ ...data, time: timeTest });
        }

        if (rangeTest <= 50) {
            setIsInrange(true);
        }


        // console.log(calcDistance(37, 127));
        // if (calcDistance(route.lat, route.lng) <= 50) {
        // if (calcDistance(37,126) <= 50) {
        //     setIsInrange(true);
        // }
    },[])



    return (
        <View style={ styles.allcontainer }>
            {data ? 
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('blue')}>{data.nick}</Text>
                    <Text style={styles.textContainer('black')}> 님에게</Text>
                </View>
                :
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('blue')}>{data.nick}</Text>
                    <Text style={styles.textContainer('black')}> 님이 보낸 메세지를</Text>
                </View>
            }
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    minZoomLevel={18 }
                    maxZoomLevel={18 }
                    style={{ width: 350, height: 350}}
                    initialRegion={{
                    latitude: data.lat,
                    longitude: data.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}>
                    <Marker title="test" icon={ icon}coordinate={{ latitude : data.lat, longitude : data.lng}}/>
                </MapView>
            </View>
            {isAfter ? null : <View style={styles.timeContainer}><Text style={styles.textContainer('blue')}>{data.time}</Text>
                    <Text style={styles.textContainer('black')}>해당 시간 이후에 확인가능합니다.</Text></View>
            }
            {isInrange ?null: <View style={styles.positionContainer}>
                <Text style={styles.textContainer('blue')}>{data.place}</Text>
                <Text style={styles.textContainer('black')}>에서 볼 수 있습니다!</Text>
                </View>
            }
        </View>
    );
}



const styles = StyleSheet.create({
    allcontainer: {
        flex: 1,
        alignItems: 'center',
    },
    fromtoContainer: {
        marginLeft:10,
        flexDirection: 'row',
        alignSelf:'flex-start'    
    },
    positionContainer: {
        flexWrap:'nowrap',
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    timeContainer: {
        flexWrap:'nowrap',
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    messageTitle: {
        marginTop:10,
        alignSelf:'flex-start'  
    },
    messageContent: {
        marginTop:5,
        height: 150,
        width: 400,
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonContainer: {
        marginTop:10,
        width: 100
    },
    textContainer : (mycolor) =>  {
        return{
            fontWeight: 'bold',
            color:mycolor, 
            fontSize: 15
        }
     }
});