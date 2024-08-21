import React, { useEffect, useState } from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
  const slides = [
    {
      url: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/04/rgb-lit-gaming-mechanical-keyboard.jpg",
    },
    {
      url: "https://lh5.googleusercontent.com/proxy/nRw0OxJkv3UrxqcrJu_HgFQKbpSHT42ffnm4fzQllrJ0qieIpME8H3uPK8jY28XMjuHP2BTbNsvr4rbAMEAohDw3N28RVz0Uwav-MxqtvanWJYxTDWES9o7A",
    },
    {
      url: "https://imageio.forbes.com/specials-images/imageserve/5fd00ea644cd62376ce2b6c1/In-this-photo-illustration-a-13inch-Macbook-pro-seen---/960x0.jpg?height=474&width=711&fit=bounds",
    },
    {
      url: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/09/02123228/Untitled-design-1-4-1600x900.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  const previousSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative">
      <div className="flex transition-transform duration-500 ease-in-out">
        {slides.map((slide , index) => (
          <img
            src={slide.url}
            key={slide.url}
            className={`${
              current === index ? "block" : "hidden"
            } w-[1300px] h-[150px]  md:w-[180vh] md:h-[400px] rounded-xl object-cover `}
            alt=""
          />
        ))}
      </div>
      <div className="hidden absolute top-0 p-4 md:inset-0 md:flex justify-between items-center">
        <GrLinkPrevious
          onClick={previousSlide}
          className="text-2xl cursor-pointer hover:text-3xl duration-100 text-black"
        />
        <GrLinkNext
          onClick={nextSlide}
          className="text-2xl cursor-pointer text-black hover:text-3xl duration-100"
        />
      </div>
      <div className="flex justify-center items-center gap-3 mt-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={` ${
              current === index ? "bg-red-600" : ""
            } cursor-pointer bg-black h-1 w-1 md:h-3 md:w-3 rounded-full`}
            onClick={() => {
              setCurrent(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
