import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useStore } from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';

const icon = require('../assets/icons/letter.png');

function calcDistance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) return 0;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let distance =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
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

function dateTrans(day) {
    return ("00" + day).slice(-2);
}

//데이터의 위치를 
export default function Readable({ route }) {
    //데이터 셋을 받는다는 가정.
    //let transdate = new Date(data.dueTime[0],data.dueTime[1],data.dueTime[2],data.dueTime[3],data.dueTime[4],data.dueTime[5])
    let now = Date.now();
    //받는사람 nickname
    //보낸사람 nickname
    //시간
    //장소
    //제목
    //내용
    const isChecked = true;
    const messageId = 1;
    const senderNickname = "yunseol";
    const time = new Date(2022, 4, 13, 12, 13, 22);
    const place = "어디어ㅣ디 뭐시기뭐시기";
    const latitude = 37;
    const longitude = 126;
    const [checked, setChecked] = useState(false);
    // const store = useStore();
    const [data, setData] = useState({
        nick: 'test',
        time: '',
        place: 'place',
        lat: 37,
        lng: 126
    });

    useLayoutEffect(() => {
        let now = new Date();
        let time = `${now.getFullYear()}-${dateTrans(now.getMonth() + 1)}-${dateTrans(now.getDate())}T${dateTrans(now.getHours())}:${dateTrans(now.getMinutes())}:${dateTrans(now.getSeconds())}`;
        
        // params: { memberId: store.getState().userreducer.memberId, messageId: route.messageId, timeNow: time }
        axios.post('http://k6c102.p.ssafy.io:8080/v1/message/getmessage', null, {
            params: { memberId: 11, messageId: 35, timeNow: time }
        }).then(res => {
            let date = `${parseInt(res.data.dueTime[0])}년${parseInt(res.data.dueTime[1]-1)}월${parseInt(res.data.dueTime[2])}일${parseInt(res.data.dueTime[3])}시${parseInt(res.data.dueTime[4])}분${parseInt(res.data.dueTime[5])}초`;
            
            setChecked(res.data.checked);
            setData({
                ...data,
                nick: res.data.senderName,
                time: date,
                place: "흑석동 어딘가",
                lat: res.data.latitude,
                lng: res.data.longitude,
                profile: res.data.senderProfileUrl,
                title: res.data.title,
                context: res.data.contentText
            });
        }).catch(error => {
            console.log(error);
        })
    }, [])
    

    useEffect(() => {
        // console.log(data.time);
    },[data])
    return (
        <View style={ styles.allcontainer }>
            <View style={styles.fromtoContainer}>
                <Text style={styles.textContainer('blue')}>{data.nick}</Text>
                <Text style={styles.textContainer('black')}> 님이 보낸 메세지를</Text>
            </View>
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
            <View style={styles.timeContainer}><Text style={styles.textContainer('blue')}>{data.time}</Text><Text>에</Text>
                <Text style={styles.textContainer('black')}></Text>
            </View>

            <View style={styles.positionContainer}>
                <Text style={styles.textContainer('blue')}>{data.place}</Text>
                <Text style={styles.textContainer('black')}>에서 확인했습니다!</Text>
            </View>
            
            <View>
                <View style={styles.messageTitle }>
                    <Text style={styles.textContainer('black')}>메세지 내용</Text>
                </View>
                <View style={styles.messageContent }>
                    <Text>{ data.context }</Text>
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
        marginLeft:10,
        flexDirection: 'row',
        alignSelf:'flex-start'    
    },
    positionContainer: {
        flexWrap:'nowrap',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    timeContainer: {
        flexWrap:'nowrap',
        flexDirection: 'row',
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