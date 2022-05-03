import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useStore} from 'react-redux';
import {timeContain} from '../../reducer';
export default function MessageTime({navigation}) {
  const [date, setDate] = useState(new Date());
  const store = useStore();

  const next = () => {
    store.dispatch(timeContain(date));
    navigation.navigate('Place');
  };

  const setDateWithTime = time => {
    setDate(new Date(Date.now() + 3600 * 1000 * 24 * time));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 0.1,
          marginHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          메세지 수신 시간을 설정해주세요!
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          선택한 시간에 메세지가 발송됩니다.
        </Text>
      </View>
      <View style={{flex: 0.1, margin: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'grey',
            alignSelf: 'center',
          }}>
          며칠 후에 발송될지 선택하기
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setDateWithTime(1)}>
            <Text style={styles.dateText}>1일후</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setDateWithTime(7)}>
            <Text style={styles.dateText}>일주일후</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setDateWithTime(30)}>
            <Text style={styles.dateText}>한달후</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'grey',
            marginBottom: 10,
          }}>
          혹은 시간 직접 설정하기
        </Text>
        <DatePicker
          date={date}
          onDateChange={date => {
            setDate(date);
          }}
          minimumDate={new Date()}
          locale="ko"
        />
      </View>
      <View style={{flex: 0.1, alignItems: 'flex-end', marginHorizontal: 10}}>
        <TouchableOpacity style={styles.dateBtn} onPress={next}>
          <Text style={styles.dateText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateBtn: {
    backgroundColor: '#4385E0',
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
  },
});
