import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import {useStore, useSelector} from 'react-redux';
import {NativeBaseProvider, Select, Box, CheckIcon} from 'native-base';
import {useIsFocused} from '@react-navigation/native';

export default function ReceivedBox({navigation}) {
  const store = useStore();
  const [receivedMessages, setReceivedMessages] = useState({});
  const [receivedMessagesKeys, setReceivedMessagesKeys] = useState([]);
  const [sendedMessages, setSendedMessages] = useState({});
  const [sendedMessagesKeys, setSendedMessagesKeys] = useState([]);
  const user = useSelector(state => state.userreducer);
  const isFocused = useIsFocused();

  const [singlePos, setSinglePos] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [transPos, setTransPos] = useState('ee');
  const [label, setLabel] = useState('list');
  const [markers, setMarkers] = useState(null);
  const [label1, setLabel1] = useState('receive');

  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');
  // 받은 메세지 클릭시 상세 페이지로 이동
  const goToMessageDetail1 = messageId => {
    navigation.push('MessageTemp', {
      messageId: messageId,
      amISend: false,
    });
  };

  // 보낸 메세지 클릭시 상세 디테일로 이동
  const goToMessageDetail2 = messageId => {
    navigation.push('MessageTemp', {
      messageId: messageId,
      amISend: true,
    });
  };

  useEffect(() => {
    if (label1 === 'send') {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/message/${user.memberId}/getsentmessages`,
        )
        .then(res => {
          // let temp = res.data;
          // let show = [];
          // temp.map((single, idx) => {
          //   show.push(single);
          // });
          setMarkers(res.data);
        })
        .catch(err => {
          console.log('getsentmessages error', err);
        });
    } else if (label1 === 'receive') {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/message/${user.memberId}/getreceivedmessages`,
        )
        .then(res => {
          // let temp = res.data;
          // let show = [];
          // temp.map((single, idx) => {
          //   show.push(single);
          // });
          setMarkers(res.data);
        })
        .catch(err => {
          console.log('getreceivedmessage error', err);
        });
    }
  }, [label1, user.memberId, isFocused]);

  useLayoutEffect(() => {
    // 받은 메세지
    axios
      .get(
        `http://k6c102.p.ssafy.io:8080/v1/message/${user.memberId}/getreceivedmessages`,
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
        console.log('getreceivedmessages set error', err);
      });
    // 보낸 메세지
    axios
      .get(
        `http://k6c102.p.ssafy.io:8080/v1/message/${user.memberId}/getsentmessages`,
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
        console.log('sentmessages set error', err);
      });
  }, [label1, user.memberId, isFocused]);

  useEffect(() => {
    Geocoder.from(singlePos).then(json => {
      setTransPos(json.results[0].formatted_address);
    });
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.allcontainer}>
        {/* dropdown 메뉴 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <Box w="3/4" maxW="160">
            <Select
              selectedValue={label1}
              minWidth="90"
              accessibilityLabel="Choose Service"
              placeholder={label1}
              color="black"
              backgroundColor="white"
              _selectedItem={{
                bg: 'white',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setLabel1(itemValue);
              }}>
              <Select.Item label="받은 메세지함" value="receive" />
              <Select.Item label="보낸 메세지함" value="send" />
            </Select>
          </Box>
          <Box w="3/4" maxW="160">
            <Select
              selectedValue={label}
              minWidth="90"
              accessibilityLabel="Choose Service"
              placeholder={label}
              color="black"
              backgroundColor="white"
              _selectedItem={{
                bg: 'white',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setLabel(itemValue);
              }}>
              <Select.Item label="목록으로 보기" value="list" />
              <Select.Item label="지도로 보기" value="map" />
            </Select>
          </Box>
        </View>
        {label === 'map' && (
          <View style={styles.mapcontainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              minZoomLevel={7}
              maxZoomLevel={7}
              toolbarEnabled={false}
              initialRegion={{
                latitude: 35.9255,
                longitude: 127.861,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {markers != null
                ? markers.map((single, idx) => {
                    return (
                      <Marker
                        key={idx}
                        title={`${single.senderName}의 메세지`}
                        onPress={() => {
                          if (label1 === 'receive') {
                            goToMessageDetail1(single.messageId);
                          } else {
                            goToMessageDetail2(single.messageId);
                          }
                        }}
                        coordinate={{
                          latitude: single.latitude,
                          longitude: single.longitude,
                        }}>
                        {label1 === 'receive' ? (
                          <Image
                            source={{uri: single.senderProfileUrl}}
                            style={{height: 35, width: 35, borderRadius: 100}}
                          />
                        ) : (
                          <Image
                            source={{uri: single.receiverProfileUrl}}
                            style={{height: 35, width: 35, borderRadius: 100}}
                          />
                        )}
                      </Marker>
                    );
                  })
                : null}
            </MapView>
          </View>
        )}

        <ScrollView style={{marginBottom: 150}}>
          {label === 'list' &&
            label1 === 'receive' &&
            receivedMessagesKeys.map((key, keyidx) => {
              if (
                receivedMessages[receivedMessagesKeys[keyidx]] !== undefined
              ) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      goToMessageDetail1(receivedMessagesKeys[keyidx]);
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
                            fontSize: 18,
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
                  </TouchableOpacity>
                );
              }
            })}
          {label === 'list' &&
            label1 === 'send' &&
            sendedMessagesKeys.map((key, keyidx) => {
              if (sendedMessages[sendedMessagesKeys[keyidx]] !== undefined) {
                return (
                  <TouchableOpacity
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
                  </TouchableOpacity>
                );
              }
            })}
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  allcontainer: {},
  btnrow: {
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  alarmcontainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 350,
    marginBottom: 10,
    borderRadius: 10,
  },
  profilebox: {
    width: 60,
    height: 60,
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapcontainer: {
    height: 510,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
});
