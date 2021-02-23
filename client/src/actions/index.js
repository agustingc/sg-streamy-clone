
import streams from '../apis/streams'; //axios instance
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';  //import types to prevent typos




/* action creator */
export function signIn (userId) {
    return {
        type: SIGN_IN,
        payload: userId
    }
}


 /* action creator */
 export function signOut () {
     return {
         type: SIGN_OUT
     }
 }


/*
    -----------------------------------
    Action creators for our RESTful API
    -----------------------------------
*/

/* action creator for creating a stream */
export function createStream (formValues) {
    // returns a redux-thunk function instead of an object
    return async (dispatch, getState) => {
        //userId comes from authReducer
        const {userId} = getState().auth;

        // make api request to create stream including formValues and userId
        const response = await streams.post('/streams', {...formValues, userId});

        // dispatch action to redux store
        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });

        // programmatically navigate user to homepage
        history.push('/');
    }
}

/* action creator to fetch the list of all streams */
export function fetchStreams () {
    // returns a redux-thunk function
    return async (dispatch) => {
        const response = await streams.get('/streams');

        // dispatch action to redux store
        dispatch({
            type: FETCH_STREAMS,
            payload: response.data
        });
    }
}


/* action creator to fetch a specific stream */
export function fetchStream (id) {
    // returns a redux-thunk function
    return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);

        // dispatch action to redux store
        dispatch({
            type: FETCH_STREAM,
            payload: response.data
        });
    }
}

/* action creator to edit a specific stream */
export function editStream (id, formValues) {
    // returns a redux-thunk function
    return async (dispatch, getState) => {
        // make PATCH request to api
        const response = await streams.patch(`/streams/${id}`, formValues);

        // dispatch action to redux store
        dispatch({
            type: EDIT_STREAM,
            payload: response.data
        });

        // programmatically navigate user to homepage
        history.push('/');
    }
}

/* action creator to delete a specific stream */
export function deleteStream (id) {
    // returns a redux-thunk function
    return async (dispatch) => {
        //we do not need to store the response for this use case
        await streams.delete(`/streams/${id}`);

        // dispatch action to redux store
        dispatch({
            type: DELETE_STREAM,
            payload: id
        });

        // programmatically navigate user to homepage
        history.push('/');
    }
}

