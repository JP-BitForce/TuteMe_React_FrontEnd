import React from 'react'

import './Footer.css'
import json from '../../json/Footer.json'

const Footer = () => {

    const HREF = {
        "Contact us": '/contact',
        "our services": '/',
        "privacy policy": '/',
        "FAQ": '/FAQ',
        "Payment options": '/',
        "Courses": '/PublicCourses',
        "tutors": '/staffs',
    }

    return (
        <footer className = "footer">
            <div className = "container">
                <div className = "row">
                    {
                        json.link.map(item => {
                            const {header, children} = item 
                            return (
                                <div className = "footer-col">
                                    <h4>{header}</h4>
                                    <ul>
                                        {
                                            children.map(item => {
                                                return (
                                                    <li><a href = {HREF[item]}>{item}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }

                    <div className = "footer-col">
                        <link rel = "stylesheet" type = "text/css" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
                        <h4>follow us</h4>
                        <div className = "social-links">
                            {
                                json.social_content.map(item => {
                                    const {content, style} = item
                                    return(
                                        <a href = {content} target ="_blank" rel="noreferrer noopener"><i className = {style}></i></a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                
                <div className = "footer-bottom">
                    <p>copyright &copy; 2021 Tute-Me. designed by <span>Bit-Force</span></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
