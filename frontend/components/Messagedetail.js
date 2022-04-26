import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


export default function Messagedetail() {
    
    const [senderName, setSenderName] = useState('sender');
    const [receiverName, setReceiverName] = useState('receiver');
    const [singlePos, setSinglePos] = useState({
        lat: 37.5665,
        lng: 126.9780
    });
    const [transPos, setTransPos] = useState('ee');
    const [messageContent, setMessageContent] = useState('찾아야지? 못찾겠지?');
    
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
            <View style={ styles.fromtoContainer }>
                <Text style={{ color:'blue',fontSize:18 }}>{senderName}</Text>
                <Text> 님이</Text>
                <Text style={{ color: 'blue', fontSize: 18 }}>{receiverName}</Text>
                <Text> 님에게</Text>
            </View>
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
                    <Marker title="test" icon={require('./letter.png') }coordinate={{ latitude : singlePos.lat, longitude : singlePos.lng}}/>
                </MapView>
            </View>
            <View style={styles.positionContainer}>
                <Text style={{ color: 'blue', fontSize: 18 }}>{transPos}</Text>
                <Text> 에서 확인했습니다!</Text>
            </View>
            <View style={styles.messageTitle }>
                <Text>메세지 내용</Text>
            </View>
            <View style={styles.messageContent }>
                <Text>{ messageContent }</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={btnClick } title={'답장하기'}></Button>
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
        marginLeft:25,
        flexDirection: 'row',
        alignSelf:'flex-start'    
    },
    positionContainer: {
        flexWrap:'wrap',
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
});