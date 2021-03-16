import React from 'react'

import './Rating.css'

const ReadOnlyRating = ({rate}) => {
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            {
                ["1","2","3","4","5"].map(item => {
                    return (
                        <span class = {[
                            "fa fa-star",
                            item <= rate ? "checked" : "not_checked"
                        ].join(" ")}></span>
                    )
                })
            }
        </div>
    )
}

export default ReadOnlyRating
