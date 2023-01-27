import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Specs, { ICategory } from "../shared/Specs";
import { criteriaVar, IVariant } from "../../graphql/Infograph";

interface RaceProps {
  active: string;
  races: ICategory[];
  sex: ICategory[];
}

const Race = (props: RaceProps) => {
  const { active, races, sex } = props;
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

  const raceSexClickHandler = (name: string, variant: IVariant) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      param: name,
      variant,
    });
  };

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
          {races.map((race) => (
            <SwiperSlide
              key={race._id}
              onClick={() => raceSexClickHandler(race._id, "RACE")}
            >
              <Specs
                active={active}
                caption={race._id}
                value={Math.round(race.percentage)}
                image="/images/White.svg"
              />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
          <div style={{ height: 5, width: 2, background: "#333" }}></div>
          {sex.map((s) => (
            <SwiperSlide
              key={s._id}
              onClick={() => raceSexClickHandler(s._id, "SEX")}
            >
              <Specs
                active={active}
                caption={s._id}
                value={Math.round(s.percentage)}
                image="/images/Male.svg"
              />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <Specs caption="Female" value={60} image="/images/Female.svg" />
          </SwiperSlide> */}
        </Swiper>
        <div className="next" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default Race;
