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
        .then(res => {
          console.log(res);
          Contacts.getAll()
            .then(res => {
              console.log(
                '최초 리스트',
                typeof Array.prototype.slice.call(res),
              );
              const temp = Array.prototype.slice.call(res);
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
        console.log('최초 리스트', typeof Array.prototype.slice.call(res));
        const temp = Array.prototype.slice.call(res);
        setContacts(temp);
      })
      .catch(err => {
        console.log('cannot access', err);
      });
  };

  const next = () => {
    store.dispatch(personContain(contacts));
    navigation.navigate('Time');
  };

  function fetch() {
    setIsFetch(true);
    Contacts.getAll()
      .then(res => {
        console.log('최초 리스트', typeof Array.prototype.slice.call(res));
        const temp = Array.prototype.slice.call(res);
        setContacts(temp);
        let d = [];
        Array.from(res).map(c => {
          let num = c.phoneNumbers[0].number;
          num = num.replaceAll('-', '');
          num = num.replaceAll(' ', '');
          console.log(num);
          d.push(num);
        });
        console.log(d);
        setPhoneNum(d);
        axios({
          url: 'http://k6c102.p.ssafy.io:8080/v1/member/fetchContact',
          method: 'post',
          data: d,
        })
          .then(res => {
            console.log('서버 리스트', res.data);
            const k = [];
            res.data.map((dt, idx) => {
              if (dt.signup) {
                k.push({
                  ...dt,
                  name: contacts[idx].displayName,
                  phoneNumber: contacts[idx].phoneNumbers[0].number,
                });
              } else {
                k.push({
                  signup: false,
                  name: contacts[idx].displayName,
                  phoneNumber: contacts[idx].phoneNumbers[0].number,
                });
              }
            });
            setFetchedItem(k);
            console.log(k);
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
          }}>
          <Image
            source={require('../../assets/icons/user.png')}
            style={{height: 40, width: 40}}
          />
        </View>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'center',
          }}>
          <Text>{item.displayName}</Text>
          <Text>{item.phoneNumbers[0].number}</Text>
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
              backgroundColor: 'green',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>초대하기</Text>
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
        keyExtractor={item => item.phoneNumbers[0].number}
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
