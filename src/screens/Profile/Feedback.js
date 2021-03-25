import React from 'react'

import InputField from '../../components/Input/InputField'
import TextArea from '../../components/Input/TextArea'
import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'

//Material-UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import './Profile.css'

const Feedback = ({values, handleOnChange}) => {

    const renderTextArea = (name) => {
        return (
            <TextArea
                name = {name}
                value = {values[name]}
                onChange = { handleOnChange }
                placeholder = "Feedback"
                rows={3}
                max = { 250 }
            />
        )
    }

    const renderInput = (type, name, max, label) => {
        return (
            <InputField 
                type = {type}
                name = {name}
                value = {values[name]}
                onChange = { handleOnChange }
                max = { max }
                placeholder = {label}
            />
        )
    }

    return (
        <div className = "system_feedback_container">
            <p>Provide system feedback</p>
            { renderInput("text", "feedbackName", 30, "Name") }
            { renderInput("email", "feedbackEmail", 320, "Email") }
            { renderTextArea("feedbackMessage") }
            <h5 className = "system_feedback_contain_h5">How was your experince ?</h5>
            <div className = "system_feedback_section_002">
                <span className = "system_feedback__span">How satisfied are you with the overall experience on our website?</span>
                <ReadOnlyRating rate = {values["feedbackRate"]} />
            </div>
            <div className = "system_feedback_section_003">
                <span className = "system_feedback__span">Did you find what you looking for?</span>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="feedbackRadio" name="feedbackRadio" value={values["feedbackRadio"]} onChange={handleOnChange}>
                        <FormControlLabel value="yes" control={<Radio color = "primary"/>} label="Yes" />
                        <FormControlLabel value="no" control={<Radio color = "primary"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default Feedback
