import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector, useStore} from 'react-redux';
import axios from 'axios';
import {
  markerContain,
  memberidContain,
  positionContain,
  userContain,
} from '../reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const secret = require('../assets/icons/question.png');

function displayedAt(createdAt) {
  const duedate = new Date(
    createdAt[0],
    createdAt[1] - 1,
    createdAt[2],
    createdAt[3],
    createdAt[4],
    createdAt[5],
  );
  const milliSeconds = duedate - new Date();
  if (milliSeconds < 0) return `지남`;

  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `잠시 뒤에 확인할 수 있습니다!`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 후 확인할 수 있습니다!`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 후 확인할 수 있습니다!`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 후 확인할 수 있습니다!`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 후 확인할 수 있습니다!`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 후 확인할 수 있습니다!`;
  const years = days / 365;
  return `${Math.floor(years)}년 후 확인할 수 있습니다!`;
}

const Home = ({navigation}) => {
  const store = useStore();
  const position = useSelector(state => state.posreducer);
  // [{}, ]
  const markers = useSelector(state => state.messages.markers);
  const isFocused = useIsFocused();
  const [newMarkers, setNewMarkers] = useState({});
  const [newMarkersKey, setNewMarkersKey] = useState([]);
  const rankIcon = [
    require('../assets/icons/first.png'),
    require('../assets/icons/second.png'),
    require('../assets/icons/third.png'),
  ];
  const markerRef = useRef();
  const [memberId, setMemberId] = useState(null);
  const [ranks, setRank] = useState([]);
  const user = store.getState().userreducer;
  useLayoutEffect(() => {
    let temp = null;
    let test = null;
    let memberid = null;
    AsyncStorage.getItem('user').then(res => {
      temp = JSON.parse(res);

      test = temp.data.authMember;
      if (test != null) {
        store.dispatch(
          userContain(memberid, test.imageUrl, test.kakaoId, test.nickName),
        );
      } else {
        navigation.navigate('Login');
      }
    });
    axios({
      url: 'http://k6c102.p.ssafy.io:8085/v1/ranking/location',
      method: 'get',
    }).then(res => {
      console.log(res);
      setRank(res.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/oauth/convert/kakaoId/${user.kakaoId}`,
        )
        .then(res => {
          store.dispatch(memberidContain(res.data));
          setMemberId(res.data);
        })
        .catch(err => {
          console.log('kakaoId error', err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (memberId) {
      axios
        .get(
          `http://k6c102.p.ssafy.io:8080/v1/message/${memberId}/fetchUncheckedMesaages`,
        )
        .then(json => {
          let received = [];
          json.data.map(single => {
            received.push(single);
          });
          store.dispatch(markerContain(received));
        })
        .catch(err => {
          console.log('axios error at home didmount', err);
        });
    }
  }, [memberId]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        store.dispatch(
          positionContain(position.coords.latitude, position.coords.longitude),
        );
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const clicktest = messageId => {
    navigation.navigate('HomeTemp', {
      messageId: messageId,
      amISend: false,
    });
  };

  // [{messageId, title, dueTime, latitude, longitude, senderProfileUrl}]

  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      const newKeys = keys.filter(
        tempKey =>
          tempKey[0] !== 'A' &&
          tempKey !== 'user' &&
          tempKey !== 'receivedMessages',
      );
      AsyncStorage.multiGet(newKeys, (err, results) => {
        results.map((result, idx) => {
          const key = parseInt(results[idx][0]);
          const value = JSON.parse(results[idx][1]);
          setNewMarkers(prev => {
            return {...prev, [key]: value};
          });
          if (!newMarkersKey.includes(key)) {
            setNewMarkersKey(prev => [...prev, key]);
          }
        });
      });
    });
  }, [isFocused]);

  return (
    <View style={styles.allcontainer}>
      <View style={styles.headcontainer}>
        {user != null ? (
          <Image style={styles.imgstyle} source={{uri: user.profileUrl}} />
        ) : null}
        <Text
          style={{
            marginTop: 5,
            alignSelf: 'center',
            color: '#595959',
            fontWeight: 'bold',
          }}>
          {user ? user.nickname : `로그인 처리가 안됬습니다.`}
        </Text>
      </View>

      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: position.lat,
            longitude: position.lng,
            // latitudeDelta: 0.015,
            // longitudeDelta: 0.0121,
            latitudeDelta: 3.5,
            longitudeDelta: 3.5,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          toolbarEnabled={false}>
          {ranks.map((rank, idx) => {
            return (
              <Marker
                ref={markerRef}
                key={idx}
                title={`제목 : ${rank.location}`}
                // icon={single.type == 0 ? secret : null}
                coordinate={{
                  latitude: rank.latitude,
                  longitude: rank.longitude,
                }}>
                <Image
                  source={rankIcon[idx]}
                  style={{height: 35, width: 35, borderRadius: 100}}
                />
              </Marker>
            );
          })}
          {newMarkersKey.map((single, idx) => {
            //제약 시간 - 현재 시간을 표시
            if (newMarkers[single] !== undefined) {
              return (
                <Marker
                  ref={markerRef}
                  key={idx}
                  onPress={() => {
                    clicktest(single);
                  }}
                  coordinate={{
                    latitude: newMarkers[single]['latitude'],
                    longitude: newMarkers[single]['longitude'],
                  }}>
                  <Image
                    source={
                      newMarkers[single]['senderProfile'] === undefined
                        ? require('../../assets/icons/user.png')
                        : {uri: newMarkers[single]['senderProfile']}
                    }
                    style={{height: 35, width: 35, borderRadius: 100}}
                  />
                </Marker>
              );
            }
          })}
        </MapView>
      </View>
      <View style={styles.messageContainer}>
        {newMarkersKey.length != 0 ? (
          <Text style={{alignSelf: 'center', marginTop: 5, color: 'white'}}>
            확인 안한 메세지가 {newMarkersKey.length}개 있습니다
          </Text>
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 5, color: 'white'}}>
            메세지를 기다리는 중이에요
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fbfaf4',
  },
  mapcontainer: {
    height: 350,
    width: 360,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnContainer: {
    marginTop: 30,
  },
  headcontainer: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  messageContainer: {
    position: 'absolute',
    borderRadius: 20,
    width: 220,
    height: 30,
    top: 150,
    backgroundColor: '#595959',
  },
  imgstyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  newmessage: {
    position: 'absolute',
    bottom: 300,
  },
});

export default Home;
