import React from 'react'

import ChipButton from '../Button/ChipButton'

import './Header.css'
import json from '../../json/Header.json'

const Header = () => {

    const renderDesktopView = () => {
        return (
            <div className = "header_root">
                <div className = "header_section_01">
                    <span className = "header_welcome_01">{json.mainContent}</span>
                </div>
                <div className = "header_section_02">
                    <span className = "header_welcome_02">{json.context}</span>
                </div>
                <div className = "header_section_02">
                    <ChipButton label = "GET STARTED"/>
                </div>
            </div>
        )
    }

    return (
        renderDesktopView()
    )
}

export default Header
