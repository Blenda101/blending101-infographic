import React, { Fragment, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Chronic = () => {
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
      <div className="row">
        <div className="col-12">
          <div className="Chronic-heading">
            <h4>Chronic Diseases</h4>
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
                <img src="/images/Hear_ Disease.svg" alt="" />
              </div>
              <div className="desc">
                <p>Heart Disease</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Cancer.svg" alt="" />
              </div>
              <div className="desc">
                <p>Cancer</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Lung_Disease.svg" alt="" />
              </div>
              <div className="desc">
                <p>Lung Disease</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Kidney_Disease.svg" alt="" />
              </div>
              <div className="desc">
                <p>Kidney Disease</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Diabetes.svg" alt="" />
              </div>
              <div className="desc">
                <p>Diabetes</p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Alzheime.svg" alt="" />
              </div>
              <div className="desc">
                <p>
                  Alzheimer & <br />
                  Dementia
                </p>
                <p className="numbers">48%</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="small-icon">
              <div className="icon">
                <img src="/images/Stroke.svg" alt="" />
              </div>
              <div className="desc">
                <p>Stroke</p>
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

export default Chronic;
