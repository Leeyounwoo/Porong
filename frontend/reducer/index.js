import { combineReducers } from "redux";

const MESSAGE = "MESSAGE";
const TIME = "TIME";
const PLACE = "PLACE";
const TYPE = "TYPE";
const PERSON = "PERSON";
const POSITION = "POSITION";
const LOGIN = "LOGIN";
//action - 순수함수로 이뤄져야된다. 일정한 리턴값을 가지는 함수.
export const personContain = (sender, receiver) => {return{ type: PERSON, sender,receiver }};
export const timeContain = (data) =>  {return{ type: TIME, data }};
export const placeContain = (lat, lng) =>  {return{ type: PLACE, lat, lng }};
export const typeContain = (data) =>  {return{ type: TYPE, data }};
export const messageContain = (title, content) => {return{ type: MESSAGE, title, content }};
export const positionContain = (lat, lng) => { return {type: POSITION, lat, lng}};
export const userContain = (memberid, img, kakaoid, nickname) => { return { type: LOGIN, memberid, img, kakaoid, nickname } };
//store
const init = {
    dueTime: Date.now(),
    latitude: '',
    longitude: '',
    senderId: -1,
    receiverId: -1,
    title: "",
    contentText : "",
    // type: false,
};


//reducer
const reducer = (state=init, action) => {
    switch(action.type){
        case "PERSON":
            return{
                ...state,
                receiverId: action.receiver,
                senderId: action.sender,
            }
        case "TIME":
            return {
                ...state,
                dueTime: action.data,
            }
        case "PLACE":
            return {
                ...state,
                latitude: action.lat,
                longitude: action.lng,
            }
        case "MESSAGE":
        return {
            ...state,
            title: action.title,
            contentText: action.content,
        }
        // case "TYPE":
        //     return {
        //         ...state,
        //         type : action.data,
        //     }
        default:
            return state
    }
}

const position = {
    lat: 0,
    lng: 0
};

const posreducer = (state=position, action) => {
    switch (action.type) {
        case "POSITION":
            return{
                ...state,
                lat: action.lat,
                lng: action.lng
            }
        default:
            return state
    }
}

const userinfo = {
    memberId :'',
    kakaoId: '',
    profileUrl: '',
    nickname:''
};

const userreducer = (state=userinfo, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                memberId: action.memberid,
                kakaoId: action.kakaoid,
                profileUrl: action.img,
                nickname: action.nickname
            }
        default:
            return state;
    }
}



const rootReducer = combineReducers({ userreducer, reducer, posreducer });

export default rootReducer;