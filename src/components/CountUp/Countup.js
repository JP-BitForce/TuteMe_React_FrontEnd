import React from 'react'

import CountUp from 'react-countup';

import './Countup.css'

const Countup = ({start, end, duration, src, title}) => {
    return (
        <div className = "countup_root">
            <img src={src} alt={title} className = "count_img_src"/>
            <CountUp 
                start={start} 
                end={end} 
                delay={0} 
                duration={duration}
                separator=","
            >
                {({ countUpRef }) => (
                    <div className = "counter_block">
                        <span ref={countUpRef} className = "counter_span"/>
                        <span className = "counter_tilte">{title}</span>
                    </div>
                )}
            </CountUp>
        </div>
    )
}

export default Countup
