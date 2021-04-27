import React from 'react'

import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'

//Material-UI
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import src from '../../assets/images/Course/unity.jpg'

const useStyles = makeStyles((theme) => ({
    media: {
      height: '35vh',
    },
    list: {
        display: "flex",
        flexDirection: "column"
    },
    payments_methods: {
        display: "flex",
        flexDirection: "column"
    },
    chip: {
        marginTop: "5px",
        marginRight: "5px",
        height: "25px",
        cursor: "pointer"
    },
    chipSelectd: {
        marginTop: "5px",
        marginRight: "5px",
        height: "25px",
        cursor: "pointer",
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        color: "white"
    },
    content: {
        paddingLeft: "10px"
    }
}))


const CourseDetails = ({course, handlePaymentTypeOnSelect, subscription}) => {
    const styles = useStyles()
    const { name, rating, price, description, tutorName, duration, id, imgUrl } = course
    const dummySchedule = [
        {id: 1, day: "Monday", startTime: "3:00 pm", endTime: "5:00 pm"},
        {id: 2, day: "Thursday", startTime: "5:30 pm", endTime: "7:30 pm"},
    ]

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary"> {content} : </span>
                <span className = "modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    const renderSchedules = (values) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary">Schedules</span>
                <div className = {styles.list}>
                    {
                        values.map(item => {
                            const {id, day, startTime, endTime} = item
                            return (
                                <span className = "modal_item_secondary" key = {id}>
                                    {`${day} =: ${startTime} - ${endTime}`}
                                </span>
                            )
                        })
                    }
                </div>
            </DialogContentText>
        )
    }

    const renderPaymentMethods = () => {
        return (
            <div className = {styles.payments_methods}>
                <span>Payment Types Available, please select one </span>
                <div>
                    {
                        ["Premium", "Monthly"].map(item => {
                            return (
                                <Chip
                                    label = {item}
                                    color = "secondary"
                                    variant = "outlined"
                                    className = {subscription === item ? styles.chipSelectd : styles.chip}
                                    onClick = {() => handlePaymentTypeOnSelect(item)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6}>
                <Card>
                    <CardMedia
                        className={styles.media}
                        image = { imgUrl ?  getImageSource(imgUrl) : src}
                        title = "Paella dish"
                    />
                    <CardContent>
                        { renderSchedules(dummySchedule)}
                        { renderPaymentMethods() }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className = {styles.content}>
                { renderDetail("ID", `C${id}`) }
                { renderDetail("Name", name) }
                { renderDetail("Tutor", tutorName) }
                { renderDetail("Duration", duration) }
                { renderDetail("Price", `Rs. ${price}`) }
                { renderDetail("Description", description) }
                { renderDetail("Rate", <ReadOnlyRating rate = {rating}/>) }
            </Grid>
        </Grid>
    )
}

export default CourseDetails
