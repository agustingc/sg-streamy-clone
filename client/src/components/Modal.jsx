import React from 'react';
import ReactDOM from 'react-dom';

function Modal (props) {

    // return portal
    // we created a dedicated div with id="modal" inside body of  index.html
    return ReactDOM.createPortal(
        <div
            className="ui dimmer modals visible active"
            onClick={props.onDismiss}
        >
            <div
                className="ui standard modal visible active"
                onClick={(e) => e.stopPropagation()}
            >
                <i
                    className="close icon"
                    onClick={props.onDismiss}
                ></i>
                <div className="header">{props.title}</div>
                <div className="content"> {props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default Modal;