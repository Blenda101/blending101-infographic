import React, { Fragment, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeartPulse,
  faLungs,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import Specs from "../shared/Specs";

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
            <Specs caption="Heart Disease" value={70} icon={faHeartPulse} />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Cancer" value={60} image="/images/Cancer.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Lung Disease" value={45} icon={faLungs} />
          </SwiperSlide>
          <SwiperSlide>
            <Specs
              caption="Kidney Disease"
              value={34}
              image="/images/Kidney_Disease.svg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Diabetes" value={34} image="/images/Diabetes.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs
              caption="Alzheimer & Dementia"
              value={45}
              image="/images/Alzheime.svg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="Stroke" value={45} image="/images/Stroke.svg" />
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
