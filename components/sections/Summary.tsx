import React from "react";

const Summary = () => {
  return (
    <section id="prevalence">
      <div className="container-fluid w-90">
        <div className="row">
          <div className="col-12 d-flex">
            <div className="main_div">
              <div className="first_text">
                <h3>
                  1 <sub>IN</sub> 30
                </h3>
              </div>
              <div className="inner_bg">
                <h4>Prevalence</h4>
              </div>
            </div>
            <div className="main_div">
              <div className="first_text">
                <h3>6.2m</h3>
              </div>
              <div className="inner_bg">
                <h4>Deaths</h4>
              </div>
            </div>
            <div className="main_div">
              <div className="first_text">
                <h3>23.5m</h3>
              </div>
              <div className="inner_bg">
                <h4>Morbidity</h4>
              </div>
            </div>
            <div className="main_div">
              <div className="first_text">
                <h3>
                  23.3<sub>%</sub>
                </h3>
              </div>
              <div className="inner_bg">
                <h4>Incidence</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
