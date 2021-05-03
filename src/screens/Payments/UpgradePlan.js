import React from 'react'

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})
  
const useStyles = makeStyles((theme) => ({
    btn: {
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        color: "white"
    },
    title: {
        textTransform: "uppercase",
    },
    chip: {
        marginTop: "5px",
        marginRight: "5px",
        cursor: "pointer"
    },
    chipSelectd: {
        marginTop: "5px",
        marginRight: "5px",
        cursor: "pointer",
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        color: "white"
    },
    planItem: {
        marginTop: "15px"
    }
}))

const UpgradePlan = ({
    open, 
    handleCancel, 
    handleUpgrade, 
    subscription, 
    handlePlanOnChange, 
    subscriptionEmptyError,
    upgradeSubscriptionLoading
}) => {
    const styles = useStyles()
    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            keepMounted
            aria-labelledby = "alert-dialog-slide-title"
            aria-describedby = "alert-dialog-slide-description"
            fullWidth
            maxWidth = "sm"
        >
        <DialogTitle id="alert-dialog-title" className = {styles.title}>Select & Upgrade your payment plan</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Premium <p>Premium is about that user can pay total amount at once.</p>
                <Chip
                    label = "Premium"
                    color = "secondary"
                    variant = "outlined"
                    className = {subscription === "Premium" ? styles.chipSelectd : styles.chip}
                    onClick = {() => handlePlanOnChange("Premium")}
                />
            </DialogContentText>
            <Divider/>
            <DialogContentText id="alert-dialog-description" className = {styles.planItem}>
                Monthly <p>Monthly payment is about that user can pay amount at monthly. monthly amount varies from amount to amount</p>
                <Chip
                    label = "Monthly"
                    color = "secondary"
                    variant = "outlined"
                    className = {subscription === "Monthly" ? styles.chipSelectd : styles.chip}
                    onClick = {() => handlePlanOnChange("Monthly")}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            { subscriptionEmptyError && <span className = "error">{subscriptionEmptyError}</span> }
            <Button onClick = {handleCancel} color="primary"> Cancel </Button>
            <Button onClick = {handleUpgrade} className = {styles.btn}>
                {
                    upgradeSubscriptionLoading ? <CircularProgress style = {{width: "20px", height: "20px"}}/> : "Upgrade"
                }
            </Button>
        </DialogActions>
        </Dialog>
    )
}

export default UpgradePlan
