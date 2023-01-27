/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";

import Honeycomb from "../Honeycomb";

import { GET_STATE_DATA } from "../../graphql/Query";

const Locations = () => {
  const { data } = useQuery(GET_STATE_DATA);

  const states = useMemo(() => {
    if (data?.getStateData) return JSON.parse(data?.getStateData);
    else return null;
  }, [data?.getStateData]);

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
            <div className="Prevalence-img text-center">
              <img
                src="/images/location_prevalence.svg"
                className="img-fluid "
                alt=" "
              />
            </div>
            <div className="chart-img text-center">
              <Honeycomb dictionary={states} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
