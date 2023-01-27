import React, { Fragment, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDna,
} from "@fortawesome/free-solid-svg-icons";
import Specs, { ICategory } from "../shared/Specs";
import { criteriaVar, IVariant } from "../../graphql/Infograph";

interface AgeProps {
  active: string;
  ages: ICategory[];
}

const Age = ({ active, ages }: AgeProps) => {
  const sliderRef = useRef<any>(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const ageClickHandler = (name: string) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      param: name,
      variant: "AGE",
    });
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
        {ages.length !== 0 && (
          <Fragment>
            <div className="prev" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
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
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
            >
              {ages.map((age) => (
                <SwiperSlide
                  key={age._id}
                  onClick={() => ageClickHandler(age._id)}
                >
                  <Specs
                    active={active}
                    caption={age._id}
                    value={Math.round(age.percentage)}
                    image="/images/age20-29.svg"
                  />
                </SwiperSlide>
              ))}

              {/* <SwiperSlide>
            <Specs caption="20-29" value={70} image="/images/age20-29.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="30-39" value={70} image="/images/age30-39.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="40-49" value={70} image="/images/age40-49.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="50-59" value={70} image="/images/age50-59.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="60-69" value={70} image="/images/age60-69.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="70-79" value={70} image="/images/age70-79.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <Specs caption="80+" value={70} image="/images/age80+.svg" />
          </SwiperSlide> */}
            </Swiper>
            <div className="next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Age;
