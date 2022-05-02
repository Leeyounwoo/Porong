import { combineReducers } from "redux";

const MESSAGE = "MESSAGE";

export const timeContain = (data) => { type: MESSAGE, data };
export const positionContain = (data) => { type: MESSAGE, data };
export const typeContain = (data) => { type: MESSAGE, data };
export const messageContain = (data) => { type: MESSAGE, data };
const init = {
    time: Date.now(),
    position: "",
    title: "",
    context : "",
    type: false,
};
export const root = (state=init, action) =>{
    switch(action.type){
        case "TIME":
            return {
                ...state,
                time: action.data,
            }
        case "POSITION":
            return {
                ...state,
                position: action.data,
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
