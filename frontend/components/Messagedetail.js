import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const icon = require('../assets/icons/letter.png');


//데이터의 위치를 
export default function Messagedetail({ sender, receiver, time, position, messageText, istype }) {
    
    const [senderName, setSenderName] = useState('sender');
    const [receiverName, setReceiverName] = useState('receiver');
    const [singlePos, setSinglePos] = useState({
        lat: 37.5665,
        lng: 126.9780
    });
    const [transPos, setTransPos] = useState('ee');
    const [messageContent, setMessageContent] = useState('찾아야지? 못찾겠지?');
    const [type, setType] = useState('summary');
    const [converttime, setConvertTime] = useState('13:10:22');

    Geocoder.init("AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s");

    useEffect(() => {
        Geocoder.from(singlePos).then(json => {
            setTransPos(json.results[0].formatted_address);
        });
    }, []);

    const btnClick = () => {
        console.log("to " + senderName + "resend");
    }
    return (
        <View style={ styles.allcontainer }>
            {type == 'resend' ?
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('blue')}>{senderName}</Text>
                    <Text style={styles.textContainer('black')}> 님이</Text>
                    <Text style={styles.textContainer('blue')}>{receiverName}</Text>
                    <Text style={styles.textContainer('black')}> 님에게</Text>
                </View>
                :
                <View style={styles.fromtoContainer}>
                    <Text style={styles.textContainer('black')}>이 메세지는</Text>
                    <Text style={styles.textContainer('blue')}>{receiverName}</Text>
                    <Text style={styles.textContainer('black')}> 님이</Text>
                    <Text style={styles.textContainer('blue')}>{converttime}</Text>
                </View>
            }
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    minZoomLevel={18 }
                    maxZoomLevel={18 }
                    style={{ width: 350, height: 350}}
                    initialRegion={{
                    latitude: singlePos.lat,
                    longitude: singlePos.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}>
                    <Marker title="test" icon={ icon}coordinate={{ latitude : singlePos.lat, longitude : singlePos.lng}}/>
                </MapView>
            </View>
            <View style={styles.positionContainer}>
                <Text style={styles.textContainer('blue')}>{transPos}</Text>
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
                <Text>{ messageContent }</Text>
            </View>
            {type == 'resend'?<View style={styles.buttonContainer}>
                <Button onPress={btnClick } title={'답장하기'}></Button>
            </View> : <View></View>}
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