import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';
import {pick} from 'lodash';

/* component */
function StreamEdit(props) {

    // get dispatch function
    const dispatch = useDispatch();

    // fetch Stream on initial mount
    useEffect( () => {
        dispatch(fetchStream(props.match.params.id)); //`id` coming from Router URL params
    },[dispatch, props.match.params.id,]);

    // retrieve state from redux store (!: replaces mapStateToProps)
    // remember : we used '...mapKeys(action.payload, 'id')' in FETCH_STREAMS reducer
    // so we can use state.streams [index] with expected behavior
    const stream = useSelector( state => state.streams[props.match.params.id]);

    // handles submit
    function onSubmit(formValues) {   
        // dispatch api request
        //`id` param comes from URL /streams/edit/:id
        dispatch(editStream(props.match.params.id, formValues));
    }

    /* rendering */
    //rendered content
    function renderedContent () {
        if (!stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    //`initialValues` is a special keyword for Redux Form
                    // we do not want `id`, `userId` properties to be included in `formValues`
                    initialValues = {pick(stream, 'title','description')}
                    onSubmit={onSubmit}
                    redirect="/"
                />
            </div>
        );
    }

    // render
    return (
        <>
            {renderedContent()}
        </>
    );
};

/* export component */
export default StreamEdit;
