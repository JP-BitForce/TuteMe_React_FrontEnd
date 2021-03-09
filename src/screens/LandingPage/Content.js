import React from 'react'

import Paper from '@material-ui/core/Paper'

import Button from '../../components/Button/CustomButton'
import AnimatedButton from '../../components/Button/AnimatedButton'

import headerJson from '../../json/Header.json'
import ContentJson from '../../json/LandingContent.json'

import mock from '../../assets/images/landing page/feature_1.png'
import feature_1 from '../../assets/images/landing page/icons/features-icon-1.png'
import feature_2 from '../../assets/images/landing page/icons/features-icon-2.png'
import feature_3 from '../../assets/images/landing page/icons/features-icon-3.png'
import feature_4 from '../../assets/images/landing page/icons/features-icon-4.png'
import feature_5 from '../../assets/images/landing page/icons/features-icon-5.png'
import feature_6 from '../../assets/images/landing page/icons/features-icon-6.png'
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

    const renderPaper = (id) => {
        return(
            <div className = "content_paper_left">
                {
                    ContentJson.headers[id].map(item => {
                        return (
                            <span className = "content_header">{item}</span>
                        )
                    })
                }
                <div className = "content_description">
                    { ContentJson.description[id] }
                </div>
                <div className = "learn_more_container">
                   <span className = "learn_more">Learn More</span>
                </div>
            </div>
        )
    }

    const renderDetailContentLeft = (id) => {
        return (
            <div className = "content_paper">
                { renderPaper(id) }
                <div className = {contentImages[id]}/>
            </div>
        )
    }

    const renderDetailContentRight = (id) => {
        return (
            <div className = "content_paper">
                <div className = {contentImages[id]}/>
                { renderPaper(id) }
            </div>
        )
    }

    const renderDetailSection = () => {
        return (
            <section className = "details">
                { renderHeader("WHAT WE HAVE", headerJson.subContent02) }
                { renderDetailContentLeft("content-1") }
                { renderDetailContentRight("content-2") }
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
                        <Button label = "GET STARTED"/>
                    </div>
                    <span className = "header_content_02">{headerJson.context}</span>
                </div>
                <Paper className = "landing_content_bottom" elevation={5}>
                    { renderDetailSection() }
                    { renderfeatureSection() }
                </Paper>
            </div>
        </div>
    )
}

export default Content
