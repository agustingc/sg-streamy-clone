import React, { useEffect, useRef } from 'react';
import flv from 'flv.js'; // serves video to application

import {useDispatch, useSelector} from 'react-redux';
import {fetchStream} from '../../actions';



const StreamShow = (props) => {

    // destructure props
    const {id} = props.match.params;

    // instance variables
    const videoRef = useRef(null);  // ref for <video/> element
    const player = useRef(null);    // ref for flv video player object

    // mapStateToProps
    const stream = useSelector(state => state.streams[id]);

    // mapDispatchToProps equivalent
    const dispatch = useDispatch();

    // fetch stream on initial mount
    useEffect( () => {
        // fetch stream
        dispatch(fetchStream(id));

        //componentWillUnmount
        return ( () => {
            // destroy video player
            player.current.destroy();
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // fetch stream on update
    useEffect( () => {
        // build player
        buildPlayer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stream]);

    // helper function
    function buildPlayer() {
        // if no stream or player already exists, do not load anything
        if (player.current || !stream) {
            console.log('true...')
            return
        }

        // else create flv player
        console.log('loading player...');
        player.current = flv.createPlayer({
            type: 'flv',
            // we will use `id` as STREAM_NAME
            url: `http://localhost:8000/live/${id}.flv`
        });
        // attach media element
        player.current.attachMediaElement(videoRef.current);
        
        // load player
        player.current.load();

    }

    // render helper function
    function renderStream() {
        if (!stream){
            return <div>Loading...</div>
        }

        return (
            <div>
                <video
                    ref={videoRef}
                    style={{width: '100%'}}
                    controls // true
                />
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </div>
        );
    }
    // render
    return renderStream();
};

export default StreamShow;
