import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

// component with props passed by redux-form
function renderInput(formProps){
    //destructure props
    const {input, label, meta} = formProps;

    // className logic
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`

    // render
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            {renderError(meta)}
        </div>
    );
}

//component to render error
function renderError(meta) {
    const {error, touched} = meta;
    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
        );
    }
}

/*
    This component uses redux-form to render a form connected to the redux store
*/
function StreamForm (props) {

    //submit handler
    function onSubmit(formValues){
        //preventDefault called by redux-form handleSubmit

        // call callback function
        props.onSubmit(formValues);
    }

    //render
    return (
        <form
            className='ui form error'
            // handleSubmit provided by redux-form; formValues passed as argument
            onSubmit={props.handleSubmit(onSubmit)}
        >
            {/* Each Field represents an attribute of formValues */}
            <Field name='title'component={renderInput} label="Enter title"/>            
            <Field name='description' component={renderInput} label="Enter description"/>
            <button className='ui button primary'>Submit</button>
            <Link to={props.redirect ? props.redirect : "/"}>Cancel</Link>         

        </form>
    );
};

// function to validate form
function validate (formValues) {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

/* wrap component inside Redux Form */
export default reduxForm({
    form: 'streamForm',
    validate // shorthand when key and value are identical
})(StreamForm);
