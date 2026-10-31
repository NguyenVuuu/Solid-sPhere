import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner4 from "../assets/4.jpg";
import banner5 from "../assets/1.jpg";
import banner6 from "../assets/2.jpg";
import banner7 from "../assets/3.jpg";

const Slideshow = () => {
  const slides = [
    { id: 5, image: banner5, alt: "Banner 5" },
    { id: 6, image: banner6, alt: "Banner 6" },
    { id: 7, image: banner7, alt: "Banner 7" },
    { id: 4, image: banner4, alt: "Banner 4" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-4 relative rounded-lg overflow-hidden border border-gray-200">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="focus:outline-none">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;

// Updated: 2025-10-12T16:06:31.195Z

// Updated: 2025-10-12T16:08:45.274Z
