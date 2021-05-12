import React, {useEffect, useState} from 'react'

import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'

//Material-UI
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import {getCoursesForLandingPage} from "../../api/landingPage";
import src from '../../assets/images/Course/alt.jpg'
import AppBar from "../../components/AppBar/AppBar";

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

const PublicCourses = () => {
    const styles = useStyles()

    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState();
    const [current, setCurrent] = useState();
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState();


    const getCoursesForLandingPageApi = (page) => {
        setLoading(true);
        getCoursesForLandingPage(page).then(response => {
            setCourses(response.data);
            setTotal(response.total);
            setCurrent(response.current + 1);
            setFetchError(null)
        }).catch(err => {
            setLoading(false)
            setFetchError(err.message)
        })
    }

    useEffect(() => {
        getCoursesForLandingPageApi(0);
    }, [])

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className="modal_item_primary"> {content} : </span>
                <span className="modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    return (
        <>
            <AppBar/>
            <div className="coursePublic">
                {courses.map(course => {
                    const {name, rating, price, description, tutorName, duration, imageUrl} = course
                    return (
                        <Grid item xs={12} sm={12} md={6}>
                            <Card className="coursePublicCard">
                                <CardMedia
                                    className={styles.media}
                                    image={imageUrl ? getImageSource(imageUrl) : src}
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Grid item xs={12} sm={12} md={6} className={styles.content}>
                                        {renderDetail("Name", name)}
                                        {renderDetail("Tutor", tutorName)}
                                        {renderDetail("Duration", duration)}
                                        {renderDetail("Price", `Rs. ${price}`)}
                                        {renderDetail("Description", description)}
                                        {renderDetail("Rate", <ReadOnlyRating rate={rating}/>)}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </div>
        </>
    )
}
export default PublicCourses;
