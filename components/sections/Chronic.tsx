import React, { Fragment, useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeartPulse,
  faLungs,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import Specs, { ICategory } from "../shared/Specs";
import { criteriaVar } from "../../graphql/Infograph";
import useSliderButton from "../../hooks/useSliderButton";

interface ChronicProps {
  active: string;
  diseases: ICategory[];
}

const Chronic = (props: ChronicProps) => {
  const { active, diseases } = props;

  const showArrow = useSliderButton(diseases);
  const [isBegin, setIsBegin] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const sliderRef = useRef<any>(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const diseaseClickHandler = (name: string) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      disease: name,
    });
  };

  const diseasePercentage = (type: string) => {
    const race = diseases.find((s) => s._id === type)?.percentage;
    if (race === 0) return "0.0";
    const roundedRace = Math.round(race || 0);
    return +(race && roundedRace === 0 ? race.toFixed(1) : roundedRace);
  };

  const swiper = sliderRef?.current?.swiper;
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
        <Fragment>
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
            <SwiperSlide onClick={() => diseaseClickHandler("Arthritis")}>
              <Specs
                active={active}
                caption={"Arthritis"}
                value={diseasePercentage("Arthritis")}
                image="/images/Cancer.svg"
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Asthma")}>
              <Specs
                active={active}
                caption={"Asthma"}
                value={diseasePercentage("Asthma")}
                image="/images/Cancer.svg"
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("COPD")}>
              <Specs
                active={active}
                caption={"COPD"}
                value={diseasePercentage("COPD")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Cardiovascular")}>
              <Specs
                active={active}
                caption={"Cardiovascular"}
                value={diseasePercentage("Cardiovascular")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Depression")}>
              <Specs
                active={active}
                caption={"Depression "}
                value={diseasePercentage("Depression ")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Diabetes")}>
              <Specs
                active={active}
                caption={"Diabetes"}
                value={diseasePercentage("Diabetes")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Kidney Disease")}>
              <Specs
                active={active}
                caption={"Kidney Disease"}
                value={diseasePercentage("Kidney Disease")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Other Cancer")}>
              <Specs
                active={active}
                caption={"Other Cancer"}
                value={diseasePercentage("Other Cancer")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Skin Cancer")}>
              <Specs
                active={active}
                caption={"Skin Cancer"}
                value={diseasePercentage("Skin Cancer")}
                icon={faLungs}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => diseaseClickHandler("Stroke")}>
              <Specs
                active={active}
                caption={"Stroke"}
                value={diseasePercentage("Stroke")}
                icon={faLungs}
              />
            </SwiperSlide>
            {/* {diseases.map((disease) => (
                <SwiperSlide
                  key={disease?._id}
                  onClick={() => diseaseClickHandler(disease?._id)}
                >
                  <Specs
                    active={active}
                    caption={disease?._id}
                    value={Math.round(disease?.percentage)}
                    icon={faHeartPulse}
                  />
                </SwiperSlide>
              ))}
 */}
            {/* <SwiperSlide>
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
          </SwiperSlide>*/}
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

export default Chronic;
