import React, { Component } from 'react'

import Header from '../../components/Header/Header'
import Event from './Event'
import FeatureCard from './FeatureCard'
import Blog from './Blog'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import instructor from '../../assets/images/Home/instructor.svg'
import life_time from '../../assets/images/Home/life_time.svg'
import courses from '../../assets/images/Home/courses.svg'
import who_we from '../../assets/images/Home/blog2.jpg'
import headerImg from '../../assets/images/Home/header.jpg'
import event1 from '../../assets/images/Home/event3.jpg'
import event2 from '../../assets/images/Home/event4.jpg'
import blog from '../../assets/images/Home/blog.jpg'
import blog1 from '../../assets/images/Home/blog1.jpg'
import blog2 from '../../assets/images/Home/blog2.jpg'
import certificate from '../../assets/images/Home/certificates.png'
import discount from '../../assets/images/Home/discount.png'
import scholar from '../../assets/images/Home/scholar.png'

import json from '../../json/Home.json'
import './Home.css'

class Home extends Component {

    cards = [
        {src : instructor, title : "Expert instructors", description :"The automated process all your website tasks."},
        {src : courses, title : "100+ courses ",  description :"The automated process all your website tasks."},
        {src : life_time, title : "Life time access", description :"The automated process all your website tasks."}
    ]

    counts = [
        {label : "Courses", count: "1524"},
        {label : "Students", count: "853"},
        {label : "Teachers Online", count: "300"},
        {label : "Cities", count: "76"},
    ]

    features = {
        "Certifications": certificate,
        "Offers & Discounts": discount,
        "Scholarship Facility": scholar,
        "Creative Lessons": scholar,
        "Regular Classes": discount,
        "Certified Teachers": certificate
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

    renderSection1 = () => {
        return (
            <Grid container>
                <Grid item md={6}>
                    <img src = {who_we} alt = "who are we" className = "main_who_img"/>
                </Grid>
                <Grid item md={6}>
                    <Paper elevation = {3}>
                    <div className = "section_1_info_container">
                        <h4>{json.main_section_1.header}</h4>
                        <span>{json.main_section_1.subContent_2}</span>
                        <div className = "section_1_counts">
                            <Grid container>
                                {
                                    this.counts.map(item => {
                                        return (
                                            <Grid item xs={6} md={6} sm={6} style = {{marginBottom:"5%"}}>
                                                <div className = "column">
                                                    <span className = "section_1_count_span">{item.count}</span>
                                                </div>
                                                <span className = "section_1_count_label">{item.label}</span>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid> 
                        </div>                              
                    </div>
                    </Paper>
                </Grid>
                <Grid item md={1}/>
            </Grid>
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
                        <form className = "newsletter_form">
                            <input type = "email" placeholder = "Email address"/>
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
                <div className = "main_content_section_3">
                    { this.renderSection3() }
                </div>
                <div className = "main_content_section_4">
                    { this.renderSection4() }
                </div>
                <div className = "main_content_section_5">
                    { this.renderSection5() }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className = "home_div_root">
                <React.Fragment>
                    <CssBaseline />
                    <main>
                        <Header 
                            title = {json.header_content_1} 
                            src = {headerImg} 
                            cards = {this.cards}    
                        />
                        { this.renderMainContents() }
                    </main>
                </React.Fragment>
            </div>
        )
    }
}


export default Home