import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Pressable
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useStore} from 'react-redux';
import {messageContain} from '../../reducer/index';
import { launchImageLibrary } from 'react-native-image-picker';
export default function MessageContent({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const store = useStore();
  const [pic, setPic] = useState('');
  const next = () => {
    store.dispatch(messageContain(title, content, pic));
    navigation.navigate('Type');
  };
  const uploadPicture = () => {
    launchImageLibrary().then(res => {
    
      setPic(res.assets[0].uri);
      // setPic(source);
      const formData22 = new FormData();
      const test  =res.assets[0].type;
      formData22.append('image', {uri : res.assets[0].uri, name: res.assets[0].fileName, test})
      console.log(formData22);

    });
  }
  return (
    <ScrollView style={{ flex: 1, }}>
    <KeyboardAvoidingView
    behavior="height"
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
        <TextInput style={{borderWidth: 1, borderRadius: 10, marginTop: 10}} onChangeText={text=> { setTitle(text)}} />
      </View>
        
      <View style={{ flex: 3, margin: 10 }}>

        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
          메세지 내용
        </Text>
        <View>
          {pic ? <Image source={{uri:pic}} style={{marginTop:15, marginBottom:10, width: 200, height:200, alignSelf:'center'}}></Image> : null }
          </View>
          <Pressable onPress={uploadPicture } style={{width: 100, alignSelf:'flex-end'}}><Text>사진 올리기</Text></Pressable>
          <TextInput
            multiline={ true}
            style={{
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            height:100,
          }}
          onChangeText={text=> { setContent(text)}}
        />
       
      </View>
      <View
        style={{
          flex: 1.1,
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
          onPress={next}>
          <Text style={styles.dateText}>다음</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
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
