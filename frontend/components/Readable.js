import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useStore} from 'react-redux';
import Geoloation from 'react-native-geolocation-service';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const icon = require('../assets/icons/letter.png');

//데이터의 위치를
export default function Readable({contentUrl, amISend,  nickName, papertype, time,  place,  context,  latitude,  longitude,}) {
  const [target, setTarget] = useState('');
  
  useEffect(() => {
    if (amISend) {
      setTarget('님에게 보낸 메세지를')
    } else {
      setTarget('님이 보낸 메세지를')
    }
    },[])
  
  return (
      <View>
      <View style={{marginLeft: 20,marginTop:20, marginBottom:15, alignSelf:'baseline'}}>
        <Text style={{ fontSize: 15, color: 'black' }}><Text style={{ color: '#0075FF', fontWeight: 'bold' }}>{nickName}</Text>{target}</Text>
      </View>
      <View
        style={{alignItems: 'center', borderRadius: 15, overflow: 'hidden'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 200}}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          pitchEnabled={false}>
          <Marker
            title="test"
            icon={icon}
            coordinate={{latitude: latitude, longitude: longitude}}
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
          <View style={{...styles.messageContent, ...styles.backgroundSelect(papertype)}}>
            {contentUrl ? <Image source={{uri:contentUrl}} style={{marginTop:15, marginBottom:10, width: 200, height:200, alignSelf:'center'}}></Image> : null }
            <Text
              multiline={ true}
              style={{
              borderWidth: 1,
              borderRadius: 10,
              margin: 20,
              marginTop: 0,
              marginBottom:5,
              borderColor: '#FFEFBF',
              height: 100,
              backgroundColor: '#fbfaf4'
              }}
            >{ context}</Text>
      </View>
      </View>
    </View>
  );
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
  allcontainer: {
    flex: 1,
    backgroundColor: '#fbfaf4'
  },
  fromtoContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  backgroundSelect : select => {
    if (select == 0) {
      return {
        backgroundColor:'#335342'
      }
    } else if(select == 1){
      return {
        backgroundColor:'#333333'
      }
    } else if(select == 2){
      return {
        backgroundColor:'#444444'
      }
    } else if(select == 3){
      return {
        backgroundColor:'#555555'
      }
    } else if(select == 4){
      return {
        backgroundColor:'#666666'
      }
    }
  },
  positionContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  messageTitle: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageContent: {
    margin: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  buttonContainer: {
    marginTop: 10,
    width: 100,
  },
  textContainer: mycolor => {
    return {
      fontWeight: 'bold',
      color: mycolor,
    };
  },
});
