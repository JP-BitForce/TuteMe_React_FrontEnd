import React, {useEffect, useState} from 'react'

import Paper from '@material-ui/core/Paper';

import Carousel from 'react-bootstrap/Carousel'

import './Carousel.css'
import carousel01 from '../../assets/images/landing page/carousel1.jpg'
import carousel03 from '../../assets/images/landing page/carousel3.jpg'
import carousel04 from '../../assets/images/landing page/carousel4.jpg'
import carousel05 from '../../assets/images/landing page/carousel5.jpg'

import Header from '../../components/Header/Header'

const Carousels = ({mobileView}) => {
    const styles = {
        desktop:["desktop_card", "desktop_card_right", "desktop_card_left"],
        mobile: ["mobile_card", "mobile_card_top", "mobile_card_bottom"]
    }

    const images = [
        {img:carousel01, alt:"First slide"},
        {img:carousel03, alt:"Third slide"},
        {img:carousel04, alt:"fourth slide"},
        {img:carousel05, alt:"fifth slide"},
    ]

    const [style, setStyle] = useState(styles.desktop)

    useEffect(()=>{
        handleSetStyle()
        //eslint-disable-next-line
    }, [mobileView])

    const handleSetStyle = () => {
        if (mobileView) {
            setStyle(styles.mobile)
        } else {
            setStyle(styles.desktop)
        }
    }

    const renderCarouselItem = (src, alt) => {
        return (
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={src} alt={alt}/>
                <Carousel.Caption>
                    <p className = "carousel_caption">Find your inspiration.</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    const renderDesktopView = () => {
        return (
            <Paper elevation={3} className = {style[0]}>
                <div className = {style[1]}>
                    <Carousel>
                        {
                            images.map(item => renderCarouselItem(item.img, item.alt))
                        }
                    </Carousel>
                </div>
                <div className = {style[2]}>
                    <Header/>
                </div>
            </Paper>
        )
    }

    return (
        renderDesktopView() 
    )
}

export default Carousels
