import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
} from 'react-native';
import axios from 'axios';

export default function Signin({navigation, route}) {
  const {properties, id} = route.params;

  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  const signin = () => {
    axios
      .post('http://k6c102.p.ssafy.io:8080/v1/member/authentication', {
        kakaoId: id,
        phoneNumber: first + second + third,
      })
      .then(res => {
        if (res.status == 200) {
          alert('인증번호 발송 성공!');
          navigation.navigate('phone', {id});
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity>
            <Image
              source={{uri: properties.profile_image}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 10,
            }}>
            안녕하세요 {properties.nickname}님!
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              color: 'grey',
              marginTop: 10,
            }}>
            회원가입을 위해 휴대폰 번호를 입력해주세요.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 80,
            }}>
            <TextInput
              ref={firstRef}
              style={{
                textAlign: 'center',
                width: 60,
                height: 40,
                margin: 12,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#4385E0',
                padding: 10,
                fontSize: 20,
              }}
              value={first}
              keyboardType="phone-pad"
              onChangeText={text => {
                setFirst(text);
                if (text.length === 3) {
                  secondRef.current.focus();
                }
              }}
            />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>-</Text>
            <TextInput
              ref={secondRef}
              style={{
                textAlign: 'center',
                height: 40,
                width: 80,
                margin: 12,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#4385E0',
                padding: 10,
                fontSize: 20,
              }}
              value={second}
              keyboardType="phone-pad"
              onChangeText={text => {
                setSecond(text);
                if (text.length === 4) {
                  thirdRef.current.focus();
                }
              }}
            />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>-</Text>
            <TextInput
              ref={thirdRef}
              style={{
                textAlign: 'center',
                height: 40,
                width: 80,
                margin: 12,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#4385E0',
                padding: 10,
                fontSize: 20,
              }}
              value={third}
              keyboardType="phone-pad"
              onChangeText={text => {
                setThird(text);
              }}
              onSubmitEditing={signin}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: 120,
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
          onPress={signin}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
