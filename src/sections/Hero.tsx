"use client"

import React, { useEffect } from "react";
import { heroSlides } from "@/data/data";
import "./hero.css";
import HeroSlide from "@/components/HeroSlide";
// to import aos y jo pop up jasi piri just jasi animation uske liye

import AOS from "aos";

// import swiper react componenets
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper stles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  // col are wrapped up inside rows, rows are wrapped up inside the container

  return (
    <section id="hero-slider" className="hero-slider">
      <div className="container-md" data-aos="fade-in">
        <div className="row">
          <div className="col-12">
            <Swiper
            
            slidesPerView={'auto'}
            speed={500}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{

              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            navigation={{
           nextEl: '.customer-swiper-button-next',
           prevEl:'.custom-swiper-button-prev',

            }}

            modules={[Autoplay, Pagination ,Navigation]  }    
            loop={true}
            className="sliderFeaturedPosts"    
            
            
            
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>

                  {/* include cutomised hero slide template */}

                  <HeroSlide  slide={slide}/>

                </SwiperSlide>
              ))}

              <div className="custom-swiper-button-next">
                <span   className="bi-chevron-right"></span>

              </div>
              <div className="custom-swiper-button-prev">
                <span className="bi-chevron-left">

                </span>
              </div>
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
