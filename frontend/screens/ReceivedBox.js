import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import { useStore } from 'react-redux';

export default function ReceivedBox() {
  const [messages, setMessages] = useState({
    messageID01: {
      lat: 37.5665,
      lng: 126.978,
      title: '메세지 제목1',
      sender: '보낸 사람1',
      profileImgUrl: 'https://reactjs.org/logo-og.png',
    },
    messageID02: {
      lat: 37.5665,
      lng: 126.978,
      title: '메세지 제목22',
      sender: '보낸 사람2',
      profileImgUrl: 'https://reactjs.org/logo-og.png',
    },
  });




  const messagesKeys = Object.keys(messages);

  const [singlePos, setSinglePos] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [transPos, setTransPos] = useState('ee');

  const [label, setLabel] = useState('목록으로 보기');
  const [markers, setMarkers] = useState(null);
  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');

  useEffect(() => {
    Geocoder.from(singlePos).then(json => {
      setTransPos(json.results[0].formatted_address);
    });
  }, []);

  const store = useStore();
  useEffect(() => {
    if (label == '지도로 보기') {
      axios.get(`http://k6c102.p.ssafy.io:8080/v1/message/${store.getState().userreducer.memberId}/getsentmessages`)
        .then(res => {
          let temp = res.data;
          let show = [];
          temp.map((single, idx) => {
            show.push(single);
          })
          setMarkers(show);
        }).catch(err => { console.log(err); });
      
    }



  },[label])


  const btnClick = () => {
    setUlFlag(true);
  };

  const seeMap = () => {
    setDisplayMap(true);
    setUlFlag(false);
  };

  const seeList = () => {
    setDisplayMap(false);
    setUlFlag(false);
  };
  console.log('label', label);

  return (
    <View style={styles.allcontainer}>
      <View
        style={{
          marginLeft: 200,
          marginVertical: 50,
          borderRadius: 5,
          borderWidth: 1,
          // borderBottomWidth: 1,
          borderColor: 'black',
        }}>
        <ModalDropdown
          style={{
            width: 100,
            fontWeight: 'bold',
          }}
          defaultValue="목록으로 보기"
          options={['지도로 보기', '목록으로 보기']}
          dropdownStyle={{
            height: 70,
          }}
          // defaultTextStyle={{fontWeight: 'bold'}}
          textStyle={{color: 'black', fontWeight: '900'}}
          onSelect={(idx, value) => setLabel(value)}
        />
      </View>
      {label === '지도로 보기' && (
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            minZoomLevel={7}
            maxZoomLevel={7}
            style={{width: 350, height: 350}}
            initialRegion={{
              latitude: 35.9255,
              longitude:  127.8610,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {markers != null ? markers.map((single, idx) => {
              return <Marker key={idx}
                title={`${single.latitude}, ${single.longitude}`}
                coordinate={{ latitude: single.latitude, longitude: single.longitude }}>
                <Image source={{ uri: single.receiverProfileUrl }} style={{ height: 35, width: 35, borderRadius: 100 }} /></Marker>
            }) : null}
          </MapView>
        </View>
      )}

      {label === '목록으로 보기' &&
        messagesKeys.map((key, keyidx) => {
          return (
            <View style={styles.alarmcontainer} key={keyidx}>
              <View style={styles.profilebox}>
                <Image
                  source={{uri: messages[messagesKeys[keyidx]].profileImgUrl}}
                  style={styles.profileimage}
                />
              </View>
              <View style={styles.textbox}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: 'black',
                  }}>{`${messages[messagesKeys[keyidx]].sender}`}</Text>
                <Text>{messages[messagesKeys[keyidx]].title}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  btnrow: {
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  alarmcontainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0075FF',
  },
  profilebox: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 70,
    overflow: 'hidden',
  },
  profileimage: {
    width: '100%',
    height: '100%',
    // 'object-fit': 'cover',
  },
  textbox: {
    marginLeft: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#4385E0',
    alignItems: 'center',
  },
});
