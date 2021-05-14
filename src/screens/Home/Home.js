import React, { Component } from 'react'

import Event from './Event'
import FeatureCard from './FeatureCard'
import Blog from './Blog'
import Loading from '../../components/Loading/Loading'
import {getLandingPageContents, subscribe} from '../../api/landing'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import event1 from '../../assets/images/Home/event1.jpg'
import event2 from '../../assets/images/Home/event2.jpg'
import blog from '../../assets/images/Home/blog.jpg'
import blog1 from '../../assets/images/Home/blog1.jpg'
import blog2 from '../../assets/images/Home/blog2.jpg'
import offer from '../../assets/images/Home/offer.png'
import regular_lessons from '../../assets/images/Home/regular_lessons.png'
import certificattion from '../../assets/images/Home/certificate.png'
import scholarship from '../../assets/images/Home/scholarship.png'
import certificate_people from '../../assets/images/Home/certificate_people.png'
import creative_lessons from '../../assets/images/Home/creative_lessons.png'

import json from '../../json/Home.json'
import './Home.css'

class Home extends Component {
    state = {
        counts: null,
        loading: false,
        subLoading: false,
        open: false,
        message: "",
        severity: "success",
        email : ""
    }

    features = {
        "Certifications": certificattion,
        "Offers & Discounts": offer,
        "Scholarship Facility": scholarship,
        "Creative Lessons": creative_lessons,
        "Regular Classes": regular_lessons,
        "Certified Teachers": certificate_people
    }
    
    event = [
        { src : event1, date: 15, month: "Jan", time: "10:00 AM - 11:00 AM", location: "Online Event", description:"One make creepeth man for so bearing their firmament won't fowl meat over seas great"},
        { src : event2, date: 21, month: "Feb", time: "04:00 PM - 05:30 AM", location: "Hilton Quebec", description:"One make creepeth man for so bearing their firmament won't fowl meat over seas great"},
    ]

    blog = [
        {date: 15, month: "Jan", year: "2021", comments: 5, title: json.main_section_4.blog[0].title, content: json.main_section_4.blog[0].des, src: blog},
        {date: 28, month: "Feb", year: "2021", comments: 3, title: json.main_section_4.blog[1].title, content: json.main_section_4.blog[0].des, src: blog1},
        {date: 16, month: "Mar", year: "2021", comments: 1, title: json.main_section_4.blog[2].title, content: json.main_section_4.blog[0].des, src: blog2}
    ]

    componentDidMount() {
        this.setState({ loading: true })
        getLandingPageContents().then(response => {
            let counts = [
                {label : "Courses", count: response.counts.courses},
                {label : "Students", count: response.counts.students},
                {label : "Teachers Online", count: response.counts.tutors},
                {label : "Schedules", count: response.counts.schedules},
            ]
            this.setState({
                counts: counts,
                loading: false
            })
        }).catch(err => {
            this.setState({
                count: null,
                loading: false
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ subLoading: true })
        subscribe(this.state.email).then(response => {
            this.setState({ 
                subLoading: true,
                email: "",
                open: true,
                message: response.message,
                severity: "success",
            })
        }).catch(err => {
            this.setState({ 
                subLoading: true,
                email: "",
                open: true,
                message: err.message,
                severity: "error",
            })
        })
    }

    handleInputOnChange = (event) => {
        this.setState({ email: event.target.value })
    }

    renderSection1 = () => {
        const {counts} = this.state
        return (
            <section className = "section_1_ftc">
                <div className = "section_1_container">
                    <div className = "section_1_content_container">
                        <h1>{json.main_section_1.header}</h1>
                        <span>{json.main_section_1.subContent_2}</span>
                    </div>
                    <div className = "row">
                        {
                            counts && counts.map(item => {
                                return (
                                    <Grid item xs={6} md={3} sm={6} style = {{marginBottom:"5%"}}>
                                        <div className = "column">
                                            <span className = "section_1_count_span">{item.count}</span>
                                            <span className = "section_1_count_label">{item.label}</span>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }

    renderSection2 = () => {
        return (
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
                                        src = {this.features[title]}
                                        title = {title}
                                        description = {description}
                                    />
                                })
                            }
                        </Grid>
                    </div>
                </div>
            </Container>
        )
    }

    renderSection3 = () => {
        return (
            <Container maxWidth="lg">
                <div className = "section_3_header">
                    <span className = "section_3_header_title">Upcoming Events</span>
                </div>
                <div className = "section_3_content">
                    <Grid container spacing={5}>
                        {
                            this.event.map(item => {
                                return <Event details = {item}/>
                            })
                        }
                    </Grid>
                </div>
                <div className = "event_bottom_div">
                    <span className = "section_3_footer">VIEW ALL EVENTS</span>
                </div>
            </Container>
        )
    }

    renderSection4 = () => {
        return (
            <Container maxWidth="lg">
                <div className = "section_4_header">
                    <h1 className = "section_4_header_title">Recent Blog</h1>
                    <p className = "section_4_header_subtitle">{json.main_section_4.subTitle}</p>
                </div>
                <div className = "section_4_content">
                    <Grid container spacing={5}>
                        {
                            this.blog.map(item => {
                                return <Blog details = {item}/>
                            })
                        }
                    </Grid>
                </div>
            </Container>
        )
    }

    renderSection5 = () => {
        return (
            <div className = "subscribe_newsletter">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className = "newsletter_text">
                            <h3>Stay Updated</h3>
                            <p>{json.main_section_5.newsletter_text}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form className = "newsletter_form" onSubmit = {this.handleSubmit}>
                            <input type = "email" placeholder = "Email address" onChange = {this.handleInputOnChange}/>
                            <button type = "submit">Subscribe Now</button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderMainContents = () => {
        return (
            <div className = "main_contents_grid">
                <div className = "main_content_section_1">
                    { this.renderSection1() }
                </div>
                <div className = "main_content_section_2">
                    { this.renderSection2() }
                </div>
                <div className = "main_content_section_3 parallax">
                    { this.renderSection3() }
                </div>
                <div className = "main_content_section_4">
                    { this.renderSection4() }
                </div>
                <div className = "main_content_section_5 parallax">
                    { this.renderSection5() }
                </div>
            </div>
        )
    }

    render() {
        const {loading} = this.state
        return (
            <div className = "home_div_root">
                <React.Fragment>
                    <CssBaseline />
                    {  loading ? <Loading open = {loading} /> : this.renderMainContents() }
                </React.Fragment>
            </div>
        )
    }
}


export default Home