import React, {useEffect} from 'react';
// import {connect} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchStreams} from '../../actions';

/* 
    For this component we will use redux's useDispatch()
    and useSelector() created to be used with React Hooks.
*/
function StreamList(props) {
    // useDispatch() is analogous to mapDispatchToProps
    const dispatch = useDispatch();

    // call redux action creator on initial mount
    useEffect( () => {
        dispatch(fetchStreams());
    }, [dispatch]);   //dispatch will not change

    // useSelector() is analogous to mapStateToProps
    // Object.values() converts object into array
    const streams = Object.values(
        useSelector( (state) => state.streams)
    );

    // get `userId` of currently logged user
    const currentUserId = useSelector( (state) => state.auth.userId);

    //helper method to render buttons
    function renderAdmin (stream) {
        if (stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className="ui button primary" to={`streams/delete/${stream.id}`}>
                        Delete
                    </Link>
                </div>
            );
        }
    }

    //another helper method to render buttons
    const isSignedIn = useSelector( (state) => state.auth.isSignedIn);
    function renderCreate() {
        if (isSignedIn){
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    // generate JSX content
    function renderedList () {
        return streams.map ( stream => {
            return (
                <div
                    className="item"
                    key={stream.id}
                >
                {renderAdmin(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    
    // render
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{renderedList()}</div>
            {renderCreate()}
        </div>
    );
};

/* export component */
export default StreamList; 