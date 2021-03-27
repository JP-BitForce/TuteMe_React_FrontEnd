import React from 'react'

import './Header.css'

const HeaderTopper = ({screen, rootNav, childNav}) => {
    return (
        <div className = "header_content">
            <div className = "header_content_left">
                    <h4 className = "screen-root">{screen}</h4>
                    <div className = "screen_childs">
                        <ol className = "screen_childs__ol">
                            <li>{rootNav}</li>
                            {
                                childNav.map(item => {
                                    return (
                                        <>
                                            <li aria-hidden = {true} className = "MuiBreadcrumbs-separator css-1wuw8dw-MuiBreadcrumbs-separator">
                                                <span className = "seperator_dot"/>
                                            </li>
                                            <li>{item}</li>
                                        </>
                                    )
                                })
                            }
                        </ol>
                    </div>
            </div>
        </div>
    )
}

export default HeaderTopper
