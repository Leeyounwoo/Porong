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
  Pressable,
  Alert
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useStore} from 'react-redux';
import {messageContain} from '../../reducer/index';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { imageContain } from '../../reducer/index';
import { pinchHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PinchGestureHandler';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
export default function MessageContent({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const store = useStore();
  const [image, setImage] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [imageurl, setImageurl] = useState(null);
  const [flag, setFlag] = useState(false);
  const next = () => {
    store.dispatch(messageContain(title, content, imageurl));
    navigation.navigate('Total');
  };
  const getdownload = (get) => {

    get.getDownloadURL().then(res => {
        setImageurl(res);
    }).catch(err => {
        console.log("download data error : ", err);
      });
  
  }

  const uploadImage = async () => {

    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = image;
    const imageRef = storage().ref(filename);
    await imageRef.putFile(uploadUri);
    getdownload(imageRef);

  }

  const uploadPicture = async () => {

    launchImageLibrary().then(res => {
      setImage(res.assets[0].uri);
      store.dispatch(imageContain(res.assets[0].uri));
    }).then(() => {
      setFlag(true);
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
          {image ? <Image source={{uri:image}} style={{marginTop:15, marginBottom:10, width: 200, height:200, alignSelf:'center'}}></Image> : null }
          </View>
          {!flag ? <Pressable onPress={uploadPicture} style={{ width: 100, alignSelf: 'flex-end' }}><Text>사진 올리기</Text></Pressable> : <Pressable onPress={uploadImage} style={{ width: 100, alignSelf: 'flex-end' }}><Text>사진 업로드</Text></Pressable>}
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
