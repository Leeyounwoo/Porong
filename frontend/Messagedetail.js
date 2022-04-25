import React, { useState } from 'react';
import {StyleSheet, View, Text,Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



export default function Messagedetail() {
    
    const [senderName, setSenderName] = useState('sender');
    const [receiverName, setReceiverName] = useState('receiver');
    const [singlePos, setSinglePos] = useState({
        lat: 33.33,
        lng: 120
    });
    const [transPos, setTransPos] = useState('ee');
    const [messageContent, setMessageContent] = useState('찾아야지? 못찾겠지?');

    const btnClick = () => {
        console.log("resend Click");
    }

    return (
        <View style={styles.allcontainer}>
            <View style={styles.fromtoContainer }>
                <Text style={{ color:'blue',fontSize:18 }}>{senderName}</Text>
                <Text> 님이</Text>
                <Text style={{ color: 'blue', fontSize: 18 }}>{receiverName}</Text>
                <Text> 님에게</Text>
            </View>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{width:400, height: 350}}
                    initialRegion={{
                    latitude: singlePos.lat,
                    longitude: singlePos.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
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
        flexDirection: 'row',
        alignSelf:'flex-start'    
    },
    positionContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    messageTitle: {
        marginTop:10,
        alignSelf:'flex-start'  
    },
    messageContent: {
        marginTop:5,
        height: 150  
    },
    buttonContainer: {
        width: 100
    },
});