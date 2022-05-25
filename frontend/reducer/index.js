import { getActionFromState } from '@react-navigation/native';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';
import {combineReducers} from 'redux';

const MESSAGE = 'MESSAGE';
const TIME = 'TIME';
const PLACE = 'PLACE';
const TYPE = 'TYPE';
const PERSON = 'PERSON';
const POSITION = 'POSITION';
const LOGIN = 'LOGIN';
const ISSECRET = 'ISSECRET';
const IMAGEUPLOAD = 'IMAGEUPLOAD';
const PAPERTYPE = 'PAPERTYPE';
const MEMBERID = 'MEMBERID';
const MESSAGEUPDATE = 'MESSAGEUPDATE';
const RECEIVE = 'RECEIVE';
//action - 순수함수로 이뤄져야된다. 일정한 리턴값을 가지는 함수.
export const personContain = (sender, receiver) => {
  return {type: PERSON, sender, receiver};
};
export const timeContain = data => {
  return {type: TIME, data};
};
export const placeContain = (lat, lng) => {
  return {type: PLACE, lat, lng};
};
export const typeContain = data => {
  return {type: TYPE, data};
};
export const messageContain = (title, content, pic, papertype) => {
  return {type: MESSAGE, title, content, pic,papertype};
};

export const imageContain = (pic) => {
  return {type: IMAGEUPLOAD, pic};
};

export const positionContain = (lat, lng) => {
  return {type: POSITION, lat, lng};
};
export const userContain = (memberid, img, kakaoid, nickname) => {
  return {type: LOGIN, memberid, img, kakaoid, nickname};
};
export const secretContain = () => {
  return {type: ISSECRET};
};
export const memberidContain = (member) => { return { type: MEMBERID, member } };
export const markerContain = (data) => { return { type: MESSAGEUPDATE, data } };
export const recevierContain = ( messageId,  senderId,  senderName,  receiverId,  receiverName,  senderProfileUrl,  latitude,  longitude,
  dueTime,  createdAt,  title,  contentText,  location,  senderUrl,receiverUrl, paperType) => { return { type: RECEIVE,  messageId,  senderId,  senderName,  receiverId,  receiverName,  senderProfileUrl,  latitude,  longitude,
    dueTime,
    createdAt,
    title,
    contentText,
    location,
    senderUrl,
    receiverUrl,
    paperType}}
//store
const init = {
  dueTime: Date.now(),
  latitude: '',
  longitude: '',
  senderId: -1,
  receiverId: -1,
  title: '',
  contentText: '',
  secret: false,
  contentUrl: '',
};
//reducer
const reducer = (state = init, action) => {
  switch (action.type) {
    case 'PERSON':
      return {
        ...state,
        receiverId: action.receiver,
        senderId: action.sender,
      };
    case 'TIME':
      return {
        ...state,
        dueTime: action.data,
      };
    case 'PLACE':
      return {
        ...state,
        latitude: action.lat,
        longitude: action.lng,
      };
    case 'MESSAGE':
      return {
        ...state,
        title: action.title,
        contentText: action.content,
        contentUrl: action.pic,
        paperType:action.papertype,
      };
    case 'IMAGEUPLOAD':
      return {
        ...state,
        contentUrl: action.pic,
      }
    case 'ISSECRET':
      return {
        ...state,
        secret: true,
      };

    default:
      return state;
  }
};

const position = {
  lat: 0,
  lng: 0,
};

const posreducer = (state = position, action) => {
  switch (action.type) {
    case 'POSITION':
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
      };
    default:
      return state;
  }
};

const userinfo = {
  memberId: '',
  kakaoId: '',
  profileUrl: '',
  nickname: '',
};

const markerstore = {
  markers: [],
}

const messages = (state = markerstore, action) => {
  switch (action.type) {
    case MESSAGEUPDATE:
      return {
        ...state,
        markers: action.data,
      }
    default:
      return state;
  }
}

const messageDetail = {
  messageId: 0,
  senderId: 0,
  senderName: '',
  receiverId: 0,
  receiverName: '',
  senderProfileUrl:'',
  latitude: '',
  longitude: '',
  dueTime: '',
  createdAt: '',
  title: "",
  contentText: "",
  location: "",
  senderUrl: "",
  receiverUrl: "",
  paperType: 0,
  checked: ''
}


const singleMessage = (state = messageDetail, action) => {
  switch (action.type) {
    case RECEIVE:
      return {
        ...state,
        messageId: action.messageId,
        senderId: action.senderId,
        senderName: action.senderName,
        receiverId: action.receiverId,
        receiverName: action.receiverName,
        senderProfileUrl: action.senderProfileUrl,
        latitude: action.latitude,
        longitude: action.longitude,
        dueTime: action.dueTime,
        createdAt: action.createdAt,
        title: action.title,
        contentText: action.contentText,
        location: action.location,
        senderUrl: action.senderUrl,
        receiverUrl: action.receiverUrl,
        paperType: action.paperType,
      }
    default: return state
  }
}


const userreducer = (state = userinfo, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        memberId: action.memberid,
        kakaoId: action.kakaoid,
        profileUrl: action.img,
        nickname: action.nickname,
      };
    case MEMBERID:
      return {
        ...state,
        memberId: action.member,
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({userreducer, reducer, posreducer, messages, singleMessage});

export default rootReducer;
