import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function PhoneForm() {
  const first = useRef(null);
  const second = useRef(null);
  const third = useRef(null);
  const fourth = useRef(null);

  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          발송된 인증번호를 입력해주세요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-around',
        }}>
        <TextInput
          ref={first}
          style={{
            textAlign: 'center',
            height: 50,
            width: 60,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#4385E0',
            padding: 10,
            fontSize: 20,
          }}
          keyboardType="phone-pad"
          onChangeText={text => {
            setOne(text);
            if (text.length === 1) second.current.focus();
          }}
        />
        <TextInput
          ref={second}
          style={{
            textAlign: 'center',
            height: 50,
            width: 60,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#4385E0',
            padding: 10,
            fontSize: 20,
          }}
          keyboardType="phone-pad"
          onChangeText={text => {
            setTwo(text);
            if (text.length === 1) third.current.focus();
          }}
        />
        <TextInput
          ref={third}
          style={{
            textAlign: 'center',
            height: 50,
            width: 60,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#4385E0',
            padding: 10,
            fontSize: 20,
          }}
          keyboardType="phone-pad"
          onChangeText={text => {
            setThree(text);
            if (text.length === 1) fourth.current.focus();
          }}
        />
        <TextInput
          ref={fourth}
          style={{
            textAlign: 'center',
            height: 50,
            width: 60,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#4385E0',
            padding: 10,
            fontSize: 20,
          }}
          keyboardType="phone-pad"
          onChangeText={text => {
            setFour(text);
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4385E0',
            width: 180,
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            인증번호 확인하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
