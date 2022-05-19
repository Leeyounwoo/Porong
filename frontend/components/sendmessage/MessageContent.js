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
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useStore} from 'react-redux';
import {messageContain} from '../../reducer/index';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {imageContain} from '../../reducer/index';
import {pinchHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/PinchGestureHandler';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';
export default function MessageContent({navigation}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const store = useStore();
  const [image, setImage] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [imageurl, setImageurl] = useState(null);
  const [flag, setFlag] = useState(false);
  const [uploadText, setUploadText] = useState('사진 업로드');
  const [background, setBackground] = useState('#335342');
  const [colors, setColors] = useState(0);
  const next = () => {
    store.dispatch(messageContain(title, content, imageurl, colors));
    navigation.navigate('Total');
  };

  const nextColor = () => {
    if (colors < 4) {
      console.log(colors);
      return setColors(colors + 1);
    }
    setColors(0);
  };

  const getdownload = get => {
    get
      .getDownloadURL()
      .then(res => {
        setImageurl(res);
      })
      .catch(err => {
        console.log('download data error : ', err);
      });
    setUploadText('업로드 완료!');
  };

  const uploadImage = async () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = image;
    const imageRef = storage().ref(filename);
    await imageRef.putFile(uploadUri);
    getdownload(imageRef);
  };

  const uploadPicture = async () => {
    launchImageLibrary()
      .then(res => {
        setImage(res.assets[0].uri);
        store.dispatch(imageContain(res.assets[0].uri));
      })
      .then(() => {
        setFlag(true);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fbfaf4'}}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}
          enabled>
          <View
            style={{
              flex: 0.7,
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#595959'}}>
              메세지 제목
            </Text>
          </View>
          <TextInput
            style={{
              height: 40,
              margin: 5,
              borderWidth: 1,
              borderColor: '#595959',
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 10,
            }}
            onChangeText={text => {
              setTitle(text);
            }}
          />

          <View
            style={{
              flex: 1,
              margin: 10,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#595959',
                alignSelf: 'flex-start',
              }}>
              메세지 내용{' '}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Pressable
                onPress={nextColor}
                style={{
                  width: 100,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: '#7aaf91',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  색상변경
                </Text>
              </Pressable>
              {!flag ? (
                <Pressable
                  onPress={uploadPicture}
                  style={{
                    width: 100,
                    height: 30,
                    marginLeft: 'auto',
                    borderRadius: 5,
                    backgroundColor: '#7aaf91',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    사진 첨부
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={uploadImage}
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#7aaf91',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    {uploadText}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          <View
            style={{...styles.letterback, ...styles.backgroundSelect(colors)}}>
            <View style={{alignSelf: 'center'}}>
              {image ? (
                <Image
                  source={{uri: image}}
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    width: 200,
                    height: 200,
                  }}></Image>
              ) : null}
            </View>
            <TextInput
              multiline={true}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                margin: 20,
                marginTop: 10,
                marginBottom: 5,
                borderColor: '#FFEFBF',
                textDecorationLine: 'underline',
                height: 100,
                backgroundColor: '#fbfaf4',
              }}
              onChangeText={text => {
                setContent(text);
              }}
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
  letterback: {
    borderRadius: 10,
    margin: 10,
    flex: 0.5,
  },
  backgroundSelect: select => {
    if (select == 0) {
      return {
        backgroundColor: '#335342',
      };
    } else if (select == 1) {
      return {
        backgroundColor: '#333333',
      };
    } else if (select == 2) {
      return {
        backgroundColor: '#444444',
      };
    } else if (select == 3) {
      return {
        backgroundColor: '#555555',
      };
    } else if (select == 4) {
      return {
        backgroundColor: '#666666',
      };
    }
  },
  dateText: {
    color: 'white',
  },
});
