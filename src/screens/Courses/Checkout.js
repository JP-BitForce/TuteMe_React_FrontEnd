import React from 'react'

import Stepper from '../../components/Stepper/StepperComponent'
import CourseDetails from './CourseDetails'
import PaymentMethods from './PaymentMethods'
import PaymentSummary from '../../components/PaymentSummary/PaymentSummary'

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

const useStyles = makeStyles((theme) => ({
    btn: {
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        color: "white"
    },
}))

const Checkout = ({
    open, 
    course, 
    values, 
    handleInputOnChange, 
    handleFileOnChange, 
    handleDateOnchange, 
    handleNext,
    handlePrev
}) => {
    const styles = useStyles()
    const steps = ["Course Details", "Payment Details", "Review & Pay"]

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            keepMounted
            aria-labelledby = "alert-dialog-slide-title"
            aria-describedby = "alert-dialog-slide-description"
            fullWidth
            maxWidth="sm"
        >
        <Stepper steps = {steps} activeStep = {values["step"]}/>
        <DialogContent>
            {
                values["step"] === 1 ? <CourseDetails course = {course}/> :
                values["step"] === 2 ? 
                <PaymentMethods 
                    values = {values}
                    handleSubmit = {handleNext}
                    handleInputOnChange = {handleInputOnChange}
                    handleFileOnChange = {handleFileOnChange}
                    handleDateOnchange = {handleDateOnchange}
                /> 
                :
                <PaymentSummary
                    values = {values}
                />
            }
        </DialogContent>
        <DialogActions>
            { values["emptyError"] && <span className = "error">{values["emptyError"]}</span>}
            <Button onClick = {handlePrev} color="primary"> {values["step"] === 1 ? "Close" : "Previous"} </Button>
            <Button onClick = {handleNext} className = {styles.btn} disabled = {values["step"] === 3}>Next</Button>
        </DialogActions>
        </Dialog>
    )
}

export default Checkout
