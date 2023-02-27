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
import { useDataset, useVariant } from "../context/VariantProvider";

interface RaceProps {
  activeRace: string;
  activeSex: string;
  races: ICategory[];
  sex: ICategory[];
}

const Race = (props: RaceProps) => {
  const { activeRace, activeSex, races, sex } = props;
  const type = useDataset();
  const isDeath = useVariant();
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

  const raceSexClickHandler = (
    name: string,
    img: string,
    variant: IVariant,
  ) => {
    const criteria = criteriaVar();
    const isSelected =
      name === criteria[type][variant === "SEX" ? "sex" : "race"];
    const extension = isDeath
      ? {}
      : {
          [variant !== "SEX" ? "sex" : "race"]: "",
          [variant !== "SEX" ? "sexImage" : "raceImage"]: "",
          age: "",
          ageImage: "",
        };
    if (isSelected) {
      criteriaVar({
        ...criteria,
        [type]: {
          ...criteria[type],
          [variant === "SEX" ? "sex" : "race"]: "",
          [variant === "SEX" ? "sexImage" : "raceImage"]: "",
        },
      });
    } else {
      criteriaVar({
        ...criteria,
        [type]: {
          ...criteria[type],
          [variant === "SEX" ? "sex" : "race"]: name,
          [variant === "SEX" ? "sexImage" : "raceImage"]: img,
          ...extension,
        },
      });
    }
  };

  const racePercentage = (type: string) => {
    const race = races.find((s) => s._id === type)?.percentage;
    if (!race) return isDeath ? "0" : "0.0";
    else return isDeath ? Math.round(race) : race.toFixed(1);
  };

  const sexPercentage = (type: string) => {
    const varSex = sex.find((s) => s._id === type)?.percentage;
    if (!varSex) return isDeath ? "0" : "0.0";
    else return isDeath ? Math.round(varSex) : varSex.toFixed(1);
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
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("White", "/images/White.svg", "RACE")
            }
          >
            <Specs
              active={activeRace}
              caption={"White"}
              value={racePercentage("White")}
              image="/images/White.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Black", "/images/Black.svg", "RACE")
            }
          >
            <Specs
              active={activeRace}
              caption={"Black"}
              value={racePercentage("Black")}
              image="/images/Black.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Hispanic", "/images/hispanic.svg", "RACE")
            }
          >
            <Specs
              active={activeRace}
              caption={"Hispanic"}
              value={racePercentage("Hispanic")}
              image="/images/hispanic.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Asian", "/images/Asian.svg", "RACE")
            }
          >
            <Specs
              active={activeRace}
              caption={"Asian"}
              value={racePercentage("Asian")}
              image="/images/Asian.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Other", "/images/other.svg", "RACE")
            }
          >
            <Specs
              active={activeRace}
              caption={"Other"}
              value={racePercentage("Other")}
              image="/images/other.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Male", "/images/Male.svg", "SEX")
            }
            className="separator"
          >
            <Specs
              active={activeSex}
              caption="Male"
              value={sexPercentage("Male")}
              image="/images/Male.svg"
            />
          </SwiperSlide>
          <SwiperSlide
            onClick={() =>
              raceSexClickHandler("Female", "/images/Female.svg", "SEX")
            }
          >
            <Specs
              active={activeSex}
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
