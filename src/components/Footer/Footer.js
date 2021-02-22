import React from 'react'

import './Footer.css'
import json from '../../json/Footer.json'

const Footer = ({mobileView}) => {

    const renderDesktopView = () => {
        return (
            <div className = "footer_desktop_content">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className = "content_main">
                    <div className = "content_main_social">
                        <span className = "content__msg">FOLLOW US</span>
                        <div className = "content__social">
                            {
                                json.social_content.map(item => {
                                    const {style} = item
                                    return (
                                        <div className = "social_content">
                                            <div className = {style}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className = "vertical_seperator"/>

                    <div className = "content_main_links">
                        {
                            json.link.map(item => {
                                return (
                                    <div className = "link_base">
                                        <span className = "link_header">{item.header}</span>
                                        <div className = "link_list">
                                        {
                                            item.children.map(child => {
                                                return (
                                                    <span className = "link_list_item">{child}</span>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "footer_root">
            <div className = "footer_div">
                { 
                    !mobileView && renderDesktopView()
                }
            </div>
        </div>
    )
}

export default Footer
