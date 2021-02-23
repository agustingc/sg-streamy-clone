import React, {useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


function GoogleAuth (props) {

    //destructure props
    const {isSignedIn} = props;

    //define instance variable
    const auth = useRef(null);
    
    // load Google API when component mounts
    // https://console.developers.google.com
    useEffect ( () => {
        //`gapi` is loaded by <script> tag in index.html
        window.gapi.load('client:auth2', () => {
            //callback function
            window.gapi.client.init ({
                    clientId: '714163574232-77i82a3an35fvetn2shs4kfj55r19ubm.apps.googleusercontent.com',
                    scope: 'email'
            }).then ( () => {
                //create auth object
                auth.current = window.gapi.auth2.getAuthInstance();
                //call authorization handler to update state
                handleAuthChange(auth.current.isSignedIn.get());
                //set up listener
                auth.current.isSignedIn.listen(handleAuthChange);
            });
        });

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //runs every time listener is triggered
    // @param bool passed by `listen` method
    function handleAuthChange(signedInStatus) {
        //call action creators
        if (signedInStatus) {
            //pass userId as argument
            props.signIn(auth.current.currentUser.get().getId());
        } else {
            props.signOut();
        }
    }

    //helper function
    function handleButtonClick(){
        //sign out or in
        if (isSignedIn) {
            auth.current.signOut();
        } else {
            auth.current.signIn();
        }
        // no need to update state because we already set up a listener
    }

    //prepare rendered button
    function renderAuthButton(){
        if (isSignedIn === null) {
            return null;
        } else {
            return  (
                <button
                    className="ui red google button"
                    onClick={handleButtonClick}
                >
                    <i className="google icon"></i>
                    {isSignedIn ? 'Sign Out' : 'Sign in with Google'}
                </button>
            );
        }
    }

    //render
    return renderAuthButton();
}

/* map redux state to component props */
function mapStateToProps (state) {
    return { isSignedIn: state.auth.isSignedIn };
}

/* export component `connected` to redux store */
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);