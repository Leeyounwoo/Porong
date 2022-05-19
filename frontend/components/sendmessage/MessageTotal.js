import React, {useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity,ScrollView, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';

//데이터의 위치를
export default function MessageTotal({navigation ,route }) {
  const senderName = useSelector(state => state.reducer.senderId);
  const receiverName = useSelector(state => state.reducer.receiverId);
  const latitude = useSelector(state => state.reducer.latitude);
  const longitude = useSelector(state => state.reducer.longitude);
  const image = useSelector(state => state.reducer.contentUrl);
  const dueTime = useSelector(state => state.reducer.dueTime);
  const messageContent = useSelector(state => state.reducer.contentText);
  const papertype = useSelector(state => state.reducer.paperType);

  const [converttime, setConvertTime] = useState('');
  const [receiver, setRecevier] = useState('');
  const [receiverProfile, setRecevierProfile] = useState('');
  const [transPos, setTransPos] = useState('');
  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');
  const store = useStore();
  console.log(image);
  useLayoutEffect(() => {
    
    let tempTime = new Date(dueTime);
    // console.log(tempTime.getFullYear());
    // console.log(tempTime.getMonth());
    // console.log(tempTime.getDate());
    // console.log(tempTime.getHours());
    // console.log(tempTime.getMinutes());
    // console.log(tempTime.getSeconds());

    setConvertTime(`${tempTime.getFullYear()}년 ${tempTime.getMonth()}월 ${tempTime.getDate()}일 ${tempTime.getHours()}시 ${tempTime.getMinutes()}분 ${tempTime.getSeconds()}초`);
    axios.get(`http://k6c102.p.ssafy.io:8080/v1/member/inquire?memberId=${receiverName}`).then(res => { 
      setRecevier(res.data.name);
      setRecevierProfile(res.data.profileUrl);
    }).catch(err => {
      console.log("axios total error : ",err);
    })

    Geocoder.from({ latitude, longitude }).then(json => {
      setTransPos(json.results[0].formatted_address);
      });
  }, []);
    const next = () => {
        navigation.navigate('Type');
    };
  return (
    <View style={{flex:1, backgroundColor: '#fbfaf4'}}>
      <ScrollView style={{flex:1}}>
        {receiverProfile ? <View style={{marginTop:10, ...styles.fromtoContainer }}>
          <Image source={{ uri: receiverProfile }} style={{ width: 35, height: 35, borderRadius: 30 }} /><Text style={{marginTop:10, fontSize:18, fontWeight:'bold', color:'#335342' }}>{receiver}</Text> 
          <Text style={{marginTop:12, fontSize: 14, color:'#595959'}}> 님에게</Text>
        </View>: null}

      <View style={{       
        marginTop: 20,
        borderRadius: 20,
  
        overflow: 'hidden',
        margin: 10,
        marginBottom:20,}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 300, alignSelf: 'center'}}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            title="이곳에 메세지가 표시됩니다"
            coordinate={{latitude: latitude, longitude: longitude}}
          />
        </MapView>
        </View> 
        <View style={{marginHorizontal: 10}}>
          <Text style={{ fontSize:16, color:'#335342', fontWeight:'bold'}}>{converttime}<Text style={{fontSize:14, color:'#595959'}}> 해당 시간에</Text></Text>
          <Text style={{ fontSize:16, color:'#335342', fontWeight:'bold'}}>{transPos}<Text style={{fontSize:14, color:'#595959'}}> 에서 확인할 수 있습니다!</Text></Text>
        </View>
      <View style={{margin:10}}>
        <Text style={{fontSize:18}}>메세지 내용</Text>
      </View>
        <View style={{...styles.messageContent, ...styles.backgroundSelect(papertype)}}>
        {image != null ? <Image source={{uri:image}} style={{marginTop:15, marginBottom:10, width: 200, height:200, alignSelf:'center'}}></Image> : null }
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
        >{ messageContent}</Text>
      </View>

      <View
        style={{
          flex: 1.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginHorizontal: 10,
            marginBottom: 10,
          marginBottom:100,
        }}>
        <TouchableOpacity
          style={{...styles.dateBtn, backgroundColor: 'grey'}}
          onPress={() => navigation.goBack()}>
          <Text style={styles.dateText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.dateBtn, backgroundColor: '#7aaf91'}}
          onPress={next}>
          <Text style={styles.dateText}>다음</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
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
