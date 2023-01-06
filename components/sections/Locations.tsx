import React from "react";

const Locations = () => {
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
              <img
                src="/images/loaction-img.svg"
                className=" img-fluid "
                alt=" "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
