import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet,ScrollView, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useStore} from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const icon = require('../assets/icons/letter.png');

//데이터의 위치를
export default function Readable({contentUrl, amISend,  nickName,  time,  place,  context,  latitude,  longitude,}) {
  
  


    return (
      <View >
      <View style={{marginLeft: 20,marginTop:20, marginBottom:15, alignSelf:'baseline'}}>
        <Text style={{fontSize:15, color:'black'}}><Text style={{color:'#0075FF', fontWeight:'bold'}}>{nickName}</Text> 님이 보낸 메세지를</Text>
      </View>
      <View style={{ alignItems: 'center', borderRadius: 15, overflow: 'hidden',}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 200}}
          region={{
            latitude: latitude,
            longitude: latitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            }}
          pitchEnabled={false}
          >
          <Marker
            title="test"
            icon={icon}
            coordinate={{latitude: latitude, longitude: latitude}}
          />
        </MapView>
            </View>
        <View style={{ marginTop:15, marginLeft: 20,alignSelf:'baseline'}}>
            <Text style={{color:'black'}}><Text style={{color:'#0075FF',fontWeight:'bold'}}>{time}</Text>에</Text>
            <Text style={{color:'black'}}><Text style={{ color: '#0075FF', fontWeight: 'bold', alignSelf:'baseline'}}>{place}</Text><Text style={{alignSelf:'flex-end'}}>에서 확인했습니다!</Text></Text>
        </View>
      <View style={{ marginLeft:20, marginTop:20}}>
        <View style={{ marginBottom:10}}>
          <Text style={{fontSize:15,color:'black'}}>메세지 내용</Text>
          </View>
        <ScrollView style={{width:350, height: 200,borderRadius:5, borderWidth:1,paddingBottom:10}}>
          {contentUrl ? <View><Image source={contentUrl} style={{width:250, height: 250}}></Image></View> : null}
          <Text style={{ marginLeft: 10, marginTop:10, marginRight:10, marginBottom:10}}>{context}</Text>
        </ScrollView>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
