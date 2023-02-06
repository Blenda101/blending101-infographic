import React, { Fragment, useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDna,
} from "@fortawesome/free-solid-svg-icons";
import Specs, { ICategory } from "../shared/Specs";
import { criteriaVar, IVariant } from "../../graphql/Infograph";
import getBreakpoints from "../../utils/getBreakpoint";
import useSliderButton from "../../hooks/useSliderButton";
import Tooltip from "../shared/Tooltip";

interface AgeProps {
  active: string;
  ages: ICategory[];
}

const Age = ({ active, ages }: AgeProps) => {
  const sliderRef = useRef<any>(null);
  const showArrow = useSliderButton(ages);
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

  const agePercentage = (type: string) => {
    const age = ages.find((s) => s._id === type)?.percentage;
    if (!age) return "0.0";
    else return age.toFixed(1);
  };

  const ageClickHandler = (name: string, img: string) => {
    const criteria = criteriaVar();
    const isSelected = name === criteria.param;
    if (isSelected) {
      criteriaVar({
        ...criteria,
        param: "",
        paramImage: "",
        variant: "",
      });
    } else {
      criteriaVar({
        ...criteria,
        param: name,
        paramImage: img,
        variant: "AGE",
      });
    }
  };

  return (
    <Fragment>
      <div className="row m-top-20">
        <div className="col-12">
          <div className="Chronic-heading">
            <h4>Age</h4>
          </div>
        </div>
      </div>
      <div className="slider-main bg-clr-scnd">
        <Fragment>
          {!isBegin && showArrow && (
            <div className="prev" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          <Swiper
            ref={sliderRef}
            spaceBetween={10}
            breakpoints={getBreakpoints(ages)}
            onInit={(e) => {
              setIsBegin(e.isBeginning);
              setIsEnd(e.isEnd);
            }}
            onSlideChange={(e) => {
              setIsBegin(e.isBeginning);
              setIsEnd(e.isEnd);
            }}
          >
            <SwiperSlide
              onClick={() => ageClickHandler("18-24", "/images/age20-29.svg")}
            >
              <Specs
                caption="18-24"
                active={active}
                value={agePercentage("18-24")}
                image="/images/age20-29.svg"
              />
            </SwiperSlide>

            <SwiperSlide
              onClick={() => ageClickHandler("25-34", "/images/age30-39.svg")}
            >
              <Specs
                caption="25-34"
                active={active}
                value={agePercentage("25-34")}
                image="/images/age30-39.svg"
              />
            </SwiperSlide>

            <SwiperSlide
              onClick={() => ageClickHandler("35-44", "/images/age40-49.svg")}
            >
              <Specs
                caption="35-44"
                active={active}
                value={agePercentage("35-44")}
                image="/images/age40-49.svg"
              />
            </SwiperSlide>

            <SwiperSlide
              onClick={() => ageClickHandler("45-54", "/images/age50-59.svg")}
            >
              <Specs
                caption="45-54"
                active={active}
                value={agePercentage("45-54")}
                image="/images/age50-59.svg"
              />
            </SwiperSlide>

            <SwiperSlide
              onClick={() => ageClickHandler("55-64", "/images/age60-69.svg")}
            >
              <Specs
                caption="55-64"
                active={active}
                value={agePercentage("55-64")}
                image="/images/age60-69.svg"
              />
            </SwiperSlide>

            <SwiperSlide
              onClick={() => ageClickHandler("65+", "/images/age80+.svg")}
            >
              <Specs
                caption="65+"
                active={active}
                value={agePercentage("65+")}
                image="/images/age80+.svg"
              />
            </SwiperSlide>

            <SwiperSlide>&nbsp;</SwiperSlide>
          </Swiper>
          {!isEnd && showArrow && (
            <div className="next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Age;
