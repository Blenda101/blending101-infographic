import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Specs from "../shared/Specs";

const Race = () => {
  const sliderRef = useRef<any>(null);
  const swiper = sliderRef?.current?.swiper;
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  console.log(swiper);
  return (
    <div className=" m-top-20">
      <div className="row ">
        <div className="col-12">
          <div className="Chronic-heading">
            <h4>Race and Sex</h4>
          </div>
        </div>
      </div>
      <div className="slider-main bg-clr-scnd">
        {swiper && swiper.slides.length < 7 && (
          <div className="prev" onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}
        <Swiper
          ref={sliderRef}
          spaceBetween={10}
          slidesPerView={7}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            760: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <Specs caption="White" value={60} image="/images/White.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Black" value={60} image="/images/Black.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Hispanic" value={60} image="/images/hispanic.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Asian" value={60} image="/images/Asian.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Other" value={60} image="/images/other.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Male" value={60} image="/images/Male.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Female" value={60} image="/images/Female.svg" />
          </SwiperSlide>
        </Swiper>
        <div className="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default Race;
