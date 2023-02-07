/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";

import Honeycomb from "../Honeycomb";

import { GET_STATE_DATA } from "../../graphql/Query";
import { CriteriaState } from "../../graphql/Infograph";

import styles from "./Locations.module.scss";

const Locations = (props: CriteriaState) => {
  const { year, disease, param } = props;

  const { data } = useQuery(GET_STATE_DATA, {
    variables: {
      category: param,
      disease,
      year,
    },
  });

  const states = useMemo(() => {
    if (data?.getStateData) return JSON.parse(data?.getStateData);
    else return null;
  }, [data?.getStateData]);

  // console.log(states);

  return (
    <section id="location-sec">
      <div className="container-fluid w-90">
        <div className="row">
          <div className="col-12">
            <div className="heading text-center">
              <img src="/images/location-shape.png" alt="" />
              <span></span>
              <h3>location</h3>
            </div>
            <div className={styles.range}>
              <div className={styles.wrapper}>
                <h5>Prevalence ( % )</h5>
                <div className={styles.stacked}>
                  <div>
                    <span
                      className={`${styles.stacked__total} ${styles.stacked__total__initial}`}
                    >
                      <i>&nbsp;</i>
                      {Math.round(states?.quartile[0]) || 0}
                    </span>
                    <span className={styles.stacked__total}>
                      <i>&nbsp;</i>
                      {Math.round(states?.quartile[25]) || 0}
                    </span>
                  </div>
                  <div id="quality">
                    <span className={styles.stacked__total}>
                      <i>&nbsp;</i>
                      {Math.round(states?.quartile[50]) || 0}
                    </span>
                  </div>
                  <div id="quantity">
                    <span className={styles.stacked__total}>
                      <i>&nbsp;</i>
                      {Math.round(states?.quartile[75]) || 0}
                    </span>
                  </div>
                  <div id="quantity">
                    <span className={styles.stacked__total}>
                      <i>&nbsp;</i>
                      {Math.round(states?.quartile[100]) || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.unavailable}>
                <div />
                Data unavailable
              </div>
            </div>
            <div className="chart-img text-center">
              <Honeycomb dictionary={states?.data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
