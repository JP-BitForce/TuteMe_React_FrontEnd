import React from 'react'

import Paper from '@material-ui/core/Paper'

import Button from '../../components/Button/CustomButton'
import Countup from '../../components/CountUp/Countup'
import ImageGrid from '../../components/ImageGrid/ImageGrid'
import InfoCard from '../../components/Card/InfoCard'

import headerJson from '../../json/Header.json'
import ContentJson from '../../json/LandingContent.json'

import mock from '../../assets/images/landing page/feature_1.png'
import feature_1 from '../../assets/images/landing page/icons/features-icon-1.png'
import feature_2 from '../../assets/images/landing page/icons/features-icon-2.png'
import feature_3 from '../../assets/images/landing page/icons/features-icon-3.png'
import feature_4 from '../../assets/images/landing page/icons/features-icon-4.png'
import feature_5 from '../../assets/images/landing page/icons/features-icon-5.png'
import feature_6 from '../../assets/images/landing page/icons/features-icon-6.png'
import studentCount from '../../assets/images/landing page/icons/student.png'
import teacherCount from '../../assets/images/landing page/icons/teacher.png'
import courses from '../../assets/images/landing page/icons/cap.png'
import schedules from '../../assets/images/landing page/icons/schedule.png'
import any from '../../assets/images/landing page/any.jpg'
import digital from '../../assets/images/landing page/digital.jpg'
import future from '../../assets/images/landing page/future.jpg'
import './LandingPage.css';

const Content = () => {

    const contentImages = {
        "features-icon-1": feature_1,
        "features-icon-2": feature_2,
        "features-icon-3": feature_3,
        "features-icon-4": feature_4,
        "features-icon-5": feature_5,
        "features-icon-6": feature_6,
        "content-1":"content_paper_right_1",
        "content-2":"content_paper_right_2",
    }

    const counts = [
        {start: 0, end : 524, duration : 3, src : studentCount, title : "Students"},
        {start: 0, end : 88, duration : 3, src : teacherCount, title : "Trusted Tutors"},
        {start: 0, end : 101, duration : 3, src : courses, title : "Courses"},
        {start: 0, end : 375, duration : 3, src : schedules, title : "Schedules"}
    ]

    const detailCard = [
        {src : any, id : "content-1"},
        {src : digital, id : "content-2"},
        {src : future, id : "content-3"},
    ]

    const handleGettingStartRoute = () => {
        window.location.replace('/gettingStarted')
    }

    const renderHeader = (header,des) => {
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
                <img src = {contentImages[src]} alt="icon"/>
                <h4>{header}</h4>
                <p>{para}</p>
            </div>
        )
    }

    const renderMore = (text) => {
        return (
            <div className = "learn_more_container">
                <span className = "learn_more">{text}</span>
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

    const renderfeatureSection = () => {
        return (
            <section className = "container features">
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
            </section>
        )
    }

    return (
        <div className = "landing_content">
            <div className = "landing_content_top">
                <div className = "landing_content_top_left">
                    <span className = "header_content_01">{headerJson.mainContent}</span>
                    <div className = "header_section_btn">
                        <Button label = "GET STARTED" onClick = {handleGettingStartRoute}/>
                    </div>
                </div>
                <div className = "section_count">
                    {
                        counts.map(item => {
                            const {start, end, duration, src, title} = item
                            return (
                                <Countup
                                    start={start}
                                    end={end}
                                    duration={duration}
                                    src={src}
                                    title={title}
                                />
                            )
                        }) 
                    }
                </div>
                <Paper className = "landing_content_bottom" elevation={5}>
                    { renderDetailSection() }

                    <div className = "course_grid_container">
                        { renderHeader("Explore top categoriesn", null) }
                        <ImageGrid/>
                        { renderMore("View More") }
                    </div>

                    { renderfeatureSection() }
                </Paper>
            </div>
        </div>
    )
}

export default Content
