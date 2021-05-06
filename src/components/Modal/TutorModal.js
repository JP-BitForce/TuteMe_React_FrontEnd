import React from 'react'

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import './Modal.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "10px",
        alignItems: "center"
    },

    media: {
      height: '35vh',
    },

    list: {
        display: "flex",
        flexDirection: "column"
    }
}));

const TutorModal = ({open, handleClose, selectedTutor}) => {
    const classes = useStyles();
    const {
        id, 
        firstName, 
        lastName, 
        description, 
        rating, 
        email, 
        district, 
        city, 
        src, 
        facebook, 
        twitter, 
        instagram, 
        linkedIn, 
        subject,
        subjectId
    } = selectedTutor

    const renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary"> {content} : </span>
                <span className = "modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    const renderLink = (content, link) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_link_primary"> {content} : </span>
                <a href = {link} className = "modal_link_secondary">{link}</a> 
            </DialogContentText>
        )
    }

    const getLocation = () => {
        if (city && district) {
            return `${city}, ${district}`
        }
        else if (!city && !district) {
            return "Unknown"
        }
        else {
            if(!city) return district
            else return city
        }
    }

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">TUTOR DETAILS</DialogTitle>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} className={classes.root}>
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image = {getImageSource(src)}
                            title = {firstName}
                        />
                        <CardContent>
                            { renderLink("Facebook", facebook) }
                            { renderLink("Twitter", twitter) }
                            { renderLink("LinkedIn", linkedIn) }
                            { renderLink("Instagram", instagram) }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <DialogContent>
                        { renderDetail("ID", `T0${id}`) }
                        { renderDetail("Name", `${firstName} ${lastName}`) }
                        { renderDetail("Email", email) }
                        { renderDetail("About", description) }
                        { renderDetail("Subject", subject) }
                        { renderDetail("Subject ID", subjectId) }
                        { renderDetail("Location", getLocation()) }
                        { renderDetail("Rate", <ReadOnlyRating rate = {rating}/>) }
                    </DialogContent>
                </Grid>
            </Grid>

            <DialogActions>
                <Button onClick={handleClose} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TutorModal
