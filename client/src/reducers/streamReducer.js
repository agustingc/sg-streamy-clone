import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';

import {mapKeys} from 'lodash';


/* reducer*/
export default function streamReducer (state = {}, action) {
    switch(action.type) {
        case CREATE_STREAM :
        case FETCH_STREAM :
        case EDIT_STREAM :
            return {...state, [action.payload.id] : action.payload}
        case FETCH_STREAMS :
            return {...state, ...mapKeys(action.payload, 'id')}
        case DELETE_STREAM :
            const newState = {...state};
            delete newState[action.payload] //id
            return newState;
        default:
            return state;
    }
}
