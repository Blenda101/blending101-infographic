import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Specs, { ICategory } from "../shared/Specs";
import { criteriaVar, IVariant } from "../../graphql/Infograph";
import useSliderButton from "../../hooks/useSliderButton";

interface RaceProps {
  active: string;
  races: ICategory[];
  sex: ICategory[];
}

const Race = (props: RaceProps) => {
  const { active, races, sex } = props;
  const sliderRef = useRef<any>(null);
  const showArrow = useSliderButton([...races, ...sex]);

  const [isBegin, setIsBegin] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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

  const racePercentage = (type: string) => {
    const race = races.find((s) => s._id === type)?.percentage;
    if (race === 0) return "0.0";
    const roundedRace = Math.round(race || 0);
    return +(race && roundedRace === 0 ? race.toFixed(1) : roundedRace);
  };

  const sexPercentage = (type: string) => {
    const varSex = sex.find((s) => s._id === type)?.percentage;
    if (varSex === 0) return "0.0";
    const roundedSex = Math.round(varSex || 0);
    return +(varSex && roundedSex === 0 ? varSex.toFixed(1) : roundedSex);
  };

  const swiper = sliderRef?.current?.swiper;
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
        {!isBegin && showArrow && (
          <div className="prev" onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}
        <Swiper
          ref={sliderRef}
          spaceBetween={10}
          onInit={(e) => {
            setIsBegin(e.isBeginning);
            setIsEnd(e.isEnd);
          }}
          onSlideChange={(e) => {
            setIsBegin(e.isBeginning);
            setIsEnd(e.isEnd);
          }}
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
          <SwiperSlide onClick={() => raceSexClickHandler("White", "RACE")}>
            <Specs
              active={active}
              caption={"White"}
              value={racePercentage("White")}
              image="/images/White.svg"
            />
          </SwiperSlide>
          <SwiperSlide onClick={() => raceSexClickHandler("Black", "RACE")}>
            <Specs
              active={active}
              caption={"Black"}
              value={racePercentage("Black")}
              image="/images/Black.svg"
            />
          </SwiperSlide>
          <SwiperSlide onClick={() => raceSexClickHandler("Hispanic", "RACE")}>
            <Specs
              active={active}
              caption={"Hispanic"}
              value={racePercentage("Hispanic")}
              image="/images/hispanic.svg"
            />
          </SwiperSlide>
          <SwiperSlide onClick={() => raceSexClickHandler("Asian", "RACE")}>
            <Specs
              active={active}
              caption={"Asian"}
              value={racePercentage("Asian")}
              image="/images/Asian.svg"
            />
          </SwiperSlide>
          <SwiperSlide onClick={() => raceSexClickHandler("Other", "RACE")}>
            <Specs
              active={active}
              caption={"Other"}
              value={racePercentage("Other")}
              image="/images/other.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => raceSexClickHandler("Male", "SEX")}
            className="separator"
          >
            <Specs
              active={active}
              caption="Male"
              value={sexPercentage("Male")}
              image="/images/Male.svg"
            />
          </SwiperSlide>
          <SwiperSlide onClick={() => raceSexClickHandler("Female", "SEX")}>
            <Specs
              active={active}
              caption="Female"
              value={sexPercentage("Female")}
              image="/images/Female.svg"
            />
          </SwiperSlide>
        </Swiper>
        {!isEnd && showArrow && (
          <div className="next" onClick={handleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Race;
