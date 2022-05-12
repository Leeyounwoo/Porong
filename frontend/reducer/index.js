import { ColorPropType } from 'react-native';
import { combineReducers } from "redux";

const MESSAGE = "MESSAGE";
const TIME = "TIME";
const PLACE = "PLACE";
const TYPE = "TYPE";
const PERSON = "PERSON";
const POSITION = "POSITION";

//action - 순수함수로 이뤄져야된다. 일정한 리턴값을 가지는 함수.
export const personContain = (data) => {return{ type: PERSON, data }};
export const timeContain = (data) =>  {return{ type: TIME, data }};
export const placeContain = (data) =>  {return{ type: PLACE, data }};
export const typeContain = (data) =>  {return{ type: TYPE, data }};
export const messageContain = (title, content) => {return{ type: MESSAGE, title, content }};
export const positionContain = (lat, lng) => { return {type: POSITION, lat, lng}};

//store
const init = {
    person: "",
    time: Date.now(),
    place: "",
    title: "",
    context : "",
    type: false,
};


//reducer
function reducer(state=init, action){
    switch(action.type){
        case "PERSON":
            return{
                ...state,
                person: action.data,
            }
        case "TIME":
            return {
                ...state,
                time: action.data,
            }
        case "PLACE":
            return {
                ...state,
                place: action.data,
            }
        case "MESSAGE":
        return {
            ...state,
            title: action.title,
            context: action.context,
        }
        case "TYPE":
            return {
                ...state,
                type : action.data,
            }
        default:
            return state
    }
}

const position = {
    lat: 0,
    lng: 0,
};

function posreducer(state = position, action) {
    if (action.type == POSITION) {
        return {
            ...state,
            lat: action.lat,
            lng: action.lng,
        }
    } else {
        return state;
    }
}


export default combineReducers({reducer,posreducer});