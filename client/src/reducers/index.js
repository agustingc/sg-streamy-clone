import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import streamReducer from './streamReducer';




/* export combined reducers used to create store */
export default combineReducers ({
    //state -> name of each reducer
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});
