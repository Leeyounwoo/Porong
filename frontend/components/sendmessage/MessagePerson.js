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
  const [contacts, setContacts] = useState({});
  const [fetchedItem, setFetchedItem] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [phoneNum, setPhoneNum] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const store = useStore();

  let rotateValueHolder = new Animated.Value(0);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            startImageRotateFunction();
            fetch();
          }}>
          <Animated.Image
            source={require('../../assets/icons/update-arrows.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
              transform: [{rotate: RotateData}],
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: '마음 사서함이 회원님의 연락처에 접근하려고 합니다.',
      })
        .then(result => {
          console.log(result);
          Contacts.getAll()
            .then(res => {
              console.log(res);
              const temp = [];
              for (let i = 0; i < res.length; i++) {
                if (res[i].phoneNumbers[0]) {
                  temp.push({
                    name: res[i].displayName,
                    phoneNumber: res[i].phoneNumbers[0].number,
                    signup: false,
                    profileUrl: null,
                    memberId: -1,
                  });
                }
              }
              setContacts(temp);
            })
            .catch(err => {
              console.log('cannot access', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (Platform.OS === 'ios') {
      getList();
    }
  }, []);

  const getList = () => {
    Contacts.getAll()
      .then(res => {
        setContacts(res);
      })
      .catch(err => {
        console.log('cannot access', err);
      });
  };

  const next = (id, isSignin) => {
    if (isSignin) {
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
      console.log('no');
    }
  };

  function fetch() {
    Contacts.getAll()
      .then(res => {
        const contactData = [];
        res.map(contact => {
          let num = contact.phoneNumbers[0].number;
          num = num.replaceAll('-', '');
          num = num.replaceAll(' ', '');
          contactData.push(num);
        });
        axios({
          url: 'http://k6c102.p.ssafy.io:8080/v1/member/fetchContact',
          method: 'post',
          data: contactData,
        })
          .then(result => {
            console.log('from server', result);
            const fetchData = [];
            for (let i = 0; i < result.data.length; i++) {
              if (result.data[i].memberId < 0) {
                fetchData.push(contacts[i]);
              } else {
                fetchData.push({...result.data[i], name: contacts[i].name});
              }
            }
            console.log(fetchData);
            setContacts(fetchData);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log('cannot access', err);
      });
  }

  const PhoneBook = ({item}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
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
              next(item.memberId, item.signup);
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
    <View style={{flex: 1}}>
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
