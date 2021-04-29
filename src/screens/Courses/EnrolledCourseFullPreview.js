import React, {useState} from 'react'
import moment from 'moment';

import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'

//React-Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import src from '../../assets/images/shared/video-optimization.png'
import fileSrc from '../../assets/images/shared/file.png'
import videoSrc from '../../assets/images/shared/video.png'
import linkSrc from '../../assets/images/shared/link.png'
import './Courses.css'

const useStyles = makeStyles({
    appBar: {
        backgroundColor: 'rgba(255, 255, 255, .15)', 
        backdropFilter: 'blur(4px)',
        color: "black",
    },
    container: {
        marginTop: "70px",
        backgroundColor: "rgb(236, 236, 236)",
    },
    subTitle: {
        color: "#808080",
        flex: 1,
    },
    topSrc: props => ({
        width: "100%",
        minHeight: "40vh",
        backgroundImage: `url(${props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }),
    topDetails: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        textTransform: "uppercase"
    },
    mainRoot: {
        marginTop: "20px",
        padding: "15px"
    },
    paper: {
        padding: "10px",
        minHeight: "40vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    resourceAvatar: {
        width: "25px",
        height: '25px',
        marginRight: "5px"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EnrolledCourseFullPreview = ({open, handleClose, course, handleJoin, handleInputOnChange, values}) => {
    const {title, courseImg, description, rating, duration, enrolledAt, tutorName, id} = course
    const {joinIdValueError, joinId, joinLoading} = values
    const classes = useStyles({ img: `data:image/jpeg;base64,${courseImg}` })

    const dummySchedule = [
        {id: 1, day: "Monday", startTime: "3:00 pm", endTime: "5:00 pm"},
        {id: 2, day: "Thursday", startTime: "5:30 pm", endTime: "7:30 pm"},
    ]

    const dummyResources = [
        {id: 1, title: "Introduction", uploaded: " 29/04/2021, 20:47", type: "file"},
        {id: 2, title: "Environment Setup", uploaded: " 29/04/2021, 21:00", type: "video"},
        {id: 3, title: "https://material-ui.com/components/lists/", uploaded: " 29/04/2021, 21:00", type: "link"}
    ]

    const dummyEvents = []

    const filters = ["Home", "Resources", "Upcoming Events"]

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [nav, setNav] = useState(0)
    const [daySelected, setDaySelected] = useState(dummySchedule[0])

    const getActive = (day) => {
        let active = false
        dummySchedule.filter(item => {
            if(item.day === day) {
                active = true
                return 1
            }
            return 0
        })
        return active
    }

    const getScheduleItem = (day) => {
        return dummySchedule.filter(item => {
            if(item.day === day) {
                return item
            }
            return null
        })[0]
    }

    const getListItemSubDetail = (type, uploaded) => {
        if (type === "file") {
            return `file document, uploaded at: ${uploaded}`
        }
        if(type === "video") {
            return `video source, uploaded at: ${uploaded}`
        } 
        if(type === "link") {
            return `reference link, uploaded at: ${uploaded}`
        }
    }

    const getListItemSrc = (type) => {
        if (type === "file") {
            return fileSrc
        }
        if(type === "video") {
            return videoSrc
        } 
        if(type === "link") {
            return linkSrc
        }
    }

    const renderInputField = () => {
        return (
            <div className = "courses_list_head">
                <TextField
                    id="standard-basic" 
                    onChange = {handleInputOnChange} 
                    variant = "outlined"
                    error = {joinIdValueError}
                    value = {joinId}
                    helperText = {joinIdValueError && "Incorrect entry"}
                    name = "joinId"
                    size = "small"
                    placeholder = "enter join id here.."
                    fullWidth
                />
                <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit" onClick = {handleJoin}>Join</Button>
            </div>
        )
    }

    const renderHome = () => {
        return (
            <div className = "en_course_prev_main_content">
                <h5>Schedule</h5>
                <div className = "en_course_prev_main_content_cal">
                    {
                        days.map(item => {
                            if(getActive(item)) {
                                return (
                                    <div className = "day_root_active" onClick = {() => setDaySelected(getScheduleItem(item))}>
                                        <span>{item.slice(0,3)}</span>
                                    </div>
                                ) 
                            } else {
                                return (
                                    <div className = "day_root">
                                        <span>{item.slice(0,3)}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className = "en_course_prev_main_content_day">
                    <Typography variant="h6"><span>{daySelected.day}</span></Typography>
                    <div className = "en_course_prev_main_content_cal_item">
                        <span>Starts: {daySelected.startTime}</span>
                        <span>Ends: {daySelected.endTime}</span>
                    </div>
                </div>
                <Divider/>
                <div className = "en_course_prev_main_content_vid">
                    <h5>Join your lesson here</h5>
                    { renderInputField() }
                    <Paper elevation = {3} className = {classes.paper}>
                        {
                            joinLoading ? <CircularProgress/> : 
                            <img src = {src} alt = "" className = "alt_img_src"/>
                        }
                    </Paper>
                </div>
            </div>
        )
    }

    const renderResources = () => {
        return (
            <div className = "en_course_prev_main_content">
                <h4>Course Resources</h4>
                <List>
                    {
                        dummyResources.map(item => {
                            const {title, type, uploaded} = item
                            return (
                                <>
                                <ListItem>
                                    <Avatar 
                                        className = {classes.resourceAvatar} 
                                        src = { getListItemSrc(type) }
                                    />
                                    <ListItemText primary = {title} secondary = {getListItemSubDetail(type, uploaded)} />
                                </ListItem>
                                <Divider/>
                                </>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    const renderEvents = () => {
        return (
            <div className = "en_course_prev_main_content">
                <h4>Upcoming Events</h4>
                {
                    dummyEvents.length === 0 ? 
                    <div className = "no_up_events_root">
                        <span>No upcoming events right now</span>
                        <p>will be coming soon...</p>
                    </div>
                    :
                    <List></List>
                }
            </div>
        )
    }

    const renderNavs = () => {
        return (
            <div>
                {
                    filters.map((item, idx) => {
                        return (
                            <div 
                                className = { 
                                    nav === idx ? [
                                        "en_course_prev_card", "en_course_prev_card_active"
                                        ].join(" ") 
                                    : "en_course_prev_card"
                                } 
                                onClick = {() => setNav(idx)}
                                key = {idx}
                            >{item}</div>
                        )
                    })
                }
            </div>
        )
    }

    const renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary"> {content} : </span>
                <span className = "modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    const renderMainContainer = () => {
        return (
            <Grid container className = {classes.mainRoot}>
                <Grid item xs={12} sm={6} md={3}>
                    { renderNavs() }
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    <div className = "en_course_prev_main_root">
                        <div className = "en_course_prev_main">
                            {
                                nav === 0 ? renderHome() 
                                :
                                nav === 1 ? renderResources()
                                :
                                renderEvents()
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderTop = () => {
        return (
            <Card>
                <Card.Body>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={7} className = {classes.topSrc}/>
                        <Grid item xs={12} sm={6} md={5}>
                            <div className = {classes.topDetails}>
                                <h3>{title}</h3>
                                <div className = "en_course_prev_poster_detail">
                                    { renderDetail("Id", id) }
                                    { renderDetail("Tutor", tutorName) }
                                    { renderDetail("duration", duration) }
                                    { renderDetail("Enrolled Date", moment(enrolledAt).format("YYYY-MM-DD")) }
                                    { renderDetail("Rating", <ReadOnlyRating rate = {rating}/>) }
                                    { renderDetail("Description", description) }
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Dialog 
            fullScreen open={open} 
            onClose={handleClose} 
            TransitionComponent={Transition} 
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <ArrowBackIos />
                    </IconButton>
                    <Typography variant="h6"><span className = {classes.subTitle}>GO BACK</span></Typography>
                </Toolbar>
            </AppBar>

            <div className = {classes.container}>
                { renderTop() }
                { renderMainContainer() }
            </div>
        </Dialog>
    )
}

export default EnrolledCourseFullPreview
