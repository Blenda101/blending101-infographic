import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
            <div className="small-icon">
              <div className="icon">
                <img src="/images/White.svg" alt="" />
              </div>
              <div className="desc">
                <p>White</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Black.svg" alt="" />
              </div>
              <div className="desc">
                <p>Black</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/hispanic.svg" alt="" />
              </div>
              <div className="desc">
                <p>Hispanic</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Asian.svg" alt="" />
              </div>
              <div className="desc">
                <p>Asian</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/other.svg" alt="" />
              </div>
              <div className="desc">
                <p>Other</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Male.svg" alt="" />
              </div>
              <div className="desc">
                <p>Male</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Female.svg" alt="" />
              </div>
              <div className="desc">
                <p>Female</p>
                <p className="numbers">48%</p>
              </div>
            </div>
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
