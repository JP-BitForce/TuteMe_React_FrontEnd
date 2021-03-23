import React from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import prevArrow from '../../assets/images/shared/arrow_left.png'
import nextArrow from '../../assets/images/shared/arrow_right.png'
import './Slick.css'

const Slick = ({children}) => {
    
    const SliderArrow = (values) => {
        const { className, style, onClick, next } = values;
        return (
          <div className={className} style={style} onClick={onClick}>
            <img src={next ? nextArrow : prevArrow} alt="chevron" width="30px" />
          </div>
        );
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        initialSlide: 0,
        slidesToScroll: 3,
        className: "slider",
        nextArrow: <SliderArrow next />,
        prevArrow: <SliderArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
        ],
    }

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default Slick
