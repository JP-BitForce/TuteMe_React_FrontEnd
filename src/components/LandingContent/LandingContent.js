import React, {useState, useEffect} from 'react'

import AnimatedButton from '../../components/Button/AnimatedButton'
import CardView from '../../components/Card/CardView'

import json from '../../json/LandingContent.json'

import cardImg01 from '../../assets/images/landing page/students.jpg'
import cardImg02 from '../../assets/images/landing page/teacher.jpg'
import cardImg03 from '../../assets/images/landing page/online-les.jpg'
import './LandingContent.css'

const LandingContent = ({mobileView}) => {
    const contentImages = {
        "1": "content_paper_right_1",
        "2": "content_paper_right_2"
    }

    const cardImages = {
        "1": cardImg01,
        "2": cardImg02,
        "3": cardImg03,
    }

    const [scrolled,setScrolled]= useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if(offset > 200 ) {
          setScrolled(true);
        }
        else {
          setScrolled(false);
        }
      } 
  
      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
      })
    
      let x=['content_paper_mobile'];
  
      if(scrolled){
        x.push('come-in');
      }

    const renderPaperTypeRight = (id) => {
        return (
            <div className = "content_paper">
                <div className = "content_paper_left">
                    {
                        json.headers[id].map(item => {
                            return (
                                <span className = "content_header">{item}</span>
                            )
                        })
                    }
                    <div className = "content_description">
                        { json.description[id] }
                    </div>
                    <div>
                        <AnimatedButton label = "Learn More"/>
                    </div>
                </div>
                <div className = {contentImages[id]}/>
            </div>
        )
    }

    const renderPaperTypeLeft = (id) => {
        return (
            <div>
                <div className = "content_paper">
                    <div className = {contentImages[id]}/>
                    <div className = "content_paper_left">
                        {
                            json.headers[id].map(item => {
                                return (
                                    <span className = "content_header">{item}</span>
                                )
                            })
                        }
                        <div className = "content_description">
                            { json.description[id] }
                        </div>
                        <div>
                            <AnimatedButton label = "Learn More"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderPaperTypeBottom = (id) => {
        return (
            <div className = {x.join(" ")}>
                {
                    json.headers[id].map(item => {
                        return (
                            <span className = "content_header">{item}</span>
                        )
                    })
                }
                <div className = "content_description">
                    { json.description[id] }
                </div>
                <div>
                    <AnimatedButton label = "Learn More"/>
                </div>
            </div>
        )
    }

    const renderContentCards = () => {
        return (
            <div className = "content_paper_cards">
                <div className = "paper_card_header">
                    <span className = "paper_card_header_title"> {json.cardHeader} </span>
                    {
                        json.cardHeaderSubTitles.map(item => {
                            return (
                                <span className = "paper_card_header_title2"> {item} </span>
                            )
                        })
                    }
                </div>
                <div className = { mobileView ? "paper_cards_mobile" : "paper_cards" }>
                    {
                        json.cards.map(item => {
                            return (
                                <CardView
                                    mobileView
                                    header = {item.header}
                                    img = {cardImages[item.img]}
                                    text = {item.text}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const renderDesktopView = () => {
        return (
            <div className = "landing_content_root">
                { renderPaperTypeRight("1") }
                { renderPaperTypeLeft("2") }
                { renderContentCards() }
            </div>
        )
    }

    const renderMobileView = () => {
        return (
            <div className = "landing_content_mobile_root">
                { renderPaperTypeBottom("1") }
                { renderPaperTypeBottom("2") }
                { renderContentCards() }
            </div>
        )
    }

    return (
        <div className = "landing_content">
            {
                !mobileView ? renderDesktopView() : renderMobileView()
            }
        </div>
    )
}

export default LandingContent
