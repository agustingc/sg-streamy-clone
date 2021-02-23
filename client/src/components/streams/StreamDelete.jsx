import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions';

const StreamDelete = (props) => {

    // get dispatch method
    const dispatch = useDispatch();

    // make api request to get Stream on initial mount
    useEffect(() => {
        dispatch(fetchStream(props.match.params.id));
    }, [dispatch,props.match.params.id]);

    // get Stream data from redux store
    const stream = useSelector (state => state.streams[props.match.params.id])

    // JSX object
    const actions = (
        <>
            <button
                className="ui button negative"
                onClick={() => dispatch(deleteStream(props.match.params.id))}
            >
                Delete
            </button>
            <Link to="/" className="ui button">Cancel</Link>
        </>
    );

    function renderContent() {
        if (!stream) {
            return ("Are you sure you want to delete this stream?")
        }

        return `Are you sure you want to delete this stream with title: ${stream.title}?`;
    }

    return (
        < Modal
            title="Delete Stream"
            content = {renderContent()}
            actions={actions}
            onDismiss={() => history.push('/')}
        />
    );
};

export default StreamDelete;
