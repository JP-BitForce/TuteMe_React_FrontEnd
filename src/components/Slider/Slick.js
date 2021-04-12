import React from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Slick.css'

const Slick = ({children}) => {
  
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: 0,
        slidesToScroll: 1,
        className: "slider",
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        dots: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
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
