import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useStore } from 'react-redux';

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

//데이터의 위치를 
export default function Messagedetail({ data }) {
    //데이터 셋을 받는다는 가정.

    //let isAfter - 시간
    //let isInrange - 장소
    //let transdate = new Date(data.dueTime[0],data.dueTime[1],data.dueTime[2],data.dueTime[3],data.dueTime[4],data.dueTime[5])
    let transdate = new Date(2022, 4, 13, 10, 33, 0);
    let now = Date.now();

    const currentCheck = useStore().getState().posreducer;
    console.log(currentCheck);


    if (transdate > now) {
        console.log(displayedAt(transdate));
    }
    //메세지 보내기시에
    const [data1, setData1] = useState({
        nickname: 'yunseol',
        position: { lat: 37, lng: 127 },
        time: [2022, 4,13,10,33,0],
        messageContext: '메세지 내용입니다 확인해주세요!!'
    });
    //보낸 메세지 확인시
    const [data2, setData2] = useState({
        nickname: 'leeyunwoo',
        position: { lat: 37, lng: 127 },
        time: [2022, 4,13,10,33,0],
        messageContext: '메세지 내용입니다 확인해주세요!!'
    });
    //받은 메세지 확인시
    const [data3, setData3] = useState({
        nickname: 'woosteel',
        position: { lat: 37, lng: 127 },
        time: [2022, 4,13,10,33,0],
        messageContext: '메세지 내용입니다 확인해주세요!!'
    });
    
    //확인 가능할 때?
    const [data4, setData4] = useState({
        nickname: 'woosteel',
        position: { lat: 37, lng: 127 },
        time: [2022, 4,13,10,33,0],
        messageContext: '메세지 내용입니다 확인해주세요!!'
    });

    const [data1Address, setData1Address] = useState('');
    const [data2Address, setData2Address] = useState('');
    const [data3Address, setData3Address] = useState('');


    Geocoder.init("AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s");

    useEffect(() => {
        Geocoder.from(data1.position).then(json => {
            console.log("data1 변환 주소 : ", json.results[0].formatted_address);
            setData1Address(json.results[0].formatted_address);
        });
        Geocoder.from(data2.position).then(json => {
            console.log("data2 변환 주소 : ", json.results[0].formatted_address);
            setData2Address(json.results[0].formatted_address);
        });
        Geocoder.from(data3.position).then(json => {
            console.log("data3 변환 주소 : ", json.results[0].formatted_address);
            setData3Address(json.results[0].formatted_address);
        });
    }, []);

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
    
    const btnClick = () => {
    }

    


    return (
        <View style={ styles.allcontainer }>
            {type == 'resend' ?
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('blue')}>{data1.nickname}</Text>
                    <Text style={styles.textContainer('black')}> 님에게</Text>
                </View>
                :
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('blue')}>{data1.nickname}</Text>
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
                    latitude: data1.position.lat,
                    longitude: data1.position.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}>
                    <Marker title="test" icon={ icon}coordinate={{ latitude : data1.position.lat, longitude : data1.position.lng}}/>
                </MapView>
            </View>
            <View style={styles.positionContainer}>
                <Text style={styles.textContainer('blue')}>{data1Address}</Text>
                {type == 'resend' ?
                        <Text style={styles.textContainer('black')}> 에서 확인했습니다!</Text> 
                    : 
                        <Text style={styles.textContainer('black')}>에서 볼 수 있습니다!</Text>
                }
            </View>
            <View style={styles.messageTitle }>
                <Text style={styles.textContainer('black')}>메세지 내용</Text>
            </View>
            <View style={styles.messageContent }>
                <Text>{ data1.messageContext }</Text>
            </View>
            {type == 'resend'?<View style={styles.buttonContainer}>
                <Button onPress={btnClick } title={'답장하기'}></Button>
            </View> : <View><Text>전송하기</Text></View>}
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