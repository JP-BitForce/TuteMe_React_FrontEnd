import React from 'react'

import Card from 'react-bootstrap/Card'
import './AnimatedButton.css'

const AnimatedButton = ({label,onClick}) => {
    return (
        <div className = "get_started_btn" onClick = {onClick}>
            <Card.Body className="text-center">
                <Card.Text>
                    <span>{label}</span>
                </Card.Text>
            </Card.Body>
        </div>
    )
}

export default AnimatedButton
