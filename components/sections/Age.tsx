import React, { Fragment, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Age = () => {
  const sliderRef = useRef<any>(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Fragment>
      <div className="row m-top-20">
        <div className="col-12">
          <div className="Chronic-heading">
            <h4>Age</h4>
          </div>
        </div>
      </div>
      <div className="slider-main bg-clr">
        <div className="prev" onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
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
                <img src="/images/age20-29.svg" alt="" />
              </div>
              <div className="desc">
                <p>20-29</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age30-39.svg" alt="" />
              </div>
              <div className="desc">
                <p>30-39</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age40-49.svg" alt="" />
              </div>
              <div className="desc">
                <p>40-49</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age50-59.svg" alt="" />
              </div>
              <div className="desc">
                <p>50-59</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age60-69.svg" alt="" />
              </div>
              <div className="desc">
                <p>60-69</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age70-79.svg" alt="" />
              </div>
              <div className="desc">
                <p>70-79</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/age80+.svg" alt="" />
              </div>
              <div className="desc">
                <p>80+</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </Fragment>
  );
};

export default Age;
