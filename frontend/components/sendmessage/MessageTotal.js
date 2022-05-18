import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useSelector, useStore } from 'react-redux';

//데이터의 위치를
export default function MessageTotal({navigation ,route }) {
    const senderName = useSelector(state => state.reducer.senderId);
    const receiverName = useSelector(state => state.reducer.receiverId);
    const latitude = useSelector(state => state.reducer.latitude);
    const longitude = useSelector(state => state.reducer.latitude);
    
    const dueTime = useSelector(state => state.reducer.dueTime);
  const [singlePos, setSinglePos] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const [transPos, setTransPos] = useState('ee');
  const [messageContent, setMessageContent] = useState('찾아야지? 못찾겠지?');
  const [type, setType] = useState('summary');
  const [converttime, setConvertTime] = useState('13:10:22');
  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');
    const store = useStore();
    useEffect(() => {

        console.log(store.getState().reducer);
        Geocoder.from(singlePos).then(json => {
        setTransPos(json.results[0].formatted_address);
        });
    }, []);

  const btnClick = () => {
    console.log('to ' + senderName + 'resend');
    };
    const next = () => {
        navigation.navigate('Type');
    };
  return (
    <View style={styles.allcontainer}>
        <View style={styles.fromtoContainer}>
          <Text style={styles.textContainer('blue')}>{receiverName}</Text>
          <Text style={styles.textContainer('black')}> 님에게</Text>
        </View>
        <View style={styles.fromtoContainer}>
          <Text style={styles.textContainer('blue')}>'{dueTime}' 해당 시간에</Text>
        </View>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          minZoomLevel={18}
          maxZoomLevel={18}
          style={{width: 350, height: 350}}
          initialRegion={{
            latitude: singlePos.lat,
            longitude: singlePos.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            title="이곳에 메세지가 표시됩니다"
            coordinate={{latitude: latitude, longitude: longitude}}
          />
        </MapView>
      </View>
      <View style={styles.positionContainer}>
        <Text style={styles.textContainer('blue')}>{transPos}</Text>
          <Text style={styles.textContainer('black')}> 에서 확인할 수 있습니다!</Text>
      </View>
      <View style={styles.messageTitle}>
        <Text style={styles.textContainer('black')}>메세지 내용</Text>
      </View>
      <View style={styles.messageContent}>
        <Text>{messageContent}</Text>
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
  );
}
const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  fromtoContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
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
    marginTop: 5,
    height: 150,
    width: 400,
    borderWidth: 1,
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
      fontSize: 15,
    };
  },
});
