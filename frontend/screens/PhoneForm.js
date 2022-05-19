import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function PhoneForm({navigation, route}) {
  const {id, phoneNumber, properties} = route.params;
  const first = useRef(null);
  const second = useRef(null);
  const third = useRef(null);
  const fourth = useRef(null);
  const fifth = useRef(null);
  const sixth = useRef(null);

  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [five, setFive] = useState('');
  const [six, setSix] = useState('');

  const checkPhone = () => {
    const code = one + two + three + four + five + six;
    axios({
      url: 'http://k6c102.p.ssafy.io:8080/v1/member/verify',
      method: 'post',
      data: {
        kakaoId: id,
        number: code,
      },
    })
      .then(res => {
        if (res.status == 200) {
          axios({
            url: 'http://k6c102.p.ssafy.io:8080/v1/oauth/signup',
            method: 'post',
            data: {
              kakaoId: id,
              phoneNumber,
              imageUrl: properties.profile_image,
              nickName: properties.nickname,
              firstCheck: true,
            },
          })
            .then(res => {
              alert('회원가입 성공!');
              navigation.navigate('Main');
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setOne(text);
            if (text.length === 1) second.current.focus();
          }}
        />
        <TextInput
          ref={second}
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setTwo(text);
            if (text.length === 1) third.current.focus();
          }}
        />
        <TextInput
          ref={third}
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setThree(text);
            if (text.length === 1) fourth.current.focus();
          }}
        />
        <TextInput
          ref={fourth}
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setFour(text);
            if (text.length === 1) fifth.current.focus();
          }}
        />
        <TextInput
          ref={fifth}
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setFive(text);
            if (text.length === 1) sixth.current.focus();
          }}
        />
        <TextInput
          ref={sixth}
          style={styles.textInput}
          keyboardType="phone-pad"
          onChangeText={text => {
            setSix(text);
          }}
          onSubmitEditing={checkPhone}
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
          }}
          onPress={checkPhone}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            인증번호 확인하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#4385E0',
    padding: 10,
    fontSize: 20,
  },
});
