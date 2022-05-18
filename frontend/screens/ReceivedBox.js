import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {useStore} from 'react-redux';

export default function ReceivedBox({navigation}) {
  const store = useStore();
  const [receivedMessages, setReceivedMessages] = useState({});
  const [receivedMessagesKeys, setReceivedMessagesKeys] = useState([]);
  const [sendedMessages, setSendedMessages] = useState({});
  const [sendedMessagesKeys, setSendedMessagesKeys] = useState([]);
  const [memberId, setMemberId] = useState(
    store.getState().userreducer.memberId,
  );
  const [singlePos, setSinglePos] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [transPos, setTransPos] = useState('ee');
  const [label, setLabel] = useState('목록으로 보기');
  const [markers, setMarkers] = useState(null);
  const [label1, setLabel1] = useState('받은 메세지');

  useEffect(() => {
    setMemberId(store.getState().userreducer.memberId);
  }, []);

  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');
  // 받은 메세지 클릭시 상세 페이지로 이동
  const goToMessageDetail1 = messageId => {
    navigation.push('Temp', {
      messageId: messageId,
      amISend: false,
    });
  };

  // 보낸 메세지 클릭시 상세 디테일로 이동
  const goToMessageDetail2 = messageId => {
    navigation.push('Temp', {
      messageId: messageId,
      amISend: true,
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
    if (label1 == '보낸 메세지') {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/message/${memberId}/getsentmessages`,
        )
        .then(res => {
          let temp = res.data;
          let show = [];
          temp.map((single, idx) => {
            show.push(single);
          });
          console.log(show);
          setMarkers(show);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (label1 == '받은 메세지') {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/message/${memberId}/getreceivedmessages`,
        )
        .then(res => {
          let temp = res.data;
          let show = [];
          temp.map((single, idx) => {
            show.push(single);
          });
          console.log(show);
          setMarkers(show);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [label1, memberId]);

  useEffect(() => {
    // 받은 메세지
    axios
      .get(
        `http://k6c102.p.ssafy.io:8080/v1/message/${memberId}/getreceivedmessages`,
      )
      .then(res => {
        const tmessages = res.data;
        tmessages.map(async (message, midx) => {
          await setReceivedMessages(prev => {
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
          setReceivedMessagesKeys(prev => [
            ...prev,
            tmessages[midx]['messageId'],
          ]);
        });
      })
      .catch(err => {
        console.log(err);
      });
    // 보낸 메세지
    axios
      .get(
        `http://k6c102.p.ssafy.io:8080/v1/message/${memberId}/getsentmessages`,
      )
      .then(res => {
        const tmessages = res.data;
        tmessages.map(async (message, midx) => {
          await setSendedMessages(prev => {
            return {
              ...prev,
              [tmessages[midx]['messageId']]: {
                lat: tmessages[midx]['latitude'],
                lng: tmessages[midx]['longitude'],
                title: tmessages[midx]['title'],
                sender: tmessages[midx]['receiverName'],
                profileImgUrl: tmessages[midx]['receiverProfileUrl'],
              },
            };
          });
          setSendedMessagesKeys(prev => [
            ...prev,
            tmessages[midx]['messageId'],
          ]);
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
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginHorizontal: '20%',
        }}>
        <View
          style={{
            marginVertical: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <ModalDropdown
            style={{
              alignItems: 'center',
              width: 100,
              fontWeight: 'bold',
            }}
            defaultValue="받은 메세지"
            options={['받은 메세지', '보낸 메세지']}
            dropdownStyle={{
              height: 70,
            }}
            textStyle={{color: 'black', fontWeight: '900'}}
            onSelect={(idx, value) => setLabel1(value)}
          />
        </View>
        <View
          style={{
            marginLeft: 100,
            marginVertical: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <ModalDropdown
            style={{
              alignItems: 'center',
              width: 100,
              fontWeight: 'bold',
            }}
            defaultValue="목록으로 보기"
            options={['지도로 보기', '목록으로 보기']}
            dropdownStyle={{
              height: 70,
            }}
            textStyle={{color: 'black', fontWeight: '900'}}
            onSelect={(idx, value) => setLabel(value)}
          />
        </View>
      </View>
      {label === '지도로 보기' && label1 === '받은 메세지' && (
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            minZoomLevel={7}
            maxZoomLevel={7}
            style={{width: 350, height: 350}}
            toolbarEnabled={false}
            initialRegion={{
              latitude: 35.9255,
              longitude: 127.861,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {receivedMessagesKeys !== null
              ? receivedMessagesKeys.map((key, idx) => {
                  return (
                    <Marker
                      key={idx}
                      title={`${receivedMessagesKeys[idx].senderName}의 메세지`}
                      onPress={() => {
                        goToMessageDetail1(receivedMessagesKeys[idx].messageId);
                      }}
                      coordinate={{
                        latitude: receivedMessagesKeys[idx].latitude,
                        longitude: receivedMessagesKeys[idx].longitude,
                      }}>
                      <Image
                        source={{
                          uri: receivedMessagesKeys[idx].senderProfileUrl,
                        }}
                        style={{height: 35, width: 35, borderRadius: 100}}
                      />
                      {/* <Image
                          source={{uri: receivedMessagesKeys[idx].receiverProfileUrl}}
                          style={{height: 35, width: 35, borderRadius: 100}}
                        /> */}
                    </Marker>
                  );
                })
              : null}
          </MapView>
        </View>
      )}
      {label === '지도로 보기' && label1 === '보낸 메세지' && (
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            minZoomLevel={7}
            maxZoomLevel={7}
            style={{width: 350, height: 350}}
            toolbarEnabled={false}
            initialRegion={{
              latitude: 35.9255,
              longitude: 127.861,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {sendedMessagesKeys !== null
              ? sendedMessagesKeys.map((key, idx) => {
                  return (
                    <Marker
                      key={idx}
                      title={`${sendedMessagesKeys[idx].senderName}의 메세지`}
                      onPress={() => {
                        goToMessageDetail1(sendedMessagesKeys[idx].messageId);
                      }}
                      coordinate={{
                        latitude: sendedMessagesKeys[idx].latitude,
                        longitude: sendedMessagesKeys[idx].longitude,
                      }}>
                      <Image
                        source={{
                          uri: sendedMessagesKeys[idx].receiverProfileUrl,
                        }}
                        style={{height: 35, width: 35, borderRadius: 100}}
                      />
                    </Marker>
                  );
                })
              : null}
          </MapView>
        </View>
      )}

      <ScrollView style={{marginBottom: 33}}>
        {label === '목록으로 보기' &&
          label1 === '받은 메세지' &&
          receivedMessagesKeys.map((key, keyidx) => {
            if (receivedMessages[receivedMessagesKeys[keyidx]] !== undefined) {
              return (
                <TouchableHighlight
                  onPress={() => {
                    goToMessageDetail2(receivedMessagesKeys[keyidx]);
                  }}
                  key={keyidx}>
                  <View style={styles.alarmcontainer}>
                    <View style={styles.profilebox}>
                      <Image
                        source={{
                          uri: receivedMessages[receivedMessagesKeys[keyidx]]
                            .profileImgUrl,
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
                        }}>{`${
                        receivedMessages[receivedMessagesKeys[keyidx]].sender
                      }`}</Text>
                      <Text>
                        {receivedMessages[receivedMessagesKeys[keyidx]].title}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }
          })}
        {label === '목록으로 보기' &&
          label1 === '보낸 메세지' &&
          sendedMessagesKeys.map((key, keyidx) => {
            if (sendedMessages[sendedMessagesKeys[keyidx]] !== undefined) {
              return (
                <TouchableHighlight
                  onPress={() => {
                    goToMessageDetail2(sendedMessagesKeys[keyidx]);
                  }}
                  key={keyidx}>
                  <View style={styles.alarmcontainer}>
                    <View style={styles.profilebox}>
                      <Image
                        source={{
                          uri: sendedMessages[sendedMessagesKeys[keyidx]]
                            .profileImgUrl,
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
                        }}>{`${
                        sendedMessages[sendedMessagesKeys[keyidx]].sender
                      }`}</Text>
                      <Text>
                        {sendedMessages[sendedMessagesKeys[keyidx]].title}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }
          })}
      </ScrollView>
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
