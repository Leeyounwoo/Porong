import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useStore} from 'react-redux';
import {personContain} from '../../reducer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MessagePerson({navigation}) {
  const [contacts, setContacts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const store = useStore();

  let rotateValueHolder = new Animated.Value(0);

  // animation 함수
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (isUpdating) startImageRotateFunction();
    });
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Header에 버튼 추가
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{marginRight: 10}}
  //         onPress={() => {
  //           startImageRotateFunction();
  //           fetch();
  //         }}>
  //         <Animated.Image
  //           source={require('../../assets/icons/update-arrows.png')}
  //           style={{
  //             width: 30,
  //             height: 30,
  //             tintColor: 'white',
  //             transform: [{rotate: RotateData}],
  //           }}
  //         />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: '마음 사서함이 회원님의 연락처에 접근하려고 합니다.',
      })
        // 연략처 접근 성공시
        .then(_ => {
          Contacts.getAll()
            // Phone에 저장되어 있는 모든 연락처에 접근
            .then(res => {
              const temp = [];
              const numData = [];
              res.map(contact => {
                if (contact.phoneNumbers[0]) {
                  let num = contact.phoneNumbers[0].number;
                  num = num.replace(/-/g, '');
                  num = num.replace(/ /g, '');
                  numData.push(num);
                  temp.push({
                    name: contact.displayName,
                    phoneNumber: num,
                    signup: false,
                    profileUrl: null,
                    memberId: -1,
                  });
                }
              });
              axios({
                url: 'http://k6c102.p.ssafy.io:8080/v1/member/fetchContact',
                method: 'post',
                data: numData,
              })
                .then(result => {
                  const numArr = result.data.map(d => d.phoneNumber);
                  const notIn = [];
                  for (let i = 0; i < temp.length; i++) {
                    if (!numArr.includes(temp[i].phoneNumber)) {
                      notIn.push(temp[i]);
                    }
                  }
                  setContacts([...result.data, ...notIn]);
                })
                .catch(err => {
                  console.log('axios fetchContact error : ', err);
                });
            })
            .catch(err => {
              console.log('cannot access', err);
            });
        })
        .catch(err => {
          console.log('contact permission error', err);
        });
    } else if (Platform.OS === 'ios') {
      console.log('지원하지 않는 os입니다.');
    }
  }, []);

  const next = (id, isSignin, phoneNumber) => {
    if (isSignin) {
      //???
      AsyncStorage.getItem('user')
        .then(res => {
          console.log(JSON.parse(res));
        })
        .catch(err => {
          console.log(err);
        });
      store.dispatch(personContain(store.getState().userreducer.memberId, id));
      navigation.navigate('Time');
    } else {
      axios({
        url: `http://k6c102.p.ssafy.io:8080/v1/member/recommend?phoneNumber=${phoneNumber}`,
        method: 'post',
      })
        .then(_ => {
          alert('추천 메세지를 발송했습니다.');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  function fetch() {
    Contacts.getAll()
      .then(res => {
        const numData = [];
        res.map(contact => {
          if (contact.phoneNumbers[0]) {
            let num = contact.phoneNumbers[0].number;
            num = num.replace(/-/g, '');
            num = num.replace(/ /g, '');
            numData.push(num);
          } else {
            numData.push('');
          }
        });
        axios({
          url: 'http://k6c102.p.ssafy.io:8080/v1/member/fetchContact',
          method: 'post',
          data: numData,
        })
          .then(result => {
            console.log('from server', result);
            const fetchData = [];
            for (let i = 0; i < result.data.length; i++) {
              console.log('single data : ', result.data[i].memberId);
              if (result.data[i].memberId < 0) {
                fetchData.push({
                  name: res[i].displayName,
                  phoneNumber: res[i].phoneNumbers[0]
                    ? res[i].phoneNumbers[0].number
                    : '',
                  signup: false,
                  profileUrl: null,
                  memberId: -1,
                });
              } else {
                fetchData.push({...result.data[i], name: res[i].displayName});
              }
            }
            setContacts(fetchData);
          })
          .catch(err => {
            console.log('contact fetch error ', err);
          });
      })
      .catch(err => {
        console.log('contact getAll access', err);
      });
  }

  const PhoneBook = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 3,
          backgroundColor: '#ffffff',
          height: 60,
          borderRadius: 10,
          elevation: 3,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}>
          <Image
            source={
              item.signup
                ? {uri: item.profileUrl}
                : require('../../assets/icons/user.png')
            }
            style={{height: 40, width: 40, borderRadius: 100}}
          />
        </View>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'center',
          }}>
          <Text>{item.name}</Text>
          <Text>{item.phoneNumber}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              next(item.memberId, item.signup, item.phoneNumber);
            }}>
            <Image
              style={{width: 25, height: 25}}
              source={
                item.signup
                  ? require('../../assets/icons/messenger.png')
                  : require('../../assets/icons/invite.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fbfaf4'}}>
      <FlatList
        style={{flex: 1}}
        data={contacts}
        renderItem={PhoneBook}
        keyExtractor={item => item.name}
      />
      <View style={{flex: 0.2}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
  },
  contactName: {
    fontSize: 16,
    color: 'blue',
  },
});
