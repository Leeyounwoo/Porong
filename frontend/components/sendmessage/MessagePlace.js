import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {TextInput} from 'react-native-gesture-handler';
import MapTest from '../Map';
import Geolocation from 'react-native-geolocation-service';
import {useStore} from 'react-redux';
import {placeContain} from '../../reducer';

export default function MessagePlace({navigation}) {
  const [totalpos, setTotalpos] = useState({lat: 0, lng: 0});
  const [address, setAddress] = useState('');
  const store = useStore();
  Geocoder.init('AIzaSyDKnRUG-QXwZuw5qy4SP38K0nfmI0LM09s');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setTotalpos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log('currentPosition error', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    console.log('totalpos');
    if (totalpos.lat != 0 && totalpos.lng != 0) {
      Geocoder.from(totalpos)
        .then(json => {
          setAddress(json.results[0].formatted_address);
        })
        .catch(err => {
          console.log('trans error', err);
        });
    }
  }, [totalpos]);

  const mark = (lat, lng) => {
    console.log("check2");
    setTotalpos({...totalpos, lat: lat, lng: lng});
  };

  const searchAddress = async () => {
    console.log("button click event");
    await Geocoder.from(address).then(json => {
      setTotalpos({
        ...totalpos,
        lat: json.results[0].geometry.location.lat,
        lng: json.results[0].geometry.location.lng,
      });
    });
    console.log(totalpos);
  };

  const prev = () => {
    store.dispatch(placeContain(''));
    navigation.navigate('Time');
  };
  const next = () => {
    store.dispatch(placeContain(totalpos.lat, totalpos.lng));
    navigation.navigate('Content');
  };
  return (
    <View style={styles.selectPositionContainer}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, color: '#595959'}}>
              상대가 메세지를 확인할 수 있는 장소를 선택해주세요!
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: '#595959'}}>
              선택한 장소에서 메세지 열람이 가능해요!
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={styles.searchboxContainer}>
              <TextInput
                onChangeText={text => setAddress(text)}
                value={address}></TextInput>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#7aaf91',
                width: 50,
                height: 35,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={searchAddress}>
              <Text
                style={{
                  color: 'white',
                }}>
                검색
              </Text>
            </TouchableOpacity>
          </View>
          <MapTest totalpos={totalpos} mark={mark} />
          {/* 하단 버튼 */}
          <View
            style={{
              flex: 0.1,
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
              style={{...styles.dateBtn, backgroundColor: '#7aaf91'}}
              onPress={next}>
              <Text style={styles.dateText}>다음</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dateBtn: {
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
  },
  selectPositionContainer: {
    flex: 1,
    backgroundColor: '#fbfaf4',
  },
  textContainer: {
    marginTop: 20,
    flex: 1,
    alignSelf: 'center',
    color: '#595959',
  },
  inputbox: {
    bottom: 400,
    right: 50,
  },
  searchboxContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '80%',
    height: 40,
  },
});
