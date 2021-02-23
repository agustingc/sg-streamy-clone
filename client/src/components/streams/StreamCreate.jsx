import React from 'react';
import {useDispatch} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';


/*
    This component uses redux-form to render a form connected to the redux store
*/
function StreamCreate (props) {
    // dispatch
    const dispatch = useDispatch();

    //submit handler
    function onSubmit(formValues){
        //preventDefault called by redux-form handleSubmit

        //call createStream action creator which will perform API request
        dispatch(createStream(formValues));
    }

    //render
    return (
        <div>
            <h3>Create a Stream</h3>
            <StreamForm onSubmit={onSubmit} />
        </div>
    );
};

/* export component */
export default StreamCreate;
