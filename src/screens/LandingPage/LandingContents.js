import React, {useState} from 'react'
import {connect} from 'react-redux'

import Countup from '../../components/CountUp/Countup'
import InfoCard from '../../components/Card/InfoCard'
import FeatureCard from './FeatureCard'
import Slick from '../../components/Slider/Slick'
import SnackBar from '../../components/SnackBar/SnackBar'
import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'
import {subscribe} from '../../api/landing'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'

import './LandingPage.css'
import headerJson from '../../json/Header.json'
import ContentJson from '../../json/LandingContent.json'
import json from '../../json/Home.json'
import studentCount from '../../assets/images/landing page/icons/student.png'
import teacherCount from '../../assets/images/landing page/icons/teacher.png'
import courses from '../../assets/images/landing page/icons/cap.png'
import schedules from '../../assets/images/landing page/icons/schedule.png'
import any from '../../assets/images/landing page/any.jpg'
import digital from '../../assets/images/landing page/digital.jpg'
import future from '../../assets/images/landing page/future.jpg'
import mock from '../../assets/images/landing page/mop.png'

import certificattion from '../../assets/images/Home/certificate.png'
import scholarship from '../../assets/images/Home/scholarship.png'
import certificate_people from '../../assets/images/Home/certificate_people.png'
import creative_lessons from '../../assets/images/Home/creative_lessons.png'
import offer from '../../assets/images/Home/offer.png'
import regular_lessons from '../../assets/images/Home/regular_lessons.png'
import courses_plus from '../../assets/images/Home/courses_plus.png'
import consult from '../../assets/images/Home/consult.png'
import global from '../../assets/images/Home/global.png'
import search from '../../assets/images/Home/search.png'
import payment from '../../assets/images/Home/payment.png'
import avatar from '../../assets/images/shared/avatar.png'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      border: 0,
      borderRadius: 3,
      height: 60,
      padding: '20px 30px',
      color: "white",
      backgroundColor: "#2E86C1"
    },
}));

const LandingContents = ({history, auth, countsData, feedbacks}) => {
    const styles = useStyles()
    const [snackBarOpen, setSnackBar] = useState({
        open: false,
        message: "",
        severity: "warning"
    })
    const [email, setEmail] = useState("")
    const [subLoading, setSubLoading] = useState(false)

    const counts = [
        {start: 0, end : countsData && countsData.students, duration : 8, src : studentCount, title : "Students"},
        {start: 0, end : countsData && countsData.tutors, duration : 8, src : teacherCount, title : "Trusted Tutors"},
        {start: 0, end : countsData && countsData.courses, duration : 8, src : courses, title : "Courses"},
        {start: 0, end : countsData && countsData.schedules, duration : 8, src : schedules, title : "Schedules"}
    ]

    const detailCard = [
        {src : any, id : "content-1"},
        {src : digital, id : "content-2"},
        {src : future, id : "content-3"},
    ]

    const features = {
        "Certifications": certificattion,
        "Offers & Discounts": offer,
        "Scholarship Facility": scholarship,
        "Creative Lessons": creative_lessons,
        "Regular Classes": regular_lessons,
        "Certified Teachers": certificate_people
    }

    const contentImages = {
        "features-icon-1": regular_lessons,
        "features-icon-2": global,
        "features-icon-3": courses_plus,
        "features-icon-4": consult,
        "features-icon-5": search,
        "features-icon-6": payment,
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setSubLoading(true)
        subscribe(email).then(response => {
            setSnackBar({
                open: true,
                message: response.message,
                severity: "success",
            })
            setEmail("")
            setSubLoading(false)
        }).catch(err => {
            setSnackBar({
                open: true,
                message: err.message,
                severity: "error"
            })
            setEmail("")
            setSubLoading(false)
        })
    }

    const handleGettingStartRoute = () => {
        if (auth) {
            history.push('/gettingStarted')
        } else {
            setSnackBar({
                open: true,
                message: "Oops! you need to login first..",
                severity: "warning"
            })
        }
    }

    const handleSnackBarClose = () => {
        setSnackBar(false)
    }

    const handleInputOnChange = (event) => {
        setEmail(event.target.value)
    }

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const renderStudentCard = (item) => {
        const {feedback, rating, userName, userType, imageUrl} = item
        return (
            <div className = "student_feedback_card">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}/>
                    <Grid item xs={12} sm={12} md={2}>
                        <img src = {imageUrl ? getImageSource(imageUrl) : avatar} alt = "user_image" className = "feedback_user_image"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className = "feedback_text_block">
                            <p>
                                {feedback}
                                <ReadOnlyRating rate = {rating}/>
                            </p>
                            <span>{userName}</span>
                            <p>Level: {userType}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1}/>
                </Grid>
            </div>
        )
    }

    const renderHeader = (header, des) => {
        return (
            <div className = "col-md-12 features-title">
                <h1>{header}</h1>
                <p className = "title-description"> { des } </p>
            </div>
        )
    }

    const renderfeatureListItem = (src, header, para) => {
        return (
            <div className = "features-list">
                <img src = {contentImages[src]} alt="icon" style = {{width: "50px"}}/>
                <h4>{header}</h4>
                <p>{para}</p>
            </div>
        )
    }

    const renderTopContent = () => {
        return (
            <div className = "content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4">{headerJson.mainContent}</h1>
                            <p class="mb-4">{headerJson.context}</p>
                            <p>
                                <Button size="large" className = {styles.margin} onClick = {handleGettingStartRoute}>
                                    Get Started Now!
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderSectionCount = () => {
        return (
            <div className = "section_count">
                <Grid container>
                {
                    counts.map(item => {
                        const {start, end, duration, src, title} = item
                        return (
                            <Grid item xs={6} sm={6} md={3}>
                                <Countup
                                    start={start}
                                    end={end}
                                    duration={duration}
                                    src={src}
                                    title={title}
                                />
                            </Grid>
                        )
                    }) 
                }
                </Grid>
            </div>
        )
    }

    const renderDetailSection = () => {
        return (
            <section className = "details">
                { renderHeader("WHAT WE HAVE", headerJson.subContent02) }
                <div className = "detail_cards">
                {
                    detailCard.map(item => {
                        const {src, id} = item
                        return (
                            <div className = "details_card">
                            <InfoCard
                                media = {src}
                                title = {ContentJson.headers[id]}
                                des = {ContentJson.description[id]}
                            />
                            </div>
                        )
                    })
                }
                </div>
            </section>
        )
    }

    const renderSectionOffers = () => {
        return (
            <div className = "landing_content_section_features">
            <Container maxWidth="lg">
                <div className = "section_2_info_container">
                    <h1>{json.main_section_2.header}</h1>
                    <span className="textSecondary">{json.main_section_2.subHeader}</span>
                    <div className = "features_cards_container">
                        <Grid container spacing={5}>
                            {
                                json.main_section_2.contents.map(item => {
                                    const {title, description} = item
                                    return <FeatureCard 
                                        src = {features[title]}
                                        title = {title}
                                        description = {description}
                                    />
                                })
                            }
                        </Grid>
                    </div>
                </div>
            </Container>
            </div>
        )
    }

    const renderSectionFeature = () => {
        return (
            <div className = "landing_section_features__1">
               { renderHeader("AMAZING FEATURES", headerJson.context) }
                <div className = "row">
                    <div className = "col-md-3 col-sm-4 features-left">
                        {
                            ContentJson.features_left.map(item => {
                                const { src, header, para} = item
                                return (
                                    renderfeatureListItem(src, header, para)
                                )
                            })
                        }
                    </div>

                    <div className = "col-md-5 col-sm-5 appmockup">
                        <img className = "phone-mockup" src = {mock} alt="phone mockup"/>
                    </div>

                    <div className = "col-md-4 col-sm-4 features-right">
                        {
                            ContentJson.features_right.map(item => {
                                const { src, header, para} = item
                                return (
                                    renderfeatureListItem(src, header, para)
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    const renderSectionStudentFeed = () => {
        return (
            <div className = "student_feedback_root">
                <div className = "student_feedback__top">
                    <div className = "student_feedback__top_block">
                        <h1>Users says about us</h1>
                        <p> Both students and tutors provide their custom feedback about our website & services </p>
                    </div>
                    <div className = "student_fedback_slider">
                        <Slick>
                            {
                                feedbacks && feedbacks.data.map(item => {
                                    return renderStudentCard(item)
                                })
                            }
                        </Slick>
                    </div>
                </div>
            </div>
        )
    }

    const renderSectionSubsribe = () => {
        return (
            <div className = "landing_subscribe_newsletter">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={1}/>
                    <Grid item xs={12} sm={12} md={5}>
                        <div className = "newsletter_text">
                            <h3>Subcribe to our Newsletter</h3>
                            <p>{json.main_section_5.newsletter_text}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <form className = "newsletter_form" onSubmit = {handleSubmit}>
                            <input type = "email" placeholder = "Email address" onChange = {handleInputOnChange} value = {email}/>
                            <button type = "submit">
                                { subLoading ? <CircularProgress/> : "Subscribe Now"}
                            </button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1}/>
                </Grid>
            </div>
        )
    }

    const renderMainContents = () => {
        return (
            <div className = "landing_content__main_conatiner">
                { renderDetailSection() }
                { renderSectionCount() }
                { renderSectionFeature() }
                { renderSectionStudentFeed() }
                { renderSectionOffers() }
                { renderSectionSubsribe() }
            </div>
        )
    }

    return (
        <div className = "landing__content__root">
            { renderTopContent() }
            { renderMainContents() }
            <SnackBar
                open = {snackBarOpen.open}
                autoHideDuration = {4000}
                handleClose = {handleSnackBarClose}
                message = {snackBarOpen.message}
                severity = {snackBarOpen.severity}
                align = {{ vertical: 'bottom', horizontal: 'left' }}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(LandingContents)
