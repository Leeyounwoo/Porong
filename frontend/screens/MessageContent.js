import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function MessageContent({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 0.7,
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          메세지 제목
        </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 10, marginTop: 10}} />
      </View>
      <View style={{flex: 3, margin: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          메세지 내용
        </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 10, marginTop: 10}} />
      </View>

      <View
        style={{
          flex: 1,
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
          style={{...styles.dateBtn, backgroundColor: '#4385E0'}}
          onPress={() => navigation.navigate('Type')}>
          <Text style={styles.dateText}>다음</Text>
        </TouchableOpacity>
      </View>
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
});