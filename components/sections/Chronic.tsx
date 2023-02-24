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
import { useDataset, useVariant } from "../context/VariantProvider";

interface ChronicProps {
  active: string;
  diseases: ICategory[];
}

const Chronic = (props: ChronicProps) => {
  const { active, diseases } = props;
  const isDeath = useVariant();
  const type = useDataset();

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

  const diseaseClickHandler = (name: string, image: string) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      [type]: {
        ...criteria[type],
        disease: name,
        diseaseImage: image,
      },
    });
  };

  const diseasePercentage = (type: string) => {
    const disease = diseases.find((s) => s._id === type)?.percentage;
    if (!disease) return "0.0";
    else return disease.toFixed(1);
  };

  const DISEASES = isDeath ? DEATH_DISEASES : INCIDENCE_DISEASES;
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
            {DISEASES.map((disease) => (
              <SwiperSlide
                key={disease.name}
                onClick={() => diseaseClickHandler(disease.name, disease.image)}
              >
                <Specs
                  active={active}
                  caption={disease.name}
                  value={diseasePercentage(disease.name)}
                  image={disease.image}
                />
              </SwiperSlide>
            ))}
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

const INCIDENCE_DISEASES = [
  { name: "Arthritis", image: "/images/Arthritis.svg" },
  { name: "Asthma", image: "/images/Asthma.svg" },
  { name: "COPD", image: "/images/Lung_Disease.svg" },
  { name: "Cardiovascular", image: "/images/Hear_ Disease.svg" },
  { name: "Depression", image: "/images/Depression.svg" },
  { name: "Diabetes", image: "/images/Diabetes.svg" },
  { name: "Kidney", image: "/images/Kidney_Disease.svg" },
  { name: "Other Cancer", image: "/images/Cancer.svg" },
  { name: "Skin Cancer", image: "/images/Skin Cancer.svg" },
];

const DEATH_DISEASES = [
  { name: "Alzheimer & Dementia", image: "/images/Arthritis.svg" },
  { name: "Diabetes mellitus", image: "/images/Diabetes.svg" },
  { name: "Hypertension", image: "/images/Asthma.svg" },
  { name: "Ischaemic heart diseases", image: "/images/Lung_Disease.svg" },
  { name: "Kidney Disease", image: "/images/Kidney_Disease.svg" },
  { name: "Stroke", image: "/images/Hear_ Disease.svg" },
  { name: "Lung Disease", image: "/images/Depression.svg" },
];
