import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../images/zorro.jpg";
import img2 from "../../images/bhag_milkha.jpg";
import img3 from "../../images/monster_house.jpg";
import img4 from "../../images/naruto_ship.jpg";
import img5 from "../../images/raj_show.jpg";
import img6 from "../../images/oneP.webp";
import "../components/carousel.css";
import "../components/login.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {/* Carousel content (images as background) */}
      <div
        className="slide-item"
        // style={{ backgroundImage:  }}

        style={{
          backgroundImage: `url('../../images/zorro.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>

      <div
        className="slide-item"
        // style={{ backgroundImage: `url('../../images/bhag_milkha.jpg')` }}
        style={{
          backgroundImage: `url('../../images/bhag_milkha.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>

      <div
        className="slide-item"
        // style={{ backgroundImage: `url('../../images/monster_house.jpg')` }}
      ></div>

      {/* Add more slides as needed */}

      <div
        className="slide-item"
        // style={{ backgroundImage: `url('../../images/naruto_ship.jpg')` }}
      ></div>

      <div
        className="slide-item"
        // style={{ backgroundImage: `url('../../images/raj_show.jpg')` }}
      ></div>

      <div
        className="slide-item"
        // style={{ backgroundImage: `url('../../images/oneP.webp')` }}
      ></div>

      {/* Add more slides as needed */}
    </Slider>
  );
};

export default Carousel;
