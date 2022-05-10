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
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useStore} from 'react-redux';
import {personContain} from '../../reducer';
import axios from 'axios';

export default function MessagePerson({navigation}) {
  const [contacts, setContacts] = useState([]);
  const [fetchedItem, setFetchedItem] = useState([]);

  const store = useStore();

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: '마음 사서함이 회원님의 연락처에 접근하려고 합니다.',
      }).then(() => {
        getList();
      });
    } else if (Platform.OS === 'ios') {
      getList();
    }
  }, []);

  const getList = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
        fetch();
      })
      .catch(e => {
        console.log('cannot access');
      });
  };

  const next = () => {
    store.dispatch(personContain(contacts));
    navigation.navigate('Time');
  };

  const fetch = () => {
    const d = [];
    for (let i = 0; i < contacts.length; i++) {
      let num = contacts[i].phoneNumbers[0].number;
      if (num.includes('-')) {
        num = num.replaceAll('-', '');
        num = num.replaceAll(' ', '');
      }
      d.push(num);
    }
    axios({
      url: 'http://k6c102.p.ssafy.io:8080/v1/member/fetchContact',
      method: 'post',
      data: d,
    })
      .then(res => {
        console.log(res);
        setFetchedItem(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        data={fetchedItem}
        renderItem={PhoneBook}
        keyExtractor={item => item.phoneNumber}
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
