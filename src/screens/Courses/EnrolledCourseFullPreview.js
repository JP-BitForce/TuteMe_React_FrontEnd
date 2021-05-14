import React, {useState} from 'react'
import moment from 'moment';

import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'
import OnlineLessonAlt from '../../components/OnlineLesson/OnlineLessonAlt'

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
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

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

const EnrolledCourseFullPreview = ({open, handleClose, course, handleJoin, values, handleInputOnChange}) => {
    const {title, courseImg, description, rating, duration, enrolledAt, tutorName, id, schedules, resources} = course
    const classes = useStyles({ img: `data:image/jpeg;base64,${courseImg}` })

    const filters = ["Home", "Resources", "Upcoming Events"]

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [nav, setNav] = useState(0)
    const [daySelected, setDaySelected] = useState(schedules[0])

    const getActive = (day) => {
        let active = false
        schedules.filter(item => {
            if(item.day === day) {
                active = true
                return 1
            }
            return 0
        })
        return active
    }

    const getScheduleItem = (day) => {
        return schedules.filter(item => {
            if(item.day === day) {
                return item
            }
            return null
        })[0]
    }

    const format = (date) => {
        return moment(date).format("YYYY-MM-DD hh:mm a")
    }

    const getListItemSubDetail = (type, uploaded) => {
        if (type === "file") {
            return `file document, uploaded at: ${format(uploaded)}`
        }
        if(type === "video") {
            return `video source, uploaded at: ${format(uploaded)}`
        } 
        if(type === "link") {
            return `reference link, uploaded at: ${format(uploaded)}`
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

    const renderHome = () => {
        return (
            <div className = "en_course_prev_main_content">
                <h5>Schedule</h5>
                <Grid container spacing={4}>
                    {
                        days.map(item => {
                            if(getActive(item)) {
                                return (
                                    <Grid item xs={4} sm={6} md={1}>
                                        <div className = "day_root_active" onClick = {() => setDaySelected(getScheduleItem(item))}>
                                            <span>{item.slice(0,3)}</span>
                                        </div>
                                    </Grid>
                                ) 
                            } else {
                                return (
                                    <Grid item xs={4} sm={6} md={1}>
                                        <div className = "day_root">
                                            <span>{item.slice(0,3)}</span>
                                        </div>
                                    </Grid>
                                )
                            }
                        })
                    }
                </Grid>
                <div className = "en_course_prev_main_content_day">
                    <Typography variant="h4"><span>{daySelected && daySelected.day}</span></Typography>
                    <div className = "en_course_prev_main_content_cal_item">
                        <span>Starts: {daySelected && daySelected.startTime}</span>
                        <span>Ends: {daySelected && daySelected.endTime}</span>
                    </div>
                </div>
                <Divider/>
                <div className = "en_course_prev_main_content_vid">
                    <Paper elevation = {3} className = {classes.paper}>
                        {
                            values["joinLoading"] ? <CircularProgress/> 
                            : 
                            <OnlineLessonAlt
                                handleInputOnChange = {handleInputOnChange}
                                joinId = {values["joinId"]}
                                handleJoin = {handleJoin}
                            />
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
                {
                    resources.length === 0 ? 
                    <div className = "no_up_events_root">
                        <span>No resources right now</span>
                        <p>will be coming soon...</p>
                    </div>
                    :
                    <List>
                        {
                            resources.map(item => {
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
                }
            </div>
        )
    }

    const renderEvents = () => {
        return (
            <div className = "en_course_prev_main_content">
                <h4>Upcoming Events</h4>
                <div className = "no_up_events_root">
                    <span>No upcoming events right now</span>
                    <p>will be coming soon...</p>
                </div>
            </div>
        )
    }

    const renderNavs = () => {
        return (
            <div className = "en_course_breadcrumb_div">
            <Breadcrumbs aria-label="breadcrumb">
                {
                    filters.map((item, idx) => {
                        return <span 
                            onClick = {() => setNav(idx)} 
                            key = {idx}
                            className = {
                                nav === idx ? ["en_course_breadcrumb_span", "en_course_breadcrumb_span_acive"].join(" ") 
                                : "en_course_breadcrumb_span"
                            }
                        >
                        {item}
                        </span>
                    })
                }
            </Breadcrumbs>
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
                <Grid item xs={12} sm={6} md={12}>
                    { renderNavs() }
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
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
