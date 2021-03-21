import React from 'react'

import './RoundedCategory.css'

const RoundedCategory = ({src}) => {
    return (
        <div className = "category_icon_wrapper">
            <div className ="selected_category_icon">
                <img src = {src} alt = "icon"/>
            </div>
        </div>
    )
}

export default RoundedCategory
