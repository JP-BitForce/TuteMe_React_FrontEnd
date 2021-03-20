import React, { Component } from 'react'

import Header from '../../components/Header/Header'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import instructor from '../../assets/images/Home/instructor.svg'
import life_time from '../../assets/images/Home/life_time.svg'
import courses from '../../assets/images/Home/courses.svg'
import who_we from '../../assets/images/Home/collection.png'
import headerImg from '../../assets/images/Home/header.jpg'

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

    renderSection1 = () => {
        return (
            <Grid container>
                <Grid item md={6}>
                    <img src = {who_we} alt = "who are we" className = "main_who_img"/>
                </Grid>
                <Grid item md={5}>
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
                                    return (
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Paper elevation = {3}> 
                                                <CardContent style = {{textAlign:"left"}}>
                                                    <div className = "feature_card_head">
                                                        <img src={instructor} alt = "" style = {{width:"50px"}}/>
                                                        <span className = "textPrimary">{title}</span>
                                                    </div>
                                                    <Typography color = "textSecondary">{description}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color="primary">View</Button>
                                                </CardActions>
                                            </Paper>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
            </Container>
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
                            subTitle = {json.header_content_2}
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