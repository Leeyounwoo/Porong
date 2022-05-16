import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {useStore} from 'react-redux';

export default function ReceivedBox({navigation}) {
  const store = useStore();
  const [messages, setMessages] = useState({});
  const [messagesKeys, setMessagesKey] = useState([]);

  const [singlePos, setSinglePos] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [transPos, setTransPos] = useState('ee');

  const [label, setLabel] = useState('목록으로 보기');

  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');

  // 알림 클릭시 메세지 디테일로 이동
  const goToMessageDetail = messageId => {
    navigation.push('Temp', {
      messageId: messageId,
    });
  };

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

  useEffect(() => {
    console.log('memberId', store.getState().userreducer.memberId);
    axios
      .get('http://k6c102.p.ssafy.io:8080/v1/message/12/getreceivedmessages')
      .then(res => {
        const tmessages = res.data;
        console.log(tmessages);
        tmessages.map(async (message, midx) => {
          await setMessages(prev => {
            return {
              ...prev,
              [tmessages[midx]['messageId']]: {
                lat: tmessages[midx]['latitude'],
                lng: tmessages[midx]['longitude'],
                title: tmessages[midx]['title'],
                sender: tmessages[midx]['senderName'],
                profileImgUrl: tmessages[midx]['senderProfileUrl'],
              },
            };
          });
          console.log(messages);
          setMessagesKey(prev => [...prev, tmessages[midx]['messageId']]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Geocoder.from(singlePos).then(json => {
      setTransPos(json.results[0].formatted_address);
    });
  }, []);

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
              title="test"
              coordinate={{latitude: singlePos.lat, longitude: singlePos.lng}}
            />
          </MapView>
        </View>
      )}

      {label === '목록으로 보기' &&
        messagesKeys.map((key, keyidx) => {
          if (messages[messagesKeys[keyidx]] !== undefined) {
            return (
              <TouchableHighlight
                onPress={() => {
                  goToMessageDetail(messagesKeys[keyidx]);
                }}
                key={keyidx}>
                <View style={styles.alarmcontainer}>
                  <View style={styles.profilebox}>
                    <Image
                      source={{
                        uri: messages[messagesKeys[keyidx]].profileImgUrl,
                      }}
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
              </TouchableHighlight>
            );
          }
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
    width: 300,
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
